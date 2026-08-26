import { ShieldAlert } from "lucide-react";

export function AiDisclaimer() {
  return (
    <p className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-primary" />
      <span>AI-generated content may be inaccurate. Please review before use.</span>
    </p>
  );
}
