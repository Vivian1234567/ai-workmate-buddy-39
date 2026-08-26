import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Amukel AI Workspace" },
      {
        name: "description",
        content: "Generate professional, friendly or formal emails from a short brief.",
      },
      { property: "og:title", content: "Smart Email Generator — Amukel AI Workspace" },
      {
        property: "og:description",
        content: "Draft polished workplace emails in seconds with editable AI output.",
      },
    ],
  }),
  component: EmailGenerator,
});

const openings: Record<string, string> = {
  Professional: "Hi Sarah,\n\nThank you for your time earlier this week.",
  Friendly: "Hey Sarah,\n\nHope your week is going well!",
  Formal: "Dear Ms. Peterson,\n\nI trust this message finds you well.",
};

function draft(context: string, tone: string) {
  return `${openings[tone]}

${context.trim() || "Following up on our recent conversation, I wanted to share a short update and confirm the next steps on our side."}

I've outlined the key points below:
• Current status and what has been completed
• Outstanding items and who owns them
• Proposed timeline for the next milestone

Please let me know if this aligns with your expectations, or if you'd prefer to walk through it on a quick call.

Best regards,
Amukelani Mashele`;
}

function EmailGenerator() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("Professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(draft(context, tone));
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Smart Email Generator"
        description="Describe the situation and let AI write the email for you."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="context">What is this email about?</Label>
              <Textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. Follow up with the client about the delayed design handoff and propose Friday for a review call."
                className="min-h-40 resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate} disabled={loading} className="w-full">
              <Sparkles className="mr-1 size-4" />
              {loading ? "Generating..." : "Generate"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <CardTitle className="truncate text-base">Generated email</CardTitle>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!output}
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="mr-1 size-3.5" /> Copy
              </Button>
              <Button variant="outline" size="sm" disabled={!output} onClick={generate}>
                <RefreshCw className="mr-1 size-3.5" /> Regenerate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Your generated email will appear here — fully editable."
              className="min-h-80 resize-y font-normal"
            />
            <AiDisclaimer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
