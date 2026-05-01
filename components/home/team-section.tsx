"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Linkedin, Twitter, Dribbble } from "lucide-react"

const team = [
  {
    name: "Anshika Mishra",
    role: "Founder & Creative Director",
    image: "/anshika.jpg",
    socials: { linkedin: "#", twitter: "#", instagram: "#" }
  },
  {
    name: "Jigyashu Pandey",
    role: "Design Director",
    image: "/jigyashu.jpg",
    socials: { linkedin: "#", twitter: "#", instagram: "#" }
  },
]

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
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
        "group relative transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={member.image}
          alt={member.name}
          className={cn(
            "w-full aspect-[4/5] object-cover transition-all duration-700",
            isHovered ? "scale-110 brightness-75" : "scale-100"
          )}
          crossOrigin="anonymous"
        />
        
        {/* Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Social links */}
        <div 
          className={cn(
            "absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <a 
            href={member.socials.linkedin}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-background transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={member.socials.twitter}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-background transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a 
            href={member.socials.instagram}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-background transition-colors"
          >
            <Dribbble className="w-4 h-4" />
          </a>
        </div>

        {/* Glow effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none",
            isHovered ? "shadow-[inset_0_0_40px_rgba(0,220,130,0.2)]" : ""
          )}
        />
        
        {/* Corner accents */}
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
      </div>
      
      {/* Info */}
      <h4 
        className={cn(
          "text-xl font-bold mb-1 transition-colors duration-300",
          isHovered && "text-accent"
        )}
      >
        {member.name}
      </h4>
      <p className="text-accent text-sm uppercase tracking-widest mb-2">
        {member.role}
      </p>
      <p 
        className={cn(
          "text-muted-foreground text-sm transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-70"
        )}
      >
       
      </p>
    </div>
  )
}

export function TeamSection() {
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
            The Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Meet the Creators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collective of passionate designers, strategists, and technologists
            dedicated to bringing your vision to life.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
