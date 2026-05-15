import { Reveal } from "./Reveal";
import { Linkedin, Mail } from "lucide-react";
import t1 from "@/assets/team-1.jpeg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";

const team = [
  {
    img: t1,
    name: "Sydney Kamau",
    role: "Founder & Systems Lead",
    bio: "Engineers the studio's software architecture, infrastructure rollouts and client systems end-to-end.",
    span: "lg:col-span-5 lg:row-span-2",
  },
  {
    img: t2,
    name: "Amani Wanjiru",
    role: "Software Engineer",
    bio: "Designs and ships the school management tooling, internal automations and front-end systems.",
    span: "lg:col-span-4",
  },
  {
    img: t3,
    name: "Brian Otieno",
    role: "Brand & Interface Designer",
    bio: "Owns the visual language — websites, identity systems and the studio's editorial direction.",
    span: "lg:col-span-3 lg:row-span-2",
  },
  {
    img: t4,
    name: "Naliaka Mbeki",
    role: "Operations & Client Success",
    bio: "Coordinates deployments, school onboarding and the day-to-day rhythm of every engagement.",
    span: "lg:col-span-4",
  },
];

export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative border-t border-border/60 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-12 items-end gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <div className="label-mono mb-4">
              <span className="text-primary">●</span>&nbsp; § 04 / The Team
            </div>
            <h2
              id="team-heading"
              className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]"
            >
              A small studio, engineered to ship.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Four operators across engineering, design and delivery — building real systems for
              schools, SMEs and growing teams.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:auto-rows-[280px]">
          {team.map((m) => (
            <Reveal key={m.name} className={m.span}>
              <article className="group relative h-full overflow-hidden border border-border bg-card">
                <div className="absolute inset-0">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at Invonics Technologies`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-3 label-mono">
                  <span>
                    <span className="text-primary">[</span>
                    {String(team.indexOf(m) + 1).padStart(2, "0")}
                    <span className="text-primary">]</span>
                  </span>
                  <span className="opacity-60">INV · TEAM</span>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight">
                    {m.name}
                  </h3>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-primary">
                    {m.role}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {m.bio}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href="#contact"
                      aria-label={`Email ${m.name}`}
                      className="grid h-8 w-8 place-items-center border border-border text-foreground/80 hover:text-primary hover:border-primary/60 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid h-8 w-8 place-items-center border border-border text-foreground/80 hover:text-primary hover:border-primary/60 transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
