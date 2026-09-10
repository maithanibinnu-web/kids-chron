import Link from "next/link";
import { ArtScene } from "@/components/ui/ArtScene";
import { Card, Chip, SampleBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { categoryBySlug, styleFor, type Article, type AgeBand } from "@/content";

function AgeChips({ bands }: { bands?: AgeBand[] }) {
  if (!bands?.length) return null;
  return (
    <span className="text-[0.72rem] font-semibold text-ink-mute">
      Ages {bands.map((b) => b.replace("-", "–")).join(" · ")}
    </span>
  );
}

export function ArticleCard({
  article,
  size = "md",
  className = "",
}: {
  article: Article;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const cat = categoryBySlug(article.category);
  const s = styleFor(article.category);

  if (size === "sm") {
    return (
      <Card as="article" interactive className={`flex gap-4 p-3 ${className}`}>
        <div className="relative w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
          <ArtScene art={article.artwork.art} alt={article.artwork.alt} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 py-1 pr-2">
          <Chip className={`${s.chipBg} ${s.chipText} ${s.chipRing} mb-1.5`}>
            {cat?.name}
          </Chip>
          <h3 className="text-[1.02rem] leading-snug">
            <Link href={`/article/${article.slug}`} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 text-[0.8rem] text-ink-mute">
            {article.readingMinutes} min read
          </p>
        </div>
      </Card>
    );
  }

  const large = size === "lg";

  return (
    <Card as="article" interactive className={`flex flex-col ${className}`}>
      <div className={`relative ${large ? "aspect-[16/9]" : "aspect-[16/10]"} overflow-hidden`}>
        <ArtScene
          art={article.artwork.art}
          alt={article.artwork.alt}
          className="h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Chip className={`${s.chipBg} ${s.chipText} ${s.chipRing} bg-opacity-95 backdrop-blur`}>
            {cat && <Icon name={cat.icon} className="w-3.5 h-3.5" strokeWidth={2} />}
            {cat?.name}
          </Chip>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={large ? "text-2xl" : "text-xl"}>
          <Link
            href={`/article/${article.slug}`}
            className="after:absolute after:inset-0 hover:text-blue-800"
          >
            {article.title}
          </Link>
        </h3>
        <p className={`mt-2.5 flex-1 text-ink-soft ${large ? "text-[1.02rem]" : "text-[0.94rem]"}`}>
          {article.summary}
        </p>
        <footer className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3.5 text-[0.78rem] text-ink-mute">
          <span className="font-semibold">{article.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <AgeChips bands={article.ageBands} />
          {article.provenance === "sample" && (
            <SampleBadge className="ml-auto" />
          )}
        </footer>
      </div>
    </Card>
  );
}

/** Compact numbered list item used in "Learn Every Day" and sidebars. */
export function ArticleListItem({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const cat = categoryBySlug(article.category);
  return (
    <li className="group relative flex gap-4 border-b border-line py-4 last:border-0">
      <span className="w-7 shrink-0 font-display text-2xl text-navy-200">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-blue-700">
          {cat?.name}
        </p>
        <h3 className="mt-0.5 text-[1.05rem] leading-snug">
          <Link href={`/article/${article.slug}`} className="hover:text-blue-800">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 text-[0.85rem] text-ink-mute">
          {article.readingMinutes} min read
        </p>
      </div>
    </li>
  );
}
