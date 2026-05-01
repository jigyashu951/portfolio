"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import type { FeaturedProject } from "@/lib/projects"

function AnimatedCard({ project, index }: { project: FeaturedProject; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <Link
      ref={ref}
      href={`/work/${project.id}`}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-card border border-border",
        "transition-all duration-500 hover:border-accent/50",
        project.size === "large" && "md:col-span-2 md:row-span-2",
        project.size === "medium" && "lg:col-span-1 lg:row-span-1",
        project.size === "small" && "col-span-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110 blur-[2px]" : "scale-100"
          )}
          crossOrigin="anonymous"
        />
      </div>

      {/* Animated Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )} 
      />
      
      {/* Glowing border effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none",
          isHovered ? "shadow-[inset_0_0_30px_rgba(0,220,130,0.15)]" : ""
        )}
      />

      {/* Content */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 transition-all duration-500",
        isHovered ? "translate-y-0" : "translate-y-4"
      )}>
        <span 
          className={cn(
            "inline-block px-3 py-1 text-xs uppercase tracking-widest bg-accent/20 text-accent rounded-full mb-3 transition-all duration-500",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {project.category}
        </span>
        <h3 
          className={cn(
            "text-xl md:text-2xl font-bold mb-2 text-balance transition-all duration-500",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: "50ms" }}
        >
          {project.title}
        </h3>
        <p 
          className={cn(
            "text-sm text-muted-foreground transition-all duration-500",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: "100ms" }}
        >
          {project.description}
        </p>
      </div>

      {/* Arrow with animation */}
      <div 
        className={cn(
          "absolute top-4 right-4 p-2 bg-accent text-background rounded-full transition-all duration-500",
          isHovered ? "opacity-100 translate-x-0 rotate-0 scale-100" : "opacity-0 translate-x-4 rotate-45 scale-50"
        )}
      >
        <ArrowUpRight className="w-4 h-4" />
      </div>

      {/* Animated corner accents */}
      <div 
        className={cn(
          "absolute top-0 left-0 w-12 h-px bg-accent transition-all duration-500 origin-left",
          isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        )}
      />
      <div 
        className={cn(
          "absolute top-0 left-0 w-px h-12 bg-accent transition-all duration-500 origin-top",
          isHovered ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      />
      <div 
        className={cn(
          "absolute bottom-0 right-0 w-12 h-px bg-accent transition-all duration-500 origin-right",
          isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        )}
      />
      <div 
        className={cn(
          "absolute bottom-0 right-0 w-px h-12 bg-accent transition-all duration-500 origin-bottom",
          isHovered ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      />
    </Link>
  )
}

export function FeaturedWorks({ projects = [] }: { projects?: FeaturedProject[] }) {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.3 }
    )

    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={cn(
            "flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Selected Projects
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured Works
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project, index) => (
            <AnimatedCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
