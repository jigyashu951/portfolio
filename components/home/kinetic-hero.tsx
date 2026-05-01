"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown, Play } from "lucide-react"
import { ParticleField } from "@/components/three/particle-field"

const words = ["DESIGN", "CREATE", "INSPIRE", "INNOVATE"]

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const startTime = performance.now()
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const currentCount = Math.floor(easeOut * value)
            setCount(currentCount)
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-accent tabular-nums">
      {count}{suffix}
    </div>
  )
}

export function KineticHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
      {/* Three.js Particle Background */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <ParticleField
            particleCount={1500}
            particleColor="#ffffff"
            accentColor="#00DC82"
            mouseInfluence={0.15}
          />
        </div>
      )}

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-[1]" />

      {/* Animated grid background */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-0 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        > 
          <span className="relative flex h-2 w-2">
          
          </span>
        </div>

        <h1 className="relative">
          <span
            className={`block text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            WE
          </span>
          <span className="relative flex justify-center overflow-hidden h-[1em] text-5xl sm:text-6xl md:text-7xl lg:text-[8rem]">
            <span
              key={currentWordIndex}
              className="block font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-emerald-300 animate-slide-up"
            >
              {words[currentWordIndex]}
            </span>
          </span>
          <span
            className={`block text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            BRANDS
          </span>
        </h1>

        <p
          className={`mt-12 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          We don&apos;t just design
          <br />
          we translate your boldest ideas into visual realities.
        </p>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="/work"
            className="group relative px-8 py-4 bg-accent text-background font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,220,130,0.4)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Our Work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-emerald-400 to-accent bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="/contact"
            className="group px-8 py-4 border border-border text-foreground font-medium uppercase tracking-widest text-sm hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(0,220,130,0.2)] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span>Watch Showreel</span>
          </a>
        </div>

        {/* Animated Stats */}
        <div
          className={`mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center group cursor-default">
            <div className="relative">
              <AnimatedCounter value={150} suffix="+" />
              <div className="absolute -inset-4 bg-accent/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-300">
              Projects
            </div>
          </div>
          <div className="text-center group cursor-default">
            <div className="relative">
              <AnimatedCounter value={12} />
              <div className="absolute -inset-4 bg-accent/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-300">
              Years
            </div>
          </div>
          <div className="text-center group cursor-default">
            <div className="relative">
              <AnimatedCounter value={40} suffix="+" />
              <div className="absolute -inset-4 bg-accent/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-300">
              Awards
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
          <ArrowDown className="w-4 h-4 text-accent animate-bounce" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 w-24 h-px bg-gradient-to-r from-accent to-transparent z-10" />
      <div className="absolute top-24 left-6 w-px h-24 bg-gradient-to-b from-accent to-transparent z-10" />
      <div className="absolute bottom-24 right-6 w-24 h-px bg-gradient-to-l from-accent to-transparent z-10" />
      <div className="absolute bottom-24 right-6 w-px h-24 bg-gradient-to-t from-accent to-transparent z-10" />
    </section>
  )
}
