import { createFileRoute, Link } from "@tanstack/react-router";
import { getHome } from "@/lib/catalog.functions";
import { labelLevel } from "@/lib/options";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/programs/")({
  loader: () => getHome(),
  component: ProgramsPage,
});

function ProgramsPage() {
  const { programs } = Route.useLoaderData();
  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="display section-title">Programs</h1>
        <p className="text-muted mt-3 max-w-xl text-sm">
          Each plan is a rotation of sessions. Free plans are open. Pro plans include a preview session.
        </p>
        <div className="mt-8">
          {programs.map((program) => (
            <Link
              key={program.id}
              to="/programs/$id"
              params={{ id: program.slug }}
              className="border-line grid border-b md:grid-cols-[280px_1fr]"
            >
              <img src={program.coverImage ?? "/media/engine.jpg"} alt="" className="aspect-[3/2] h-full w-full object-cover" />
              <div className="flex flex-col justify-center px-0 py-5 md:px-8">
                <p className="text-faint text-xs tracking-[0.16em] uppercase">
                  {labelLevel(program.difficulty)} · {program.durationDays} days · {program.workoutCount} sessions
                  {program.premium ? " · Pro" : ""}
                </p>
                <h2 className="display mt-2 text-4xl">{program.title}</h2>
                <p className="text-muted mt-3 max-w-xl text-sm">{program.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
