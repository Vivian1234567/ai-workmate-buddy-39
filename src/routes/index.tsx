import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Ticket,
  TicketCheck,
  Timer,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — ServiceDesk AI IT Support Co-Pilot" },
      {
        name: "description",
        content:
          "Track tickets resolved, open tickets, average response time and hours saved in the ServiceDesk AI helpdesk dashboard.",
      },
      { property: "og:title", content: "Dashboard — ServiceDesk AI" },
      {
        property: "og:description",
        content: "Your IT helpdesk overview: tickets, response times and weekly productivity.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tickets Resolved Today", value: "18", delta: "+4 vs. yesterday", icon: TicketCheck },
  { label: "Open Tickets", value: "12", delta: "3 breaching SLA soon", icon: Ticket },
  { label: "Avg Response Time", value: "15 min", delta: "-3 min this week", icon: Timer },
  { label: "Time Saved", value: "4.2 hrs", delta: "with AI drafting", icon: Clock },
];

const quickActions = [
  { title: "Generate Ticket Update Email", url: "/email", icon: Mail },
  { title: "Summarize Support Call", url: "/tickets", icon: FileText },
  { title: "Plan My Shift", url: "/tasks", icon: ListChecks },
] as const;

const activity = [
  { title: "Sent password reset email for ticket INC123456", tag: "Email", time: "9 min ago" },
  { title: "Summarized call — Outlook error 0x80040115", tag: "Summary", time: "42 min ago" },
  { title: "Escalated ticket INC123457 to L2", tag: "Escalation", time: "1 hr ago" },
  { title: "Closed ticket INC123455", tag: "Resolved", time: "2 hrs ago" },
];

const week = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 20 },
  { day: "Fri", value: 18 },
  { day: "Sat", value: 6 },
  { day: "Sun", value: 3 },
];

function Dashboard() {
  const max = Math.max(...week.map((w) => w.value));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <PageHeader
        title="Good morning, Support Agent — Ready to close tickets today?"
        description="Here's your helpdesk snapshot for this shift."
        action={
          <Button asChild className="shrink-0 transition-transform hover:-translate-y-0.5">
            <Link to="/tasks">
              Plan My Shift <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="rounded-xl bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{s.label}</p>
                <p className="text-gradient-blue mt-2 text-4xl font-bold tracking-tight">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.delta}</p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((a) => (
            <Button
              key={a.url}
              asChild
              className="h-auto justify-start whitespace-normal py-3 text-left transition-transform hover:-translate-y-0.5"
            >
              <Link to={a.url}>
                <a.icon className="mr-2 size-4 shrink-0" />
                {a.title}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="rounded-xl shadow-sm">
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

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Weekly productivity — tickets closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid h-56 grid-cols-7 items-end gap-2 sm:gap-3">
              {week.map((w) => (
                <div key={w.day} className="flex h-full flex-col items-center justify-end gap-2">
                  <span className="text-xs font-semibold text-primary">{w.value}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary/50 to-primary transition-all hover:opacity-80"
                    style={{ height: `${(w.value / max) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{w.day}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-primary" />
              83 tickets closed this week — 14% above your rolling average.
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 text-primary" />
        All AI output is drafted for a human technician to review before sending.
      </p>
    </div>
  );
}
