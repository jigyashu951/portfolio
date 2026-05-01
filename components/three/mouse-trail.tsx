"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  age: number
  size: number
  velocity: { x: number; y: number }
}

interface MouseTrailProps {
  color?: string
  maxPoints?: number
  trailLength?: number
}

export function MouseTrail({
  color = "#00DC82",
  maxPoints = 50,
  trailLength = 30,
}: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x
      const prevY = mouseRef.current.y
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        prevX,
        prevY,
      }

      // Calculate velocity
      const vx = e.clientX - prevX
      const vy = e.clientY - prevY
      const speed = Math.sqrt(vx * vx + vy * vy)

      // Add new point with velocity-based size
      if (speed > 1) {
        pointsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          size: Math.min(speed * 0.3, 8) + 2,
          velocity: { x: vx * 0.1, y: vy * 0.1 },
        })

        // Limit points
        if (pointsRef.current.length > maxPoints) {
          pointsRef.current.shift()
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const points = pointsRef.current

      // Update and draw points
      for (let i = points.length - 1; i >= 0; i--) {
        const point = points[i]
        point.age++

        // Apply velocity decay
        point.x += point.velocity.x
        point.y += point.velocity.y
        point.velocity.x *= 0.95
        point.velocity.y *= 0.95

        // Calculate opacity based on age
        const lifeProgress = point.age / trailLength
        const opacity = Math.max(0, 1 - lifeProgress)

        if (opacity <= 0) {
          points.splice(i, 1)
          continue
        }

        // Draw point
        const size = point.size * (1 - lifeProgress * 0.5)

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = opacity * 0.6
        ctx.fill()

        // Add glow effect
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size * 3
        )
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.globalAlpha = opacity * 0.3
        ctx.fill()
      }

      // Draw connections between recent points
      if (points.length > 1) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        for (let i = 1; i < points.length; i++) {
          const point = points[i]
          const prevPoint = points[i - 1]
          
          // Smooth curve
          const midX = (point.x + prevPoint.x) / 2
          const midY = (point.y + prevPoint.y) / 2
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY)
        }

        const lifeProgress = points[0].age / trailLength
        ctx.strokeStyle = color
        ctx.globalAlpha = Math.max(0, 0.3 - lifeProgress * 0.3)
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, maxPoints, trailLength])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
