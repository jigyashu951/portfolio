"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingSphere } from "@/components/three/floating-sphere"

const categories = ["All", "Web Design", "Photoshop", "Poster & Design"]

const projects = [
  {
    id: 1,
    title: "Lumina Brand Identity",
    category: "Photoshop",
    year: "2024",
    description: "Complete visual identity for a sustainable fashion brand",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Nova Digital Platform",
    category: "Web Design",
    year: "2024",
    description: "E-commerce experience for next-gen tech products",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Pulse Music Festival",
    category: "Poster & Design",
    year: "2024",
    description: "Immersive visual identity and motion graphics",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Zenith Architecture",
    category: "Photoshop",
    year: "2023",
    description: "Premium brand system for modern architecture firm",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Orbit App Design",
    category: "Web Design",
    year: "2023",
    description: "Mobile-first design for fitness tracking application",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Aurora Motion Reel",
    category: "Poster & Design",
    year: "2023",
    description: "Experimental 3D animation showcase",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Nexus Fintech",
    category: "Photoshop",
    year: "2023",
    description: "Visual identity for innovative fintech startup",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Vertex Gaming",
    category: "Poster & Design",
    year: "2023",
    description: "Gaming brand visuals and motion graphics",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
  },
  {
    id: 9,
    title: "Bloom Wellness",
    category: "Web Design",
    year: "2022",
    description: "Digital experience for wellness brand",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop",
  },
]

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <>
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 px-6 lg:px-8 overflow-hidden">
          {/* 3D Sphere Background */}
          {mounted && (
            <div className="absolute right-0 top-0 w-[600px] h-[600px] opacity-60">
              <FloatingSphere color="#00DC82" wireframeColor="#ffffff" />
            </div>
          )}

          <div className="max-w-7xl mx-auto relative z-10">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Our Work
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Selected
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">
                Projects
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              A curated collection of our finest work across branding, digital design,
              and motion graphics.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-3 text-sm uppercase tracking-widest rounded-full transition-all duration-300",
                    activeCategory === category
                      ? "bg-accent text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-accent/20 hover:text-accent"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/work/${project.id}`}
                  className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-500 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      crossOrigin="anonymous"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* View Project text on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="px-6 py-3 border border-accent text-accent text-sm uppercase tracking-widest">
                        View Project
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-widest text-accent">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-4 right-4 p-2 bg-accent text-background rounded-full opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
