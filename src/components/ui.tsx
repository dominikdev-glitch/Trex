import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "quiet" }) {
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:brightness-110"
      : variant === "ghost"
        ? "border border-line bg-transparent text-fg hover:bg-subtle"
        : "bg-transparent text-muted hover:text-fg";
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium transition-[transform,filter,background-color,color] duration-150 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
    />
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-faint">{hint}</span> : null}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border-line bg-subtle text-fg placeholder:text-faint h-12 w-full rounded-sm border px-3 text-base outline-none ${props.className ?? ""}`}
    />
  );
}

export function Choice({
  selected,
  label,
  detail,
  onClick,
}: {
  selected: boolean;
  label: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-sm border px-4 py-3 text-left transition-colors duration-150 ${
        selected ? "border-fg bg-subtle" : "border-line bg-transparent hover:bg-elevated"
      }`}
    >
      <span>
        <span className="block text-base font-medium">{label}</span>
        {detail ? <span className="text-muted mt-1 block text-sm">{detail}</span> : null}
      </span>
      <span className={`h-2.5 w-2.5 shrink-0 ${selected ? "bg-accent" : "border-line border"}`} aria-hidden />
    </button>
  );
}
