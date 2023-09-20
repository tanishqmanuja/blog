import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@/utils/og-image";
import { isPublishable } from "@/utils/post";

export async function getStaticPaths() {
  const posts = await getCollection("blog", isPublishable).then(p =>
    p.filter(({ data }) => !data.ogImage),
  );

  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as CollectionEntry<"blog">), {
    headers: { "Content-Type": "image/png" },
  });
