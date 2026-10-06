import Image from "next/image";
import { asset, stories } from "@/data/homepage";

const highlights = [
  ["Our DR", "went from 13 to 36 in 4 months", ", our traffic doubled"],
  [
    "The biggest visible shift: our",
    "brand started getting picked up in AI answers",
    "",
  ],
  [
    "Cutting client SEO time from",
    "40-50 hours",
    " to a streamlined content process",
  ],
  ["We", "publish more pages per client", ", see faster indexing."],
] as const;

export function SuccessCarousel() {
  return (
    <div className="or-carousel-shell">
      {stories.map((story, index) => (
        <a
          className="or-carousel-card"
          href={story.url}
          key={story.person}
          aria-label={`Read ${story.person}'s success story`}
        >
          <div className="or-carousel-visual">
            <Image
              src={asset("case-studies", story.image)}
              width={1200}
              height={480}
              alt={`${story.brand} analytics results`}
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 640px, 600px"
            />
          </div>
          <div className="or-carousel-copy">
            <Image
              className="or-carousel-quote-mark"
              src={asset("icons", "quotes.svg")}
              alt=""
              width={152}
              height={152}
            />
            <h3>
              {highlights[index][0]} <span>{highlights[index][1]}</span>
              {highlights[index][2]}
            </h3>
            <div className="or-carousel-bottom">
              <div className="or-carousel-person">
                <Image
                  src={asset("testimonials", story.portrait)}
                  alt=""
                  width={40}
                  height={40}
                />
                <span>
                  <b>{story.person}</b>
                  <small>{story.role}</small>
                </span>
              </div>
              <span className="or-carousel-read">
                Read story <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
