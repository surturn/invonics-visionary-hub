import { Reveal } from "../site/Reveal";
import { MotionReel } from "./MotionReel";

// WebP Poster Imports — trimmed to 3 representative pieces (was 8, several
// near-duplicates of the same client) to stop diluting the portfolio's
// topical focus on software work. Nike/Redbull dropped: unauthorized-looking
// use of third-party trademarks as "client work" — separate brand/trust risk
// flagged back to the client, not just an SEO call.
import culturalVibes from "@/assets/Graphics/CULTURAL VIBES.webp";
import milkshake from "@/assets/Graphics/milkshake.webp";
import restaurant from "@/assets/Graphics/restaurant (1).webp";

const posters = [
  { img: culturalVibes, w: 800, h: 1132, title: "Cultural Vibes", tag: "Poster" },
  { img: milkshake, w: 800, h: 1000, title: "Classic Milkshake", tag: "Promo" },
  { img: restaurant, w: 800, h: 1132, title: "Restaurant Special", tag: "Social" },
];

export function Gallery() {
  return (
    <div>
      {/* Masonry Layout for Uncropped Posters */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6">
        {posters.map((p, i) => (
          <Reveal 
            key={i} 
            delay={(i % 3) * 100} 
            className="break-inside-avoid mb-5 md:mb-6 block w-full"
          >
            <Tile img={p.img} imgW={p.w} imgH={p.h} title={p.title} tag={p.tag} />
          </Reveal>
        ))}
      </div>

      {/*
      <MotionReel
        eyebrow="05 / MOTION"
        title="Motion Reel"
        description="Campaign motion graphics land here — drop in a video and this slot picks it up automatically."
      />
      */}
    </div>
  );
}

function Tile({
  img,
  imgW,
  imgH,
  title,
  tag,
}: {
  img: string;
  imgW: number;
  imgH: number;
  title: string;
  tag: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl glass w-full">
      <img
        src={img}
        alt={`${title} — Invonics Technologies Gallery`}
        loading="lazy"
        decoding="async"
        width={imgW}
        height={imgH}
        className="w-full h-auto object-contain transition-transform duration-[1600ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary/90 font-medium drop-shadow-md">{tag}</div>
        <div className="mt-1 font-display text-lg text-foreground drop-shadow-md">{title}</div>
      </div>
    </div>
  );
}
