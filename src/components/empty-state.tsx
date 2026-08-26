import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Illustration = "document" | "search" | "tasks" | "chat" | "inbox";

function Art({ variant }: { variant: Illustration }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className="h-32 w-auto"
      role="img"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={`es-grad-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <ellipse
        cx="100"
        cy="122"
        rx="62"
        ry="8"
        className="fill-primary/10"
      />

      {variant === "document" && (
        <>
          <rect x="58" y="22" width="84" height="92" rx="10" className="fill-primary/10" />
          <rect x="70" y="34" width="60" height="8" rx="4" fill={`url(#es-grad-${variant})`} className="text-primary" />
          <rect x="70" y="52" width="44" height="6" rx="3" className="fill-primary/30" />
          <rect x="70" y="66" width="52" height="6" rx="3" className="fill-primary/25" />
          <rect x="70" y="80" width="34" height="6" rx="3" className="fill-primary/20" />
        </>
      )}

      {variant === "inbox" && (
        <>
          <rect x="46" y="40" width="108" height="66" rx="12" className="fill-primary/10" />
          <path d="M46 52 100 88 154 52" stroke="currentColor" strokeWidth="4" className="text-primary/60" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="150" cy="40" r="12" fill={`url(#es-grad-${variant})`} className="text-primary" />
        </>
      )}

      {variant === "search" && (
        <>
          <circle cx="92" cy="62" r="34" className="fill-primary/10" />
          <circle cx="92" cy="62" r="34" stroke="currentColor" strokeWidth="4" className="text-primary/50" />
          <path d="M118 88 142 112" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary" />
        </>
      )}

      {variant === "tasks" && (
        <>
          <rect x="52" y="26" width="96" height="88" rx="12" className="fill-primary/10" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="66" y={44 + i * 22} width="14" height="14" rx="4" fill={`url(#es-grad-${variant})`} className="text-primary" />
              <rect x="88" y={48 + i * 22} width="46" height="6" rx="3" className="fill-primary/25" />
            </g>
          ))}
        </>
      )}

      {variant === "chat" && (
        <>
          <rect x="40" y="34" width="86" height="52" rx="14" fill={`url(#es-grad-${variant})`} className="text-primary" />
          <rect x="82" y="66" width="78" height="46" rx="14" className="fill-primary/15" />
        </>
      )}
    </svg>
  );
}

export function EmptyState({
  illustration = "document",
  title,
  description,
  action,
  className,
}: {
  illustration?: Illustration;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center",
        className,
      )}
    >
      <Art variant={illustration} />
      <h3 className="mt-4 text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
