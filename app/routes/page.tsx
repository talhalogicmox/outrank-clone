import type { Metadata } from "next";
import RoutesClientView from "./RoutesClientView";

export const metadata: Metadata = {
  title: "Route Architecture & CMS Interface Spec | DevPulse",
  description:
    "Interactive route-first CMS specification detailing route patterns, rendering strategies, file paths, and live working links.",
};

export default function RoutesPage() {
  return <RoutesClientView />;
}
