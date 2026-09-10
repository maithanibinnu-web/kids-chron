import type { Metadata } from "next";
import {
  ClosingBand,
  CompetitionsStrip,
  ContentModes,
  CreateAndImagine,
  DiscoverPicker,
  DiscoverTheWorld,
  ExploreNature,
  Hero,
  LearnEveryDay,
  MonthlyEditionSection,
  ParentChildZone,
  PositiveMinds,
  ReaderCornerStrip,
  SchoolsCta,
  SubscriptionSection,
  Testimonials,
  ThinkAndSolve,
  WhatsInsideGrid,
  WhyKidsChron,
} from "@/components/home/sections";
import { JsonLd, subscriptionSchema } from "@/components/seo/JsonLd";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * HOMEPAGE
 * Read top to bottom, this is a story rather than a menu:
 * who we are → why this exists → what you can discover → how it works
 * → what to read now → what to make → who it is for → what arrives in
 * the post → how to get it.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={subscriptionSchema()} />
      <Hero />
      <DiscoverPicker />
      <WhyKidsChron />
      <DiscoverTheWorld />
      <ContentModes />
      <LearnEveryDay />
      <ThinkAndSolve />
      <CreateAndImagine />
      <PositiveMinds />
      <ExploreNature />
      <MonthlyEditionSection />
      <WhatsInsideGrid />
      <CompetitionsStrip />
      <ReaderCornerStrip />
      <ParentChildZone />
      <SchoolsCta />
      <SubscriptionSection />
      <Testimonials />
      <ClosingBand />
    </>
  );
}
