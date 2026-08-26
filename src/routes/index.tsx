import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Track emails generated, meetings summarized, tasks planned and hours saved in one AI productivity dashboard.",
      },
      { property: "og:title", content: "Dashboard — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Your AI workspace overview: emails, meetings, tasks and research.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Emails Generated", value: "248", delta: "+12% this week", icon: Mail },
  { label: "Meetings Summarized", value: "64", delta: "+8% this week", icon: FileText },
  { label: "Tasks Planned", value: "412", delta: "+23% this week", icon: ListChecks },
  { label: "Time Saved", value: "37h", delta: "+5h this week", icon: Clock },
];

const quickActions = [
  { title: "Smart Email Generator", url: "/email", icon: Mail, desc: "Draft a polished email in seconds" },
  { title: "Meeting Notes Summarizer", url: "/meetings", icon: FileText, desc: "Turn transcripts into action items" },
  { title: "AI Task Planner", url: "/tasks", icon: ListChecks, desc: "Break goals into a daily plan" },
  { title: "AI Research Assistant", url: "/research", icon: Search, desc: "Get sourced answers fast" },
  { title: "AI Chatbot", url: "/chat", icon: MessageSquare, desc: "Ask anything, anytime" },
] as const;

const activity = [
  { title: "Client follow-up email generated", tag: "Email", time: "12 min ago" },
  { title: "Q3 Planning sync summarized", tag: "Meeting", time: "1 hour ago" },
  { title: "8 tasks planned for tomorrow", tag: "Tasks", time: "3 hours ago" },
  { title: "Researched competitor pricing models", tag: "Research", time: "Yesterday" },
  { title: "Chat session: onboarding checklist", tag: "Chat", time: "Yesterday" },
];

function Dashboard() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <PageHeader
        title="Good afternoon, Amukelani"
        description="Here's how your AI workspace is performing this week."
        action={
          <Button asChild className="shrink-0 transition-transform hover:-translate-y-0.5">
            <Link to="/chat">
              Ask AI <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-primary" />
                  {s.delta}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <s.icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((a) => (
              <Link
                key={a.url}
                to={a.url}
                className="group flex items-start gap-3 rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/50 hover:shadow-sm"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{a.title}</span>
                  <span className="block text-xs text-muted-foreground">{a.desc}</span>
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-l border-border pl-5">
              {activity.map((item) => (
                <li key={item.title} className="relative">
                  <span className="absolute -left-[26px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <p className="text-sm font-medium leading-snug">{item.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[11px]">
                      {item.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
