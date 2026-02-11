// src/content/config.ts
import { defineCollection, z } from "astro:content";

const homes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    location: z.string(),
    coverImage: z.string(), // e.g. "/images/homes/skyline.jpg"
    gallery: z.array(z.string()).optional(), // optional extra images
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().optional(), // optional manual ordering
  }),
});

export const collections = {
  homes,
};
