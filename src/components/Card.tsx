import type { CollectionEntry } from "astro:content";
import Datetime from "./Datetime";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, date, description } = frontmatter;
  return (
    <li className="list-card">
      <a href={href}>{secHeading ? <h2>{title}</h2> : <h3>{title}</h3>}</a>
      <Datetime datetime={date} />
      <p>{description}</p>
    </li>
  );
}
