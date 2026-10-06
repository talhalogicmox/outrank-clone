import Image from "next/image";
import { asset, cases, signup, steps } from "@/data/homepage";
import { Button, Container, Eyebrow, Heading, Proof, Visual } from "./ui";
import { SuccessCarousel } from "./SuccessCarousel";

export function Hero() {
  return <><section className="or-hero" aria-labelledby="or-hero-title">
    <div className="or-hero-decor" aria-hidden="true"><Image src={asset("misc", "hero-image.webp")} alt="" fill priority sizes="(max-width: 1200px) 100vw, 1200px" /></div>
    <Container><div className="or-hero-content"><h1 id="or-hero-title">Grow Organic&nbsp;Traffic <span className="or-on-auto">on <span className="or-purple-word">Auto-Pilot</span></span></h1><p>Get recommended by ChatGPT &amp; Rank on Google. Get done-for-you Blog Posts, Backlinks and Free Tools while you sleep.</p>
    <div className="or-hero-actions"><a href={signup} className="or-google or-hero-google"><Image src={asset("misc", "google.svg")} width={20} height={20} alt="" />Join with Google</a><Button>Get Started for Free</Button></div><Proof /></div></Container>
  </section><section className="or-hero-preview" aria-label="Outrank product preview"><Container><div className="or-hero-preview-inner"><video autoPlay muted loop playsInline controls preload="none" aria-label="Outrank product demonstration"><source src={asset("misc", "outrank-demo.mp4")} type="video/mp4" /></video></div></Container></section></>;
}

export function Stats() {
  return <section className="or-stats"><div className="or-stats-band"><div className="or-stats-bg" aria-hidden="true"><Image src={asset("backgrounds", "bg-stats.webp")} alt="" fill sizes="100vw" /></div><Container><div className="or-stats-grid">{[["10,000", "ChatGPT mentions secured"], ["750,000", "Articles Created"], ["25,000", "Backlinks Added"]].map(([number, label]) => <div key={label}><strong>{number}<em>+</em></strong><span>{label}</span></div>)}</div></Container></div></section>;
}

export function ClientSuccess() {
  return <section className="or-success">
    <div className="or-success-pattern" aria-hidden="true"><Image src={asset("case-studies", "clients-success.webp")} alt="" fill sizes="100vw" /></div>
    <Container><Heading eyebrow="CLIENTS SUCCESS">The Outrank <span>effect</span></Heading><SuccessCarousel /><div className="or-success-action"><Button>Start for Free</Button></div></Container>
  </section>;
}

export function CaseStudies() {
  return <section className="or-section or-cases" id="case-studies"><Container>
    <div className="or-cases-top"><div className="or-cases-heading"><Eyebrow>CASE STUDIES</Eyebrow><h2>The results, <span>month by month</span></h2><p>Real Search Console data from named customers. Across 2,119 sites, the median site reached 2.0× its clicks about 7 months in. <a href="https://www.outrank.so/case-studies/do-ai-seo-agents-work">Read the study</a></p></div><a className="or-cases-all" href="https://www.outrank.so/case-studies">All case studies →</a></div>
    <div className="or-case-grid">{cases.map((item) => <a className="or-case-card" key={item.name} href={item.url}><div className="or-case-brand"><Image src={asset("testimonials", item.logo)} width={42} height={42} alt="" /><span><b>{item.name}</b><small>{item.category}</small></span></div><strong className="or-case-metric">{item.metric}</strong><p>{item.measure}</p><h3>{item.title}</h3><div className="or-case-person"><Image src={asset("testimonials", item.portrait)} width={35} height={35} alt="" /><span>{item.author}, {item.name}</span><span aria-hidden="true">↗</span></div></a>)}</div>
  </Container></section>;
}

export function ProblemSolution() {
  return <section className="or-section or-problem"><Container><div className="or-problem-head"><div><Eyebrow>PROBLEMS &amp; SOLUTION</Eyebrow><h2>Your problem<br /><span>Our solution</span></h2><p>Replace multiple tools with one powerful platform:</p></div><div className="or-problem-tags">{["Keyword Searching", "Content Generation", "Content Optimization", "Backlink Building", "Images", "Localization"].map(t => <span key={t}>{t}</span>)}</div></div><div className="or-problem-art"><picture><source media="(max-width: 767px)" srcSet={asset("features", "solutions-mob.svg")} /><Image src={asset("features", "solutions-desktop.svg")} alt="SEO tools consolidated into Outrank" width={1170} height={550} sizes="(max-width: 767px) 90vw, 1170px" /></picture></div></Container></section>;
}

export function HowItWorks() {
  return <section className="or-section or-how" id="howitworks"><Container><div className="or-how-intro"><div><Eyebrow>HOW IT WORKS</Eyebrow><h2>How we <span>make magic</span> happen</h2></div><div><p>We handle the SEO heavy lifting. Relax while we create daily ranking content to keep you ahead of the competition.</p><Button /></div></div><div className="or-how-grid">{steps.map((step) => <article key={step.title} className="or-how-step"><div className="or-how-image"><Visual folder="how-it-works" name={step.image} alt={step.title} /></div><div className="or-how-copy"><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div><div className="or-center or-how-mobile-cta"><Button /></div></Container></section>;
}
