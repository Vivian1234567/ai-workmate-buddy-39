import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Loader2, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Base Assistant — ServiceDesk AI" },
      {
        name: "description",
        content:
          "Ask troubleshooting questions and get a summary, step-by-step fix and common causes for common IT issues.",
      },
      { property: "og:title", content: "Knowledge Base Assistant — ServiceDesk AI" },
      {
        property: "og:description",
        content: "Fast, structured troubleshooting answers for helpdesk technicians.",
      },
    ],
  }),
  component: KnowledgePage,
});

const steps = [
  "Confirm the printer is powered on and connected to the same VLAN as the user's device.",
  "On the user's PC, open Settings > Bluetooth & devices > Printers & scanners and remove the offline printer.",
  "Restart the Print Spooler service (services.msc > Print Spooler > Restart).",
  "Re-add the printer by IP or from the print server (\\\\printsrv01).",
  "Send a test page and confirm the queue clears.",
];

const causes = [
  "Printer set to 'Use Printer Offline' after a failed job",
  "Stuck print spooler queue on the client",
  "IP address changed after a DHCP lease renewal",
  "Network drop or VLAN mismatch between user and printer",
];

function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answered, setAnswered] = useState(false);

  const search = () => {
    setLoading(true);
    setAnswered(false);
    setTimeout(() => {
      setLoading(false);
      setAnswered(true);
    }, 1500);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader
        title="AI Knowledge Base Assistant"
        description="Search internal troubleshooting knowledge for fast, structured fixes."
      />

      <Card className="rounded-xl shadow-sm">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) search();
            }}
            placeholder="Ask about troubleshooting... e.g., How to fix printer offline, Outlook not syncing, Blue screen error"
            className="h-11"
          />
          <Button onClick={search} disabled={loading || !query.trim()} className="h-11 shrink-0">
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 size-4" /> Search Knowledge Base
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {answered && (
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <BookOpen className="size-4 text-primary" />
            <CardTitle className="text-base">Suggested resolution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 text-sm">
            <p className="text-muted-foreground">
              A printer showing "offline" is usually a client-side status flag or a stalled spooler
              rather than a hardware fault. Confirm network reachability first, then reset the
              spooler and re-add the device from the print server.
            </p>

            <div>
              <h2 className="mb-2 font-semibold">Step-by-Step Fix</h2>
              <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                {steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Common Causes</h2>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                {causes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-muted-foreground">
              Verify steps for your specific environment. This is not a replacement for senior tech
              advice.
            </p>
            <AiDisclaimer />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
