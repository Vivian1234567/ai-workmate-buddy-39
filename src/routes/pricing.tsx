import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Amukel AI Workspace" },
      {
        name: "description",
        content:
          "Simple, transparent pricing for Amukel AI Workspace. Start free, scale to Pro and Business plans for AI email, meetings, tasks and research.",
      },
      { property: "og:title", content: "Pricing — Amukel AI Workspace" },
      {
        property: "og:description",
        content: "Compare Starter, Pro and Business plans for Amukel AI Workspace.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Starter",
    monthly: 0,
    tagline: "For individuals testing AI workflows.",
    features: [
      "50 AI generations / month",
      "Smart Email Generator",
      "Meeting Notes Summarizer",
      "Community support",
    ],
  },
  {
    name: "Pro",
    monthly: 24,
    tagline: "For professionals automating daily work.",
    highlight: true,
    features: [
      "Unlimited AI generations",
      "All five AI workspace tools",
      "Editable outputs & version history",
      "Priority email support",
      "Export to PDF, Notion, Docs",
    ],
  },
  {
    name: "Business",
    monthly: 59,
    tagline: "For teams that run on shared context.",
    features: [
      "Everything in Pro",
      "Up to 20 team seats",
      "Shared workspace templates",
      "Admin controls & audit log",
      "Dedicated success manager",
    ],
  },
] as const;

const faqs = [
  {
    q: "Can I change plans later?",
    a: "Yes — upgrade or downgrade at any time. Changes are prorated to your billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Pro includes a 14-day free trial. No card required to start on Starter.",
  },
  {
    q: "How is usage counted?",
    a: "Each AI generation — email, summary, task plan or research answer — counts once.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Annual billing saves 20% across every paid plan.",
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(true);

  const price = (monthly: number) =>
    monthly === 0 ? "$0" : `$${annual ? Math.round(monthly * 0.8) : monthly}`;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <PageHeader
        title="Pricing"
        description="Simple plans that scale with how much work you automate."
      />

      <div className="flex items-center justify-center gap-3">
        <Label htmlFor="billing" className="text-sm text-muted-foreground">
          Monthly
        </Label>
        <Switch id="billing" checked={annual} onCheckedChange={setAnnual} />
        <Label htmlFor="billing" className="text-sm">
          Annual
        </Label>
        <Badge variant="secondary" className="text-[11px]">
          Save 20%
        </Badge>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.highlight
                ? "surface-premium relative rounded-2xl border-primary/40 shadow-lg ring-1 ring-primary/20 transition-all hover:-translate-y-1"
                : "rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            }
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground shadow-sm">
                Most popular
              </span>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                {plan.highlight && <Sparkles className="size-4 text-primary" />}
                {plan.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{plan.tagline}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-end gap-1">
                <span className="text-gradient-blue text-4xl font-semibold tracking-tight">
                  {price(plan.monthly)}
                </span>
                <span className="pb-1 text-sm text-muted-foreground">
                  {plan.monthly === 0 ? "forever" : "/ month"}
                </span>
              </div>

              <Button
                className="w-full"
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => toast.success(`${plan.name} plan selected`)}
              >
                {plan.monthly === 0 ? "Start free" : `Choose ${plan.name}`}
              </Button>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="min-w-0">
              <p className="text-sm font-medium">{f.q}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
