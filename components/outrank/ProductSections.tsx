import Image from "next/image";
import Link from "next/link";
import { asset, backlinks, extras, features, integrations, site } from "@/data/homepage";
import { Button, Container, Heading, Visual } from "./ui";

export function Features() {
  return <section className="or-section or-features"><Container><Heading eyebrow="FEATURES" description="Get new SEO-optimized articles daily, effortlessly.">Unlock your SEO growth</Heading><div className="or-features-grid">{features.map((feature, index) => <article key={feature.title} className="or-feature-card"><div className="or-feature-copy"><h3>{feature.title}</h3><p>{feature.text}</p>{index === 1 ? <Link href="/#examples">Read Examples ↗</Link> : <Button>Start for Free</Button>}</div><div className="or-feature-image"><Visual folder="features" name={feature.image} alt={`${feature.title} in Outrank`} /></div></article>)}</div></Container></section>;
}

export function BacklinkSection() {
  return <section className="or-section or-backlinks"><Container><div className="or-backlinks-head"><Heading eyebrow="BUILD AUTHORITY" description="We place relevant links to your site inside real articles on real blogs, verify every one of them, and keep your Domain Rating climbing - no outreach, no buying links, nothing for you to manage.">Outrank builds backlinks for your website</Heading><Button>Grow Your Domain Rating</Button></div><div className="or-backlink-grid">{backlinks.map((item, i) => <article key={item.title} className="or-backlink-step"><div className="or-backlink-image"><Visual folder="how-it-works" name={item.image} alt={item.title} /></div><div><span className="or-step-num">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></Container></section>;
}

export function Integrations() {
  return <section className="or-section or-integrations" id="integrations"><Container><Heading eyebrow="INTEGRATIONS">One click to any platform</Heading><div className="or-integrations-grid">{integrations.map(([name, desc, icon]) => <a className="or-integration" key={name} href={`${site}/integrations#${icon === "nextjs" ? "nextjs-blog" : icon}`}><Image src={asset("logos", `${icon}-icon.svg`)} width={40} height={40} alt="" /><strong>{name}</strong><span>{desc}</span><small>Read more ↗</small></a>)}</div></Container></section>;
}

export function AdditionalFeatures() {
  return <section className="or-section or-additional"><Container><Heading>And so much more you need to do your best work</Heading><div className="or-extra-grid">{extras.map((item) => <article className="or-extra-card" key={item.title}><div className="or-extra-image"><Visual folder="features" name={item.image} alt={item.title} /></div><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></Container></section>;
}

export function WritingExamples() {
  const examples = [
    ["Guide", "How to Get Paid on Twitter: Your 2026 Monetization Guide", "how-to-get-paid-on-twitter-social-media-monetization.jpg"],
    ["Comparison", "Supabase vs Firebase: Choose Your Backend in 2026", "supabase-vs-firebase-backend-comparison.jpg"],
    ["Listicle", "10 Best AI Video Makers for TikTok (2026 Guide)", "best-ai-video-makers-for-tiktok-ai-tools.jpg"],
  ];
  return <section className="or-section or-examples" id="examples"><Container><Heading eyebrow="WRITING EXAMPLES">AI-generated content that <span>humans love to read.</span></Heading><div className="or-examples-grid">{examples.map(([category, title, image]) => <article className="or-example-card" key={title}><Image src={asset("writing-examples", image)} alt={title} width={800} height={600} sizes="(max-width: 767px) 90vw, 33vw" /><div><span>{category}</span><h3>{title}</h3><a href={`${site}/blog`}>Browse the Outrank blog ↗</a></div></article>)}</div><div className="or-examples-bottom"><p>Check out the Outrank blog where All Articles are generated with Outrank:</p><Button href={`${site}/blog`}>Visit Our Blog</Button></div><div className="or-examples-decor"><Image src={asset("misc", "examples-vector.svg")} alt="" width={60} height={60} /></div></Container></section>;
}
