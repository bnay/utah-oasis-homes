import { defineCollection, z } from "astro:content";

const homes = defineCollection({
  schema: z.object({
    title: z.string().trim().min(1, "A home title is required."),

    location: z.string().trim().min(1, "A home location is required."),

    serviceArea: z.enum(["Wasatch Front", "Southern Utah"]),

    market: z.enum(["Utah County", "St. George Area"]).optional(),

    seoTitle: z.string().trim().min(1).optional(),

    seoDescription: z.string().trim().min(1).max(170).optional(),

    coverImage: z
      .string()
      .trim()
      .min(1, "A cover image path is required.")
      .startsWith(
        "/images/",
        'The coverImage path must begin with "/images/".'
      ),

    coverAlt: z.string().trim().min(1, "Cover image alt text is required."),

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

const stories = defineCollection({
  schema: z.object({
    title: z.string().trim().min(1, "A story title is required."),

    customers: z.string().trim().min(1, "A customer name is required."),

    excerpt: z.string().trim().min(1, "A story excerpt is required."),

    featured: z.boolean().default(true),

    order: z
      .number()
      .int("The order value must be a whole number.")
      .positive("The order value must be greater than zero.")
      .default(999),

    project: z.string().trim().optional(),

    location: z.string().trim().optional(),
  }),
});

export const collections = {
  homes,
  stories,
};
