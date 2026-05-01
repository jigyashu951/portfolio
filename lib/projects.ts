import "server-only"

import { createSupabaseServerClient } from "@/lib/supabase"

export type FeaturedProject = {
  id: string
  title: string
  category: string
  description: string
  image: string
  size: "small" | "medium" | "large"
  color: string
}

export async function getFeaturedProjects(limit = 6): Promise<FeaturedProject[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,category,description,image_url,size,color,sort_order,featured")
    .eq("featured", true)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`)
  }

  return (data ?? []).map((row) => ({
    id: String(row.id),
    title: row.title,
    category: row.category,
    description: row.description,
    image: row.image_url,
    size: row.size,
    color: row.color,
  }))
}

