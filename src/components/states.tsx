import { Button } from "@/components/ui";

export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-4 px-5 py-8 motion-reduce:animate-none">
      <div className="bg-subtle h-8 w-40" />
      <div className="bg-subtle h-72 w-full" />
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-subtle h-16" />
        <div className="bg-subtle h-16" />
        <div className="bg-subtle h-16" />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="border-line border px-6 py-12">
      <h2 className="display text-3xl">{title}</h2>
      <p className="text-muted mt-3 max-w-md text-sm">{body}</p>
      {action ? (
        <a href={action.href} className="mt-6 inline-flex">
          <Button>{action.label}</Button>
        </a>
      ) : null}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="border-line border px-6 py-10" role="alert">
      <h2 className="display text-3xl">Could not load</h2>
      <p className="text-muted mt-3 max-w-md text-sm">{message}</p>
      {onRetry ? (
        <Button className="mt-6" onClick={onRetry} variant="ghost">
          Try again
        </Button>
      ) : null}
    </div>
  );
}
