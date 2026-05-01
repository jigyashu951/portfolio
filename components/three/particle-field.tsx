"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ParticleFieldProps {
  particleCount?: number
  particleColor?: string
  accentColor?: string
  mouseInfluence?: number
}

export function ParticleField({
  particleCount = 2000,
  particleColor = "#ffffff",
  accentColor = "#00DC82",
  mouseInfluence = 0.1,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particle geometry
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const originalPositions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    const mainColor = new THREE.Color(particleColor)
    const highlightColor = new THREE.Color(accentColor)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Spread particles in a sphere-like distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 30 + Math.random() * 40

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 20

      originalPositions[i3] = positions[i3]
      originalPositions[i3 + 1] = positions[i3 + 1]
      originalPositions[i3 + 2] = positions[i3 + 2]

      // Random velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02

      // Color gradient - some particles get accent color
      const useAccent = Math.random() > 0.85
      const color = useAccent ? highlightColor : mainColor
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Random sizes
      sizes[i] = Math.random() * 2 + 0.5
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Shader material for particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uPixelRatio;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Connection lines
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(particleCount * particleCount * 6)
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime

      // Smooth mouse movement
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05

      const positionArray = geometry.attributes.position.array as Float32Array

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Base movement
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]

        // Mouse influence
        const dx = positions[i3] - mouseRef.current.x * 30
        const dy = positions[i3 + 1] - mouseRef.current.y * 30
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 20) {
          const force = (20 - distance) / 20
          positions[i3] += dx * force * mouseInfluence * 0.5
          positions[i3 + 1] += dy * force * mouseInfluence * 0.5
        }

        // Return to original position with elastic effect
        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.01
        positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.01
        positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.01

        // Add wave motion
        positions[i3] += Math.sin(elapsedTime * 0.5 + i * 0.01) * 0.02
        positions[i3 + 1] += Math.cos(elapsedTime * 0.3 + i * 0.01) * 0.02

        positionArray[i3] = positions[i3]
        positionArray[i3 + 1] = positions[i3 + 1]
        positionArray[i3 + 2] = positions[i3 + 2]
      }

      geometry.attributes.position.needsUpdate = true

      // Update connection lines
      let lineIndex = 0
      const maxConnections = 100
      let connections = 0
      const connectionDistance = 8

      for (let i = 0; i < particleCount && connections < maxConnections; i++) {
        for (let j = i + 1; j < particleCount && connections < maxConnections; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < connectionDistance) {
            linePositions[lineIndex++] = positions[i * 3]
            linePositions[lineIndex++] = positions[i * 3 + 1]
            linePositions[lineIndex++] = positions[i * 3 + 2]
            linePositions[lineIndex++] = positions[j * 3]
            linePositions[lineIndex++] = positions[j * 3 + 1]
            linePositions[lineIndex++] = positions[j * 3 + 2]
            connections++
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3)
      lineGeometry.attributes.position.needsUpdate = true

      // Rotate particle system based on mouse
      particles.rotation.y = mouseRef.current.x * 0.1
      particles.rotation.x = mouseRef.current.y * 0.1
      lines.rotation.y = mouseRef.current.x * 0.1
      lines.rotation.x = mouseRef.current.y * 0.1

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
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
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
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [particleCount, particleColor, accentColor, mouseInfluence])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  )
}
