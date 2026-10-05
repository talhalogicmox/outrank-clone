import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/outrank/Navbar";
import { Footer } from "@/components/outrank/Footer";
import { Hero, Stats, ClientSuccess, CaseStudies, ProblemSolution, HowItWorks } from "@/components/outrank/IntroSections";
import { Features, BacklinkSection, Integrations, AdditionalFeatures, WritingExamples } from "@/components/outrank/ProductSections";
import { AIInSEO, Testimonials, Pricing, Questions, FinalCTA } from "@/components/outrank/ClosingSections";
import { faqs, site } from "@/data/homepage";
import "./outrank.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--or-font-jakarta" });

export const metadata: Metadata = {
  title: { absolute: "Outrank - Grow Organic Traffic on Auto-Pilot" },
  description: "Get recommended by ChatGPT & Rank on Google. Get done-for-you Blog Posts, Backlinks and Free Tools while you sleep.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Outrank - Grow Organic Traffic on Auto-Pilot",
    description: "Get recommended by ChatGPT & Rank on Google. Get done-for-you Blog Posts, Backlinks and Free Tools while you sleep.",
    url: "/",
    siteName: "Outrank",
    type: "website",
    images: [{ url: "/assets/outrank/misc/outrank-og.png", width: 2400, height: 1200, alt: "Outrank organic traffic product preview" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@outrank_so",
    creator: "@outrank_so",
    title: "Outrank - Grow Organic Traffic on Auto-Pilot",
    description: "Get recommended by ChatGPT & Rank on Google. Get done-for-you Blog Posts, Backlinks and Free Tools while you sleep.",
    images: ["/assets/outrank/misc/outrank-og.png"],
  },
  icons: {
    icon: { url: "/assets/outrank/misc/icon.png", type: "image/png", sizes: "192x192" },
    apple: { url: "/assets/outrank/misc/apple-icon.png", sizes: "180x180" },
  },
};

export default function HomePage() {
  return <div className={`outrank-home ${jakarta.variable}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", name: "Outrank", url: site, logo: `${site}/icon.png` },
        { "@type": "WebSite", name: "Outrank", url: site },
        { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
      ],
    }).replace(/</g, "\\u003c") }} />
    <Navbar />
    <div id="outrank-main">
      <Hero /><Stats /><ClientSuccess /><CaseStudies /><ProblemSolution /><HowItWorks />
      <Features /><BacklinkSection /><Integrations /><AdditionalFeatures /><WritingExamples />
      <AIInSEO /><Testimonials /><Pricing /><Questions /><FinalCTA />
    </div>
    <Footer />
  </div>;
}
