import { WorkSolution } from "../../types/content";

// BACKLOG — not migrated to /portfolio with the rest of /work. It only has
// a card-level summary, no real problem/approach/results copy. Turning it
// into a /portfolio/$slug page today would just recreate the "low content
// page" issue flagged in the Screaming Frog audit. Write the real case
// study first, then move this into src/content/portfolio/.
const solution: WorkSolution = {
  slug: "operations-console",
  title: "Operations Console",
  category: "Operations",
  statChip: "Realtime · Multi-tenant",
  summary:
    "Cuts order errors and turns tables faster — one operating layer connecting front-of-house and kitchen in real time.",
  order: 4,
  // No public self-serve demo yet — card falls back to a walkthrough request.
  metaDescription:
    "A realtime, multi-tenant operations console for restaurants and service businesses — orders, tables and staff coordinated in one dashboard.",
};

export default solution;
