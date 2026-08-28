import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Search, Wrench, ListChecks, AlertTriangle, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Ticket Notes Summarizer — ServiceDesk AI" },
      {
        name: "description",
        content:
          "Paste support call or ticket notes and get an executive summary, root cause, solution steps and next actions.",
      },
      { property: "og:title", content: "Ticket Notes Summarizer — ServiceDesk AI" },
      {
        property: "og:description",
        content: "Turn messy helpdesk call notes into a clean, verifiable ticket summary.",
      },
    ],
  }),
  component: TicketsPage;
});

const solutionSteps = [
  "Recreate the Outlook mail profile in Control Panel > Mail",
  "Clear the local OST cache and let Outlook rebuild it",
  "Test send/receive and confirm folders sync",
];

const nextActions = [
  "Follow up with the user in 2 hours to confirm mail is syncing",
  "Close ticket if the issue is resolved, otherwise escalate to L2",
];

function TicketsPage() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const summarize = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  const toggle = (step: string) =>
    setChecked((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step],
    );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Ticket Notes Summarizer"
        description="Paste raw call notes and get a structured, reviewable ticket summary."
      />

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Support call / ticket notes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
            placeholder="Paste support call or ticket notes here... e.g., User called, Outlook not syncing, error 0x80040115, tried restarting, cleared cache, still not working. User needs email urgently..."
          />
          <div className="flex justify-center">
            <Button onClick={summarize} disabled={loading || !notes.trim()} className="min-w-56">
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> AI is summarizing...
                </>
              ) : (
                "Summarize Ticket"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {done && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <FileText className="size-4 text-primary" />
              <CardTitle className="text-base">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              User reported that Outlook stopped syncing with error 0x80040115. Basic restart and
              cache clearing were attempted without success. Mail access is business critical, so
              the ticket is treated as a P2 user issue with an urgent follow-up.
              <AiDisclaimer />
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <Search className="size-4 text-primary" />
              <CardTitle className="text-base">Root Cause</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Corrupted Outlook profile preventing the client from establishing a connection to the
              Exchange mailbox.
              <AiDisclaimer />
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <Wrench className="size-4 text-primary" />
              <CardTitle className="text-base">Solution Steps</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {solutionSteps.map((step) => (
                <label key={step} className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={checked.includes(step)}
                    onCheckedChange={() => toggle(step)}
                    className="mt-0.5"
                  />
                  <span className={checked.includes(step) ? "text-muted-foreground line-through" : ""}>
                    {step}
                  </span>
                </label>
              ))}
              <AiDisclaimer />
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <ListChecks className="size-4 text-primary" />
              <CardTitle className="text-base">Next Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {nextActions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <AiDisclaimer />
            </CardContent>
          </Card>

          <div className="md:col-span-2 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            Verify solution with senior technician if unsure.
          </div>
        </div>
      )}
    </div>
  );
}
