import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getHome } from "@/lib/catalog.functions";
import { prescription } from "@/lib/format";
import { labelLevel } from "@/lib/options";
import { FREE_FEATURES, PRO_FEATURES, PRO_PRICE } from "@/lib/pricing";
import type { Program } from "@/lib/types";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/")({
  loader: () => getHome(),
  component: Home,
});

const GOAL_TILES = [
  { slug: "fat-loss-30", title: "Lose fat", image: "/media/burn.jpg", klass: "goal-a", note: "30 days" },
  { slug: "home-muscle", title: "Build muscle", image: "/media/power.jpg", klass: "goal-b", note: "Dumbbells" },
  { slug: "chest-builder", title: "Build chest", image: "/media/chest.jpg", klass: "goal-c", note: "Pressing" },
  { slug: "arm-builder", title: "Build arms", image: "/media/arms.jpg", klass: "goal-d", note: "Upper body" },
  { slug: "leg-engine", title: "Build legs", image: "/media/legs.jpg", klass: "goal-e", note: "Lower body" },
  { slug: "abs-attack", title: "Build abs", image: "/media/core.jpg", klass: "goal-f", note: "Core" },
];

export function Home() {
  const { programs, featured } = Route.useLoaderData();
  const lead = findProgram(programs, "fat-loss-30") ?? programs[0];
  const side = ["chest-builder", "home-muscle", "abs-attack", "full-body-athlete"]
    .map((slug) => findProgram(programs, slug))
    .filter((item): item is Program => Boolean(item))
    .slice(0, 2);

  return (
    <Shell mode="marketing">
      <section className="grain relative min-h-[100svh]">
        <img
          src="/media/hero.jpg"
          alt="Athlete training in a dark studio, seen from behind"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pt-24 pb-10 md:pb-16">
          <p className="kicker text-fg/70">Home training system</p>
          <h1 className="display poster-hero mt-4 max-w-5xl">
            Train
            <br />
            without
            <br />
            limits.
          </h1>
          <div className="mt-8 flex max-w-xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="text-fg/80 max-w-sm text-base">
              Tell TREX the body you want. Get a visual path you can follow with the equipment you already own.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="bg-accent text-accent-fg inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-medium"
              >
                Start training
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/programs"
                className="border-fg/30 text-fg inline-flex min-h-12 items-center justify-center border px-5 text-sm"
              >
                Explore programs
              </Link>
            </div>
          </div>
          {featured ? (
            <p className="kicker text-fg/80 mt-8">
              Next session · {featured.workoutTitle} · {featured.exerciseName}
            </p>
          ) : null}
        </div>
      </section>

      <section id="goals" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="display poster max-w-3xl">
            What are you
            <br />
            training for?
          </h2>
          <Link to="/programs" className="text-muted hidden text-sm md:inline">
            All programs
          </Link>
        </div>
        <div className="goal-mosaic">
          {GOAL_TILES.map((goal) => (
            <Link key={goal.slug} to="/programs/$id" params={{ id: goal.slug }} className={`goal-tile group ${goal.klass}`}>
              <img
                src={goal.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="tile-scrim absolute inset-0" />
              <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-5">
                <p className="kicker">{goal.note}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <h3 className="display text-5xl md:text-6xl">{goal.title}</h3>
                  <ArrowRight className="mb-2 size-5 opacity-0 transition duration-200 group-hover:opacity-100 motion-reduce:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative min-h-[80svh]">
        <img src="/media/engine.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/55" />
        <div className="relative mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-end px-5 py-16">
          <h2 className="display poster max-w-4xl">
            Your gym.
            <br />
            Anywhere.
          </h2>
          <p className="text-fg/80 mt-6 max-w-md text-base">
            Structured sessions built around your goal, the gear in the room, and how many days you can actually keep.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Chip label="30 min" />
            <Chip label="No equipment" />
            <Chip label="Beginner" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <p className="kicker">Programs</p>
        <h2 className="display section-title mt-3 max-w-3xl">One block. Then the next.</h2>
        <div className="program-stage mt-10">
          {lead ? (
            <Link to="/programs/$id" params={{ id: lead.slug }} className="program-lead group relative block min-h-[28rem] overflow-hidden">
              <img
                src={lead.coverImage ?? "/media/burn.jpg"}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="tile-scrim absolute inset-0" />
              <div className="relative flex h-full min-h-[28rem] flex-col justify-end p-6 md:p-10">
                <p className="kicker">
                  {lead.durationDays} days · {labelLevel(lead.difficulty)}
                  {lead.premium ? " · Pro" : ""}
                </p>
                <h3 className="display mt-3 max-w-md text-6xl md:text-7xl">{lead.title}</h3>
                <p className="text-fg/80 mt-4 max-w-sm text-sm">{lead.description}</p>
              </div>
            </Link>
          ) : null}
          <div className="program-side grid gap-3">
            {side.map((program) => (
              <Link key={program.id} to="/programs/$id" params={{ id: program.slug }} className="group relative block min-h-52 overflow-hidden">
                <img
                  src={program.coverImage ?? "/media/engine.jpg"}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="tile-scrim absolute inset-0" />
                <div className="relative flex h-full min-h-52 flex-col justify-end p-5">
                  <p className="kicker">
                    {program.durationDays} days · {labelLevel(program.difficulty)}
                  </p>
                  <h3 className="display mt-2 text-4xl">{program.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line border-y">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="kicker">Inside a session</p>
            <h2 className="display section-title">You follow the work. TREX keeps the clock.</h2>
            <p className="text-muted mt-4 max-w-md text-sm">
              Sets, rest, and the next movement stay on screen. Finish the session and the streak updates.
            </p>
            {featured ? (
              <Link to="/workouts/$id" params={{ id: featured.workoutId }} className="text-accent mt-6 inline-flex items-center gap-2 text-sm">
                Open {featured.workoutTitle}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
          <div className="border-line bg-elevated border p-5 md:p-8">
            <div className="flex items-center justify-between text-sm">
              <p className="kicker">{featured?.programTitle ?? "Chest + triceps"}</p>
              <p className="tabular-nums">04 / 08</p>
            </div>
            <div className="bg-line mt-4 h-px">
              <div className="bg-accent h-px w-1/2" />
            </div>
            <h3 className="display mt-8 text-6xl">{featured?.exerciseName ?? "Push-ups"}</h3>
            <p className="text-muted mt-3 text-lg">
              {featured ? prescription(featured.sets, featured.reps, featured.seconds) : "3 × 12"} · Rest 60s
            </p>
            <img src={featured?.coverImage ?? "/media/chest.jpg"} alt="" className="mt-6 aspect-[16/9] w-full object-cover" />
            <div className="mt-6 flex items-center justify-between">
              <span className="text-muted text-sm">32 min session</span>
              <span className="bg-accent text-accent-fg inline-flex min-h-11 items-center px-4 text-sm">Next</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <p className="display section-title max-w-4xl normal-case">“I finally stopped guessing what to do at home.”</p>
        <p className="text-muted mt-6 text-sm">Adaeze · Fat loss · Lagos</p>
        <dl className="border-line mt-12 grid grid-cols-3 gap-4 border-t pt-8">
          <Stat k="Athletes" v="12k+" />
          <Stat k="Workouts" v="180k+" />
          <Stat k="Rating" v="4.9" />
        </dl>
      </section>

      <section className="relative min-h-[70svh]">
        <img src="/media/legs.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 py-16">
          <h2 className="display poster max-w-3xl">
            Your next
            <br />
            version
            <br />
            starts here.
          </h2>
          <div className="mt-8 flex flex-wrap gap-8 text-sm">
            <Stat k="Block" v="30 days" light />
            <Stat k="Sessions" v="12" light />
            <Stat k="Cadence" v="3–5 / week" light />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div>
          <p className="kicker">Membership</p>
          <h2 className="display section-title mt-3">Train free. Open the rest when you want it.</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
          <article className="border-line border p-6">
            <h3 className="display text-4xl">Free</h3>
            <p className="display mt-4 text-6xl">$0</p>
            <ul className="text-muted mt-6 space-y-2 text-sm">
              {FREE_FEATURES.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="bg-fg text-bg p-6 md:p-8">
            <h3 className="display text-5xl">Trex Pro</h3>
            <p className="mt-4">
              <span className="display text-7xl">${PRO_PRICE}</span>
              <span className="text-sm opacity-70"> / month</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {PRO_FEATURES.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/pricing" className="bg-accent text-accent-fg mt-8 inline-flex min-h-12 items-center px-5 text-sm font-medium">
              See Pro
            </Link>
          </article>
        </div>
      </section>

      <footer className="border-line border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="display text-5xl">Trex</p>
          <div className="text-muted flex flex-wrap gap-5 text-sm">
            <Link to="/workouts">Workouts</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </footer>
    </Shell>
  );
}

function findProgram(programs: Program[], slug: string) {
  return programs.find((program) => program.slug === slug || program.id === slug);
}

function Chip({ label }: { label: string }) {
  return <span className="float-card px-3 py-2 text-xs tracking-[0.16em] uppercase">{label}</span>;
}

function Stat({ k, v, light = false }: { k: string; v: string; light?: boolean }) {
  return (
    <div>
      <dd className="display text-4xl md:text-5xl">{v}</dd>
      <dt className={`mt-2 text-xs tracking-[0.16em] uppercase ${light ? "text-fg/70" : "text-faint"}`}>{k}</dt>
    </div>
  );
}
