import { Reveal } from "./Reveal";
import motion from "@/assets/showcase-motion.jpg";
import poster from "@/assets/showcase-poster.jpg";
import brand from "@/assets/showcase-brand.jpg";

export function Showcase() {
  return (
    <section className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            <span className="text-primary">●</span>&nbsp; Creative Studio
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-3xl">
            Visual systems with a sense of taste.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-4 md:gap-5">
          <Reveal className="col-span-12 md:col-span-5">
            <Tile img={motion} title="Motion Reel · 04" tag="Motion" tall />
          </Reveal>
          <Reveal delay={100} className="col-span-12 md:col-span-7 grid grid-rows-2 gap-4 md:gap-5">
            <Tile img={brand} title="Identity System — Sirine" tag="Branding" />
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <Tile img={poster} title="Poster Series" tag="Print" />
              <div className="rounded-3xl glass p-7 flex flex-col justify-between min-h-[220px]">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="text-primary">●</span>&nbsp; Campaign
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                    “Made for the
                    <br />
                    <span className="text-gradient-accent">next decade.</span>”
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Anthem · Q3 brand campaign · 12 assets
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tile({
  img,
  title,
  tag,
  tall = false,
}: {
  img: string;
  title: string;
  tag: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl glass ${
        tall ? "h-full min-h-[460px]" : "h-full min-h-[220px]"
      }`}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary/90">{tag}</div>
        <div className="mt-1 font-display text-lg text-foreground">{title}</div>
      </div>
    </div>
  );
}
