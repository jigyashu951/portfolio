import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { KineticHero } from "@/components/home/kinetic-hero"
import { FeaturedWorks } from "@/components/home/featured-works"
import { ServicesOverview } from "@/components/home/services-overview"
import { Testimonials } from "@/components/home/testimonials"
import { TeamSection } from "@/components/home/team-section"
import { getFeaturedProjects } from "@/lib/projects"

export default async function HomePage() {
  const projects = await (async () => {
    try {
      return await getFeaturedProjects(6)
    } catch {
      return []
    }
  })()

  return (
    <>
      <Navigation />
      <main>
        <KineticHero />
        <FeaturedWorks projects={projects} />
        <ServicesOverview />
        <TeamSection />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}