"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { asset, nav, signup, site } from "@/data/homepage";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="or-navbar"><div className="or-nav-inner">
    <Link href="/" aria-label="Outrank home"><Image src={asset("logos", "logo.svg")} width={120} height={32} alt="Outrank" priority /></Link>
    <nav className="or-nav-links" aria-label="Main navigation">{nav.map(([text, href]) => <a key={text} href={href}>{text}</a>)}</nav>
    <div className="or-nav-actions"><a className="or-google" href={signup}><Image src={asset("misc", "google.svg")} alt="" width={20} height={20} />Join with Google</a><a className="or-nav-cta" href={signup}>Start for Free <span aria-hidden="true">→</span></a><button className="or-menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="or-mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button></div>
  </div>
  <nav id="or-mobile-menu" className={`or-mobile-menu ${open ? "is-open" : ""}`} aria-label="Mobile navigation" inert={!open}>{nav.map(([text, href]) => <a key={text} href={href} onClick={() => setOpen(false)}>{text}</a>)}<a href={`${site}/signin`}>Sign In</a></nav>
  </header>;
}
