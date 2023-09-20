import { generateOgImageForSite } from "@/utils/og-image";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () =>
  new Response(await generateOgImageForSite(), {
    headers: { "Content-Type": "image/png" },
  });
