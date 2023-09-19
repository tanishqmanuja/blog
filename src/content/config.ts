import { z, defineCollection } from "astro:content";
import { SITE } from "@/config";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        author: z.string().default(SITE.author),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        tags: z.array(z.string()).default(["others"]),
        postSlug: z.string().optional(),
        ogImage: image()
          .refine(img => img.width >= 1200 && img.height >= 640, {
            message: "OpenGraph image must be at least 1200 X 640 pixels!",
          })
          .optional(),
        canonicalURL: z.string().url().optional(),
      })
      .strict(),
});

export const collections = { blog };
