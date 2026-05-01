"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface FloatingSphereProps {
  color?: string
  wireframeColor?: string
}

export function FloatingSphere({
  color = "#00DC82",
  wireframeColor = "#ffffff",
}: FloatingSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Create icosahedron geometry for more interesting shape
    const geometry = new THREE.IcosahedronGeometry(1.5, 1)

    // Main sphere with gradient-like appearance
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.15,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(wireframeColor),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial)
    scene.add(wireframe)

    // Inner glowing sphere
    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 2)
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.1,
    })
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerSphere)

    // Points on vertices
    const pointsGeometry = new THREE.BufferGeometry()
    const vertices = geometry.attributes.position.array
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3))

    const pointsMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    // Orbiting particles
    const orbitCount = 50
    const orbitGeometry = new THREE.BufferGeometry()
    const orbitPositions = new Float32Array(orbitCount * 3)

    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2
      const radius = 2 + Math.random() * 0.5
      orbitPositions[i * 3] = Math.cos(angle) * radius
      orbitPositions[i * 3 + 1] = (Math.random() - 0.5) * 2
      orbitPositions[i * 3 + 2] = Math.sin(angle) * radius
    }

    orbitGeometry.setAttribute("position", new THREE.BufferAttribute(orbitPositions, 3))

    const orbitMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const orbitParticles = new THREE.Points(orbitGeometry, orbitMaterial)
    scene.add(orbitParticles)

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Rotate based on time
      sphere.rotation.x = elapsedTime * 0.1
      sphere.rotation.y = elapsedTime * 0.15
      wireframe.rotation.x = elapsedTime * 0.1
      wireframe.rotation.y = elapsedTime * 0.15
      points.rotation.x = elapsedTime * 0.1
      points.rotation.y = elapsedTime * 0.15

      // Inner sphere rotates opposite
      innerSphere.rotation.x = -elapsedTime * 0.15
      innerSphere.rotation.y = -elapsedTime * 0.1

      // Orbit particles
      orbitParticles.rotation.y = elapsedTime * 0.2

      // Mouse influence on position
      sphere.position.x = mouseRef.current.x * 0.3
      sphere.position.y = mouseRef.current.y * 0.3
      wireframe.position.x = mouseRef.current.x * 0.3
      wireframe.position.y = mouseRef.current.y * 0.3
      innerSphere.position.x = mouseRef.current.x * 0.3
      innerSphere.position.y = mouseRef.current.y * 0.3
      points.position.x = mouseRef.current.x * 0.3
      points.position.y = mouseRef.current.y * 0.3
      orbitParticles.position.x = mouseRef.current.x * 0.2
      orbitParticles.position.y = mouseRef.current.y * 0.2

      // Breathing scale effect
      const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05
      sphere.scale.setScalar(scale)
      wireframe.scale.setScalar(scale)
      innerSphere.scale.setScalar(scale * 0.9)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      container.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      wireframeMaterial.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      orbitGeometry.dispose()
      orbitMaterial.dispose()
      renderer.dispose()
    }
  }, [color, wireframeColor])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}
