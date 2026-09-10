import { contact, site, plans } from "@/content";
import type { Article, Competition, Quiz } from "@/content";

/**
 * Structured data.
 * Only facts that are actually true are emitted. No aggregateRating,
 * no review counts, no invented awards — search engines penalise
 * fabricated markup and, more to the point, it would be dishonest.
 */

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organisationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}#organization`,
  name: site.name,
  legalName: site.legalEntity,
  url: site.url,
  logo: `${site.url}/brand/kidschron-logo.png`,
  slogan: site.tagline,
  description: site.description,
  parentOrganization: {
    "@type": "Organization",
    name: site.legalEntity,
    logo: `${site.url}/brand/prakritik-logo.png`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.state,
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contact.phoneHrefs[0],
      email: contact.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}#organization` },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const articleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.summary,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt ?? article.publishedAt,
  articleSection: article.category,
  timeRequired: `PT${article.readingMinutes}M`,
  inLanguage: "en-IN",
  isAccessibleForFree: true,
  publisher: { "@id": `${site.url}#organization` },
  mainEntityOfPage: `${site.url}/article/${article.slug}`,
  // Audience is a real, useful signal for a children's publication.
  audience: {
    "@type": "PeopleAudience",
    audienceType: "Children",
    ...(article.ageBands?.length
      ? { suggestedMinAge: Number(article.ageBands[0].split("-")[0].replace("+", "")) }
      : {}),
  },
});

export const quizSchema = (quiz: Quiz) => ({
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: quiz.title,
  description: quiz.summary,
  educationalLevel: quiz.ageBands?.join(", "),
  publisher: { "@id": `${site.url}#organization` },
  hasPart: quiz.questions.map((q) => ({
    "@type": "Question",
    eduQuestionType: "Multiple choice",
    text: q.prompt,
    acceptedAnswer: { "@type": "Answer", text: q.options[q.answerIndex] },
  })),
});

export const competitionSchema = (c: Competition) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: c.title,
  description: c.summary,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus:
    c.status === "closed"
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
  organizer: { "@id": `${site.url}#organization` },
  ...(c.opensOn ? { startDate: c.opensOn } : {}),
  ...(c.closesOn ? { endDate: c.closesOn } : {}),
});

export const breadcrumbSchema = (items: { label: string; href?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    ...(item.href ? { item: `${site.url}${item.href}` } : {}),
  })),
});

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

/** Product/Offer markup for the two subscription plans. */
export const subscriptionSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${site.name} Subscription`,
  description: `A printed children's newspaper delivered to your address. ${site.tagline}.`,
  brand: { "@type": "Brand", name: site.name },
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.offerPrice,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: `${site.url}/subscribe`,
    eligibleQuantity: {
      "@type": "QuantitativeValue",
      value: p.editions,
      unitText: "editions",
    },
  })),
});
