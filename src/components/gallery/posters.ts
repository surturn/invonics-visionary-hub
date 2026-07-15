import nikeLayer1 from "@/assets/Graphics/Nike/layer1.webp";
import nikeLayer2 from "@/assets/Graphics/Nike/layer2.webp";
import nikeLayer3 from "@/assets/Graphics/Nike/layer3.webp";
import redbullLayer1 from "@/assets/Graphics/Redbull/layer1.webp";
import redbullLayer2Cut from "@/assets/Graphics/Redbull/layer2-cut.webp";
import redbullLayer3Cut from "@/assets/Graphics/Redbull/layer3-cut.webp";
import chocolate from "@/assets/Graphics/chocolate.webp";
import restaurant from "@/assets/Graphics/restaurant (1).webp";
import type { PosterLayer } from "./types";

// All source posters share the same 1414x2000 canvas (~0.707 aspect ratio),
// so the whole gallery grid can share one frame ratio.
export const POSTER_ASPECT = "1414 / 2000";

export type LayeredPosterConfig = {
  eyebrow: string;
  title: string;
  layers: PosterLayer[];
};

export type FlatPosterConfig = {
  eyebrow: string;
  title: string;
  src: string;
  alt: string;
  variant: "hoverLift" | "suspend";
};

export const nikePoster: LayeredPosterConfig = {
  eyebrow: "01 / NIKE",
  title: "Walk With Nike",
  layers: [
    {
      src: nikeLayer1,
      alt: "Nike campaign background — split orange and forest-green geometry",
      zIndex: 1,
      parallax: 10,
    },
    {
      src: nikeLayer2,
      alt: '"Walk With Nike" repeating typography',
      zIndex: 2,
      parallax: -40,
      // Full-bleed — the text's own internal padding provides the margin.
      widthPct: 1,
      heightPct: 1,
    },
    {
      src: nikeLayer3,
      alt: "Nike Dunk Low sneaker pair",
      zIndex: 3,
      parallax: -80,
      // Contained within layer2's footprint, not layer1's.
      widthPct: 0.7,
      heightPct: 0.7,
    },
  ],
};

export const redbullPoster: LayeredPosterConfig = {
  eyebrow: "02 / RED BULL",
  title: "Energized",
  layers: [
    {
      src: redbullLayer1,
      alt: "Red Bull campaign background — navy and white diagonal split",
      zIndex: 1,
      parallax: 10,
    },
    {
      src: redbullLayer2Cut,
      alt: 'Repeating "ENERGIZED" typography',
      zIndex: 2,
      parallax: -40,
      // Spans nearly all of layer1, just inset from the margin borders.
      widthPct: 0.92,
      heightPct: 0.92,
    },
    {
      src: redbullLayer3Cut,
      alt: "Red Bull can with ice, citrus slice and straw",
      zIndex: 3,
      parallax: -80,
      // Contained within layer2's footprint, not layer1's.
      widthPct: 0.7,
      heightPct: 0.7,
    },
  ],
};

export const chocolatePoster: FlatPosterConfig = {
  eyebrow: "03 / CHOCOLATE",
  title: "Suspended",
  src: chocolate,
  alt: "Chocolate product poster",
  variant: "suspend",
};

export const restaurantPoster: FlatPosterConfig = {
  eyebrow: "04 / RESTAURANT",
  title: "Table for One",
  src: restaurant,
  alt: "Restaurant menu poster",
  variant: "hoverLift",
};
