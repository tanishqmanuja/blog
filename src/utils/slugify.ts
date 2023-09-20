import type { CollectionEntry } from "astro:content";
import { slug as slugger } from "github-slugger";
export const slugifyStr = (str: string) => slugger(str);

const slugify = (post: CollectionEntry<"blog">["data"]) => slugger(post.title);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
