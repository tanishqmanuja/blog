import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { isPublishable, sortByDate } from "@/utils/post";

export async function GET() {
  const posts = await getCollection("blog", isPublishable).then(p =>
    p.sort(sortByDate),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: posts.map(({ slug, data }) => ({
      link: `posts/${slug}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.date),
    })),
  });
}
