import Image from "next/image";
import { asset, signup } from "@/data/homepage";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`or-container ${className}`}>{children}</div>;
}

export function Button({ children = "Start for Free", href = signup, secondary = false }: { children?: ReactNode; href?: string; secondary?: boolean }) {
  return <a className={`or-button ${secondary ? "or-button-secondary" : ""}`} href={href}>{children}<Image src={asset("icons", "white-arrow.svg")} width={20} height={20} alt="" /></a>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="or-eyebrow">{children}</span>;
}

export function Heading({ eyebrow, children, description, className = "" }: { eyebrow?: string; children: ReactNode; description?: string; className?: string }) {
  return <Reveal><div className={`or-heading ${className}`}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{children}</h2>{description && <p>{description}</p>}</div></Reveal>;
}

export function Visual({ folder, name, alt, className = "", priority = false }: { folder: string; name: string; alt: string; className?: string; priority?: boolean }) {
  return <Image src={asset(folder, name)} alt={alt} width={1200} height={800} className={className} sizes="(max-width: 600px) 90vw, (max-width: 1100px) 50vw, 600px" priority={priority} />;
}

export function Proof() {
  return <div className="or-proof"><div className="or-avatars">{[1, 2, 3, 4, 5].map((n) => <Image key={n} src={asset("testimonials", `avatar-${n}.webp`)} alt="" width={32} height={32} />)}</div><div><Image src={asset("icons", "stars.svg")} alt="Five stars" width={81} height={16} /><span>750m+ Organic Views</span></div></div>;
}
