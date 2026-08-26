import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Amukel AI Workspace" },
      {
        name: "description",
        content: "Turn long meeting transcripts into summaries, key points and action items.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Amukel AI Workspace" },
      {
        property: "og:description",
        content: "Paste a transcript and get an editable summary with action items.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

const MOCK = {
  summary:
    "The team reviewed Q3 delivery progress. Design handoff slipped by three days due to late feedback, but engineering believes the launch date is still achievable if QA starts a week early. Marketing confirmed the campaign assets are ready pending final copy approval.",
  keyPoints:
    "• Design handoff delayed by 3 days; root cause was late stakeholder feedback\n• Engineering capacity is stable; no additional headcount required\n• QA to begin one week earlier to protect the launch date\n• Marketing assets complete, awaiting final copy sign-off\n• Budget remains within the approved Q3 envelope",
  actionItems:
    "1. Sarah — circulate revised design handoff schedule (due Thu)\n2. Daniel — confirm early QA window with the test team (due Wed)\n3. Amukelani — get final copy approval from Legal (due Fri)\n4. Priya — update the launch risk register (due Mon)",
};

function MeetingSummarizer() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<typeof MOCK | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(MOCK);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Meeting Notes Summarizer"
        description="Paste a transcript and get a clean summary, key points and action items."
      />

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Transcript</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transcript">Meeting transcript</Label>
            <Textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript or raw notes here..."
              className="min-h-48 resize-y"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast.info("File upload is coming soon.")}
            >
              <Upload className="mr-1 size-4" /> Upload file
            </Button>
            <Button onClick={generate} disabled={loading}>
              <Sparkles className="mr-1 size-4" />
              {loading ? "Summarizing..." : "Generate Summary"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 lg:grid-cols-3">
          <OutputCard
            title="Summary"
            value={result.summary}
            onChange={(v) => setResult({ ...result, summary: v })}
          />
          <OutputCard
            title="Key Points"
            value={result.keyPoints}
            onChange={(v) => setResult({ ...result, keyPoints: v })}
          />
          <OutputCard
            title="Action Items"
            value={result.actionItems}
            onChange={(v) => setResult({ ...result, actionItems: v })}
          />
        </div>
      )}
    </div>
  );
}

function OutputCard({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card className="rounded-2xl shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-56 resize-y text-sm"
        />
        <AiDisclaimer />
      </CardContent>
    </Card>
  );
}
