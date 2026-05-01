"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/utils/supabase/client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Dribbble,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
]

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address (e.g., hello@example.com)"),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: data.name,
            email: data.email,
            company: data.company || null,
            service: data.service || null,
            budget: data.budget || null,
            message: data.message,
          },
        ])

      if (error) throw error

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Let&apos;s Create
              <br />
              <span className="text-accent">Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Drop us a line
              and let&apos;s start the conversation.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
                {isSubmitted ? (
                  <div className="p-8 bg-card border border-border rounded-lg text-center">
                    <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within
                      24-48 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-accent hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Your name"
                          className={`bg-card ${errors.name ? "border-red-500/50 focus-visible:ring-red-500" : "border-border"}`}
                        />
                        {errors.name && (
                          <div className="flex items-start gap-2 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-red-500 text-xs leading-relaxed">{errors.name.message}</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="your@email.com"
                          className={`bg-card ${errors.email ? "border-red-500/50 focus-visible:ring-red-500" : "border-border"}`}
                        />
                        {errors.email && (
                          <div className="flex items-start gap-2 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-red-500 text-xs leading-relaxed">{errors.email.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-2"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        {...register("company")}
                        placeholder="Your company"
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium mb-2"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        {...register("service")}
                        className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a service</option>
                        <option value="web-design">Web Design</option>
                        <option value="poster-design">Poster Design</option>
                        <option value="photoshop">Photoshop Editing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium mb-2"
                      >
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        {...register("budget")}
                        className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a budget range</option>
                        <option value="0-100">$0 - $100</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000+">$1000+</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        placeholder="Tell us about your project..."
                        className={`bg-card resize-none ${errors.message ? "border-red-500/50 focus-visible:ring-red-500" : "border-border"}`}
                      />
                      {errors.message && (
                        <div className="flex items-start gap-2 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <p className="text-red-500 text-xs leading-relaxed">{errors.message.message}</p>
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full uppercase tracking-widest"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="lg:pl-8">
                <h2 className="text-2xl font-bold mb-8">Contact Info</h2>
                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a
                        href="mailto:hello@vextra.design"
                        className="hover:text-accent transition-colors duration-300"
                      >
                        hello@vextra.design
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a
                        href="tel:+15551234567"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="font-medium mb-4">Follow Us</h3>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="w-12 h-12 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
