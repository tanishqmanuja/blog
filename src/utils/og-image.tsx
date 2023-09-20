import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "@/utils/og-templates/post";
import siteOgImage from "@/utils/og-templates/site";

async function fetchFont(url: string) {
  return fetch(url).then(f => f.arrayBuffer());
}

const IBM_PLEX_MONO_URL = {
  regular: "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf",
  bold: "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf",
};

const OPTIONS: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: await fetchFont(IBM_PLEX_MONO_URL.regular),
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: await fetchFont(IBM_PLEX_MONO_URL.bold),
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), OPTIONS);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), OPTIONS);
  return svgBufferToPngBuffer(svg);
}
