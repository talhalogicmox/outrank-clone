import Image from "next/image";
import { asset, stories } from "@/data/homepage";

export function SuccessCarousel() {
  return <div className="or-carousel-shell">{stories.map((story) => <article className="or-carousel-card" key={story.person}><div className="or-carousel-visual"><Image src={asset("case-studies", story.image)} width={720} height={680} alt={story.quote} sizes="(max-width: 767px) 90vw, 50vw" /></div><div className="or-carousel-copy"><Image src={asset("icons", "quotes.svg")} alt="" width={50} height={42} /><h3>{story.quote}</h3><div className="or-carousel-person"><Image src={asset("testimonials", story.portrait)} alt="" width={54} height={54} /><span><b>{story.person}</b><small>{story.role}</small></span></div><a href={story.url}>Read story ↗</a></div></article>)}</div>;
}
