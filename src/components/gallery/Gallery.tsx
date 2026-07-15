import { Reveal } from "../site/Reveal";
import { MotionReel } from "./MotionReel";

// WebP Poster Imports
import blueberry from "@/assets/Graphics/BLUEBERRY.webp";
import culturalVibes from "@/assets/Graphics/CULTURAL VIBES.webp";
import iceCream from "@/assets/Graphics/Pink Pastel Ice Cream Advertisement Instagram Post.webp";
import chocolateFlavor from "@/assets/Graphics/chocolate flavor.webp";
import chocolate from "@/assets/Graphics/chocolate.webp";
import milkshake from "@/assets/Graphics/milkshake.webp";
import newFlavours from "@/assets/Graphics/new flavours.webp";
import redbull from "@/assets/Graphics/redbull (1).webp";
import restaurant from "@/assets/Graphics/restaurant (1).webp";
import nike from "@/assets/Graphics/walk with nike (4).webp";

const posters = [
  { img: culturalVibes, title: "Cultural Vibes", tag: "Poster" },
  { img: nike, title: "Walk with Nike", tag: "Campaign" },
  { img: redbull, title: "Energy Surge", tag: "Promo" },
  { img: blueberry, title: "Blueberry Fresh", tag: "Product" },
  { img: chocolateFlavor, title: "Choco Flavor", tag: "Ad" },
  { img: restaurant, title: "Restaurant Special", tag: "Social" },
  { img: milkshake, title: "Classic Milkshake", tag: "Promo" },
  { img: iceCream, title: "Pink Pastel Ice Cream", tag: "Social" },
  { img: newFlavours, title: "New Flavours Launch", tag: "Launch" },
  { img: chocolate, title: "Premium Chocolate", tag: "Product" },
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
            <Tile img={p.img} title={p.title} tag={p.tag} />
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

function Tile({ img, title, tag }: { img: string; title: string; tag: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl glass w-full">
      <img
        src={img}
        alt={`${title} — Invonics Technologies Gallery`}
        loading="lazy"
        decoding="async"
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
