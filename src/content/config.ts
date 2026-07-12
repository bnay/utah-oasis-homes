import { defineCollection, z } from "astro:content";

const homes = defineCollection({
  schema: z.object({
    title: z.string().trim().min(1, "A home title is required."),

    location: z.string().trim().min(1, "A home location is required."),

    coverImage: z
      .string()
      .trim()
      .min(1, "A cover image path is required.")
      .startsWith(
        "/images/",
        'The coverImage path must begin with "/images/".'
      ),

    tags: z
      .array(z.string().trim().min(1))
      .default([]),

    featured: z.boolean().default(false),

    order: z
      .number()
      .int("The order value must be a whole number.")
      .positive("The order value must be greater than zero.")
      .default(999),

    gallery: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .startsWith(
            "/images/",
            'Every gallery image path must begin with "/images/".'
          )
      )
      .min(1, "At least one gallery image is required."),
  }),
});

export const collections = {
  homes,
};