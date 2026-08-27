import { ShieldAlert } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card/60 px-4 py-6 sm:px-6">
      <p className="mx-auto flex max-w-4xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground">
        <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <span>
          <span className="font-semibold text-foreground">Responsible AI Disclaimer:</span>{" "}
          AI-generated responses may contain inaccurate information. Always verify ticket
          numbers, user names, and technical steps before sending. Do not share private
          passwords. Human verification required.
        </span>
      </p>
    </footer>
  );
}
