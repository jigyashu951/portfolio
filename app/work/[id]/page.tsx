import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

// Mock project data
const projects = [
  {
    id: "1",
    title: "Lumina Brand Identity",
    category: "Branding",
    year: "2024",
    client: "Lumina Fashion",
    services: ["Brand Strategy", "Visual Identity", "Guidelines", "Packaging"],
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=900&fit=crop",
    challenge: "Lumina Fashion needed a complete brand overhaul to position themselves as a leader in sustainable fashion. The challenge was to create a visual identity that communicated luxury while emphasizing their commitment to environmental responsibility.",
    process: [
      {
        title: "Discovery & Research",
        description: "We began with extensive research into the sustainable fashion market, analyzing competitors and identifying opportunities to differentiate Lumina.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      },
      {
        title: "Concept Development",
        description: "Multiple creative directions were explored, each rooted in the brand's core values of sustainability, elegance, and innovation.",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
      },
      {
        title: "Design Execution",
        description: "The final identity system was crafted with meticulous attention to detail, ensuring consistency across all touchpoints.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      },
    ],
    result: "The new brand identity has helped Lumina increase brand recognition by 150% and contributed to a 40% increase in sales within the first quarter of launch. The brand is now recognized as a leader in sustainable luxury fashion.",
    resultImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1635774855317-edf3ee4463db?w=800&h=600&fit=crop",
    ],
    nextProject: { id: "2", title: "Nova Digital Platform" },
    prevProject: { id: "9", title: "Bloom Wellness" },
  },
  {
    id: "2",
    title: "Nova Digital Platform",
    category: "Web Design",
    year: "2024",
    client: "Nova Tech",
    services: ["UX Design", "UI Design", "Development", "E-commerce"],
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=900&fit=crop",
    challenge: "Nova Tech required a cutting-edge e-commerce platform that could showcase their innovative tech products while providing a seamless shopping experience.",
    process: [
      {
        title: "User Research",
        description: "In-depth user interviews and journey mapping helped us understand the needs and pain points of Nova's target audience.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
      },
      {
        title: "Wireframing & Prototyping",
        description: "Interactive prototypes were created and tested with real users to validate our design decisions.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
      },
      {
        title: "Visual Design",
        description: "A bold, futuristic visual language was developed to match Nova's innovative brand positioning.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      },
    ],
    result: "The new platform saw a 200% increase in conversion rates and a 60% reduction in cart abandonment. User satisfaction scores improved by 45%.",
    resultImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
    ],
    nextProject: { id: "3", title: "Pulse Music Festival" },
    prevProject: { id: "1", title: "Lumina Brand Identity" },
  },
  {
    id: "3",
    title: "Pulse Music Festival",
    category: "3D / Motion",
    year: "2024",
    client: "Pulse Events",
    services: ["3D Design", "Motion Graphics", "Art Direction", "Animation"],
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop",
    challenge: "Create an immersive visual identity for a three-day music festival that would stand out in a crowded market and appeal to a diverse audience.",
    process: [
      {
        title: "Creative Direction",
        description: "We established a bold creative direction inspired by the energy and rhythm of live music performances.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
      },
      {
        title: "3D Development",
        description: "Custom 3D assets and environments were created to bring the festival's world to life.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      },
      {
        title: "Motion Design",
        description: "Dynamic animations and transitions were crafted to create an immersive digital experience.",
        image: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&h=600&fit=crop",
      },
    ],
    result: "The festival sold out in record time, with social media engagement increasing by 300%. The visual identity was featured in multiple design publications.",
    resultImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    ],
    nextProject: { id: "4", title: "Zenith Architecture" },
    prevProject: { id: "2", title: "Nova Digital Platform" },
  },
]

// Default project for other IDs
const defaultProject = {
  id: "4",
  title: "Zenith Architecture",
  category: "Branding",
  year: "2023",
  client: "Zenith Group",
  services: ["Brand Strategy", "Visual Identity", "Print Design"],
  heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&h=900&fit=crop",
  challenge: "Create a premium brand identity for a modern architecture firm that reflects their innovative approach to sustainable building design.",
  process: [
    {
      title: "Brand Discovery",
      description: "Deep dive into the firm's philosophy, values, and competitive landscape.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    },
    {
      title: "Design Exploration",
      description: "Multiple creative directions exploring geometric forms and architectural elements.",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
    },
    {
      title: "Final Execution",
      description: "Refined brand system with comprehensive guidelines for all applications.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    },
  ],
  result: "The new identity positioned Zenith as a thought leader in sustainable architecture, leading to a 50% increase in project inquiries.",
  resultImages: [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=600&fit=crop",
  ],
  nextProject: { id: "5", title: "Orbit App Design" },
  prevProject: { id: "3", title: "Pulse Music Festival" },
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id) || defaultProject

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Full-width Hero */}
        <section className="relative h-[60vh] lg:h-[80vh] overflow-hidden">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-4 py-2 text-sm uppercase tracking-widest bg-accent/20 text-accent rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 text-balance">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div>
                  <span className="text-xs uppercase tracking-widest block mb-1">
                    Client
                  </span>
                  <span className="text-foreground">{project.client}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest block mb-1">
                    Year
                  </span>
                  <span className="text-foreground">{project.year}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest block mb-1">
                    Services
                  </span>
                  <span className="text-foreground">
                    {project.services.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              The Challenge
            </h2>
            <p className="text-2xl md:text-3xl leading-relaxed text-balance">
              {project.challenge}
            </p>
          </div>
        </section>

        {/* The Process */}
        <section className="py-24 px-6 lg:px-8 bg-card">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-12">
              The Process
            </h2>
            <div className="space-y-24">
              {project.process.map((step, index) => (
                <div
                  key={step.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="text-6xl font-bold text-accent/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full aspect-[4/3] object-cover rounded-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Result */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mb-16">
              <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                The Result
              </h2>
              <p className="text-2xl md:text-3xl leading-relaxed text-balance">
                {project.result}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.resultImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Result ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                  crossOrigin="anonymous"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Next Project Navigation */}
        <section className="border-t border-border">
          <div className="grid grid-cols-2">
            <Link
              href={`/work/${project.prevProject.id}`}
              className="group p-8 lg:p-16 border-r border-border hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs uppercase tracking-widest">
                  Previous Project
                </span>
              </div>
              <h3 className="text-lg md:text-2xl font-bold group-hover:text-accent transition-colors">
                {project.prevProject.title}
              </h3>
            </Link>
            <Link
              href={`/work/${project.nextProject.id}`}
              className="group p-8 lg:p-16 text-right hover:bg-card transition-colors"
            >
              <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                <span className="text-xs uppercase tracking-widest">
                  Next Project
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold group-hover:text-accent transition-colors">
                {project.nextProject.title}
              </h3>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
