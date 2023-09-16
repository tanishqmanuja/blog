import { z } from "astro:content";
import { SITE } from "@config";

export const blogSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default(SITE.author),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default(["others"]),
    postSlug: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
