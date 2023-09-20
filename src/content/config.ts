import { z, defineCollection } from "astro:content";
import { SITE } from "@/config";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      author: z.string().default(SITE.author),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .optional(),
      canonicalURL: z.string().url().optional(),
    }),
});

export const collections = { blog };
