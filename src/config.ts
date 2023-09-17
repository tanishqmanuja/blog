import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://tqblog.pages.dev/",
  author: "Tanishq Manuja",
  desc: "A minimal, responsive and SEO-friendly Astro blog.",
  title: "TqBlog",
  ogImage: "social-og.png",
};

export const POSTS_PER_PAGE = 3;

export const LOCALE = ["en-EN"];

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/tanishqmanuja",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tanishqmanuja/",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:tanishqmanuja@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/tanishqmanuja",
    linkTitle: `${SITE.author} on Twitter`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://github.com/tanishqmanuja",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
];
