import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace" },
      {
        name: "description",
        content: "Ask a research question and get a structured answer with insights and sources.",
      },
      { property: "og:title", content: "AI Research Assistant — AI Workplace" },
      {
        property: "og:description",
        content: "Structured, sourced research summaries for busy professionals.",
      },
    ],
  }),
  component: ResearchAssistant,
});

const SOURCES = [
  { title: "State of SaaS Pricing 2026", site: "openview.dev", url: "#" },
  { title: "Usage-based billing adoption trends", site: "a16z.com", url: "#" },
  { title: "Benchmarking B2B conversion rates", site: "profitwell.com", url: "#" },
  { title: "Enterprise buyer survey, Q2 2026", site: "gartner.com", url: "#" },
];

function ResearchAssistant() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setSummary(
        `Research on "${query || "SaaS pricing models"}" suggests the market is shifting from pure seat-based pricing toward hybrid models that combine a platform fee with usage or outcome components. Buyers increasingly expect transparent tiers and self-serve entry points, while enterprise deals still rely on negotiated annual contracts.`,
      );
      setInsights(
        "• Hybrid pricing (platform fee + usage) is now used by roughly 45% of surveyed vendors\n• Self-serve tiers shorten sales cycles by an average of 21 days\n• Annual prepay discounts of 15-20% remain the most effective retention lever\n• Transparent public pricing correlates with higher inbound trial volume\n• AI features are most often bundled into higher tiers rather than sold as add-ons",
      );
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="AI Research Assistant"
        description="Ask a question and get a structured, sourced answer."
      />

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="grid gap-2 p-5 sm:grid-cols-[minmax(0,1fr)_auto]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="e.g. What pricing models are B2B SaaS companies adopting in 2026?"
            className="min-w-0"
          />
          <Button onClick={run} disabled={loading}>
            <Search className="mr-1 size-4" />
            {loading ? "Researching..." : "Research"}
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-40 resize-y text-sm"
                />
                <AiDisclaimer />
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Key insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={insights}
                  onChange={(e) => setInsights(e.target.value)}
                  className="min-h-48 resize-y text-sm"
                />
                <AiDisclaimer />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SOURCES.map((s, i) => (
                <a
                  key={s.title}
                  href={s.url}
                  className="flex items-start gap-3 rounded-xl border border-border p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <Badge variant="secondary" className="shrink-0">
                    {i + 1}
                  </Badge>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{s.title}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {s.site} <ExternalLink className="size-3" />
                    </span>
                  </span>
                </a>
              ))}
              <AiDisclaimer />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
