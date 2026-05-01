"use client"

import { Monitor, Image, FileImage, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Monitor,
    title: "Website Design",
    description:
      "Creating immersive digital experiences with stunning UI/UX design, responsive layouts, and modern web applications that engage users.",
    features: ["UI/UX Design", "Responsive Design", "E-commerce", "Web Applications"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    icon: Image,
    title: "Photoshop & Editing",
    description:
      "Professional photo editing, retouching, compositing, and digital manipulation to transform your visuals into stunning artwork.",
    features: ["Photo Retouching", "Compositing", "Color Correction", "Digital Art"],
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: FileImage,
    title: "Poster & Design",
    description:
      "Eye-catching poster designs, print materials, marketing collateral, and visual assets that capture attention and communicate your message.",
    features: ["Poster Design", "Print Materials", "Marketing Collateral", "Visual Assets"],
    gradient: "from-pink-500/20 to-rose-500/20",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={cn(
        "group relative p-8 lg:p-10 bg-background border border-border rounded-lg transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        isHovered && "border-accent/50 shadow-[0_0_40px_rgba(0,220,130,0.1)]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div 
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-br opacity-0 transition-opacity duration-500",
          service.gradient,
          isHovered && "opacity-100"
        )}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div 
          className={cn(
            "w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 transition-all duration-500",
            isHovered && "bg-accent/20 scale-110 rotate-3"
          )}
        >
          <service.icon 
            className={cn(
              "w-7 h-7 text-accent transition-transform duration-500",
              isHovered && "scale-110"
            )} 
          />
        </div>

        {/* Content */}
        <h3 
          className={cn(
            "text-2xl font-bold mb-4 transition-all duration-300",
            isHovered && "text-accent"
          )}
        >
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <ul className="flex flex-wrap gap-2 mb-6">
          {service.features.map((feature, i) => (
            <li
              key={feature}
              className={cn(
                "px-3 py-1 text-xs uppercase tracking-wider bg-secondary text-secondary-foreground rounded-full transition-all duration-300",
                isHovered && "bg-accent/20 text-accent"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* Learn more link */}
        <a 
          href="/contact"
          className={cn(
            "inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300",
            isHovered && "text-accent translate-x-2"
          )}
        >
          Learn More 
          <ArrowRight 
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isHovered && "translate-x-1"
            )} 
          />
        </a>
      </div>

      {/* Corner accents */}
      <div 
        className={cn(
          "absolute top-0 right-0 w-16 h-px bg-accent transition-all duration-500 origin-right",
          isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        )}
      />
      <div 
        className={cn(
          "absolute top-0 right-0 w-px h-16 bg-accent transition-all duration-500 origin-top",
          isHovered ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      />
    </div>
  )
}

export function ServicesOverview() {
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
    <section className="py-24 px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We offer specialized creative services focused on digital design,
            photo editing, and print materials.
          </p>
        </div>

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
