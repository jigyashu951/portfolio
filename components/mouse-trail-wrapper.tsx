"use client"

import { useEffect, useState } from "react"
import { MouseTrail } from "@/components/three/mouse-trail"

export function MouseTrailWrapper() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Disable on mobile/touch devices
    setIsMobile(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  if (!mounted || isMobile) return null

  return <MouseTrail color="#00DC82" maxPoints={40} trailLength={25} />
}
