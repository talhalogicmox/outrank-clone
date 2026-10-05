import Image from "next/image";
import Link from "next/link";
import { asset, footerGroups, site } from "@/data/homepage";
import { Container } from "./ui";

export function Footer() {
  return <footer className="or-footer"><Container>
    <div className="or-footer-top"><Link href="/" aria-label="Outrank home"><Image src={asset("logos", "logo.svg")} alt="Outrank" width={120} height={32} /></Link><a href="https://x.com/outrank_so" aria-label="Outrank on X"><Image src={asset("misc", "twitter.svg")} width={25} height={25} alt="" /></a></div>
    <div className="or-footer-grid">{footerGroups.map((group) => <nav key={group.title} aria-label={group.title}><h3>{group.title}</h3><ul>{group.links.map(([label, href]) => <li key={label}><a href={href.startsWith("/") && !href.startsWith("/#") ? site + href : href}>{label}</a></li>)}</ul></nav>)}</div>
    <div className="or-footer-bottom">© 2026 All rights reserved Outrank</div>
  </Container></footer>;
}
