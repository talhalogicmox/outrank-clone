import Image from "next/image";
import { asset, aiSeo, planIncludes, site } from "@/data/homepage";
import { testimonials } from "@/data/testimonials";
import { Button, Container, Heading, Proof, Visual } from "./ui";
import { FAQ } from "./FAQ";

export function AIInSEO() {
  return <section className="or-section or-ai"><Container><Heading eyebrow="AI IN SEO" description="AI chooses businesses based on SEO. Learn how and get ahead">Make AI recommend <span>Your Business</span></Heading><div className="or-ai-grid">{aiSeo.map((item) => <article key={item.title} className="or-ai-card"><div className="or-ai-images">{item.images.map((name) => <Visual key={name} folder="misc" name={name} alt={item.title} />)}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="or-center"><a className="or-text-link" href={`${site}/success-stories/aiapply`}>See how AIApply got picked up in AI answers with Outrank →</a><Button href={`${site}/ai-visibility`}>Explore AI visibility</Button></div></Container></section>;
}

export function Testimonials() {
  return <section className="or-section or-testimonials" id="testimonials"><Container><Heading>Loved by <span>Busy Entrepreneurs!</span></Heading><div className="or-testimonial-grid">{testimonials.map((item, index) => <blockquote key={item.id} className="or-testimonial"><div className="or-testimonial-author"><Image src={asset("testimonials", `wall-${index}.jpg`)} width={43} height={43} alt="" /><span><strong>{item.name}</strong><small>{item.handle}</small></span><a href={`https://twitter.com/i/status/${item.id}`} aria-label={`View ${item.name}'s post on X`} target="_blank" rel="noopener noreferrer">𝕏</a></div><p>{item.quote}</p><small className="or-testimonial-date">{item.date}</small></blockquote>)}</div></Container></section>;
}

export function Pricing() {
  return <section className="or-section or-pricing" id="pricing"><Container><Heading eyebrow="PRICING" description="Outrank grows your SEO rankings and organic traffic while you focus on growing your business.">Grow Organic Traffic on Auto-Pilot</Heading><Proof /><div className="or-pricing-card"><div className="or-plan-intro"><h3>Organic Growth</h3><p>Articles + backlinks</p><div className="or-price"><strong>$99</strong><del>$199</del><span>/mo</span></div><p>Cancel anytime. No questions asked!</p><Button>Get Started for Free</Button></div><div className="or-plan-features"><h4>What&apos;s included:</h4><ul>{planIncludes.map((text) => <li key={text}><Image src={asset("icons", "check.svg")} width={19} height={19} alt="" />{text}</li>)}</ul></div></div><div className="or-price-note"><strong>More sites, less per site!</strong><span>Volume discounts apply automatically</span><a href="mailto:hello@outrank.so">Running 25+ sites? Talk to us ↗</a></div></Container></section>;
}

export function Questions() {
  return <section className="or-section or-faq" id="faq"><Container><Heading eyebrow="FAQ" description="If you can't find what you're looking for, feel free to reach out!">Have Questions?</Heading><FAQ /></Container></section>;
}

export function FinalCTA() {
  return <section className="or-final"><div className="or-final-bg"><Image src={asset("backgrounds", "fiesta-bg.webp")} alt="" fill sizes="100vw" /></div><Container><div className="or-final-content"><span className="or-eyebrow">LET&apos;S TRY!</span><h2>Start creating magic today with a free trial!</h2><Button>Get Started for Free</Button></div></Container></section>;
}
