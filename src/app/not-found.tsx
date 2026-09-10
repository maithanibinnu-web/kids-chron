import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { categories } from "@/content";

export default function NotFound() {
  return (
    <Container className="py-20 text-center sm:py-28">
      <p className="font-display text-6xl text-navy-200">404</p>
      <h1 className="mt-4 text-4xl">This page went exploring without us</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
        The page you were after is not here. It may have moved, or the link may
        have a typo in it. Here is somewhere better to go.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Back to the front page
        </ButtonLink>
        <ButtonLink href="/search" variant="secondary" size="lg">
          Search KidsChron
        </ButtonLink>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-mute">
          Or pick a subject
        </h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/explore/${c.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-200 bg-paper px-4 py-2 text-[0.9rem] font-semibold text-navy-800 hover:border-blue-400 hover:bg-blue-50"
              >
                <Icon name={c.icon} className="h-4 w-4 text-blue-600" strokeWidth={2} />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
