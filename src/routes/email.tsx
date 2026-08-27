import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Copy, Eraser, Mail, Pencil, Save, Sparkles, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — ServiceDesk AI" },
      {
        name: "description",
        content:
          "Draft ticket updates, password reset confirmations and escalation emails for IT support in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — ServiceDesk AI" },
      {
        property: "og:description",
        content: "Realistic IT support email drafts with tone control and editable output.",
      },
    ],
  }),
  component: EmailGenerator,
});

const EMAIL_TYPES = [
  "Ticket Update",
  "Password Reset Confirmation",
  "System Downtime Notice",
  "Escalation to L2",
  "Resolution Confirmation",
  "Follow-up Email",
];

const TONES = [
  "Professional & Friendly",
  "Formal (For Management)",
  "Technical (For IT Team)",
  "Empathetic (For Frustrated User)",
];

const greetings: Record<string, string> = {
  "Professional & Friendly": "Hi Sarah,",
  "Formal (For Management)": "Dear Ms. Peterson,",
  "Technical (For IT Team)": "Team,",
  "Empathetic (For Frustrated User)": "Hi Sarah,",
};

const openers: Record<string, string> = {
  "Professional & Friendly":
    "Thanks for your patience while we worked on your request.",
  "Formal (For Management)":
    "Please find below a status update regarding the incident logged with the IT Service Desk.",
  "Technical (For IT Team)":
    "Handover notes and current diagnostic state for this incident are below.",
  "Empathetic (For Frustrated User)":
    "I'm sorry for the disruption this has caused to your day — I completely understand how frustrating it is when email stops working.",
};

const bodies: Record<string, string[]> = {
  "Ticket Update": [
    "We have reproduced the issue on your device and identified the cause as a corrupted local mail profile.",
    "A fix is being applied now and no action is required from you at this stage.",
    "We will confirm as soon as testing is complete, expected within the next 2 hours.",
  ],
  "Password Reset Confirmation": [
    "Your account password has been reset and your account has been unlocked.",
    "Sign in with the temporary password sent to you separately via SMS.",
    "You will be prompted to create a new password — please use at least 12 characters.",
    "Re-authenticate Outlook, Teams and the VPN client once the new password is active.",
  ],
  "System Downtime Notice": [
    "Planned maintenance on the mail gateway will take place on Saturday from 22:00 to 01:00.",
    "Email delivery may be delayed during this window; no messages will be lost.",
    "Please save and close all Outlook sessions before 22:00.",
  ],
  "Escalation to L2": [
    "This incident has been escalated to our Level 2 support team for deeper investigation.",
    "Steps already completed: Outlook restarted in safe mode, OST cache cleared, mail profile recreated, licence verified in the M365 admin centre.",
    "L2 will review mailbox database health and Autodiscover records and update the ticket directly.",
  ],
  "Resolution Confirmation": [
    "The issue reported on your ticket has now been resolved and tested from our side.",
    "Please restart your laptop to make sure the updated profile loads correctly.",
    "Open Outlook and confirm that send and receive are both working normally.",
    "If everything looks good, no reply is needed and the ticket will close automatically in 24 hours.",
  ],
  "Follow-up Email": [
    "We are following up on the issue you reported earlier this week.",
    "Please confirm whether the problem has recurred since our last fix.",
    "If it is still occurring, reply with the exact error message and the time it happened.",
  ],
};

const CLOSING = "Kind regards,\nIT Support Desk | Ext 101 | support@company.co.za";

const DISCLAIMER_FOOTER =
  "\n\n---\nThis message was sent by the IT Service Desk. We will never ask you for your password. If you did not expect this email, please report it to security@company.co.za.";

function buildEmail(opts: {
  type: string;
  ticket: string;
  context: string;
  tone: string;
  footer: boolean;
}) {
  const ticket = opts.ticket.trim() || "INC123456";
  const steps = bodies[opts.type] ?? bodies["Ticket Update"]!;
  const context = opts.context.trim();

  return `Subject: ${opts.type} — Ticket ${ticket}

${greetings[opts.tone]}

${openers[opts.tone]}${context ? `\n\n${context}` : ""}

Here is where things stand on ticket ${ticket}:

${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

If anything is unclear or the issue returns, simply reply to this email and the ticket will reopen automatically.

${CLOSING}${opts.footer ? DISCLAIMER_FOOTER : ""}`;
}

function EmailGenerator() {
  const [type, setType] = useState(EMAIL_TYPES[0]!);
  const [ticket, setTicket] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState(TONES[0]!);
  const [footer, setFooter] = useState(true);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    setLoading(true);
    setEditing(false);
    setTimeout(() => {
      setOutput(buildEmail({ type, ticket, context, tone, footer }));
      setLoading(false);
    }, 1500);
  };

  const currentText = () => outputRef.current?.innerText ?? output;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <PageHeader
        title="Smart Email Generator"
        description="Draft accurate, ready-to-send support emails from a short brief."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Email details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EMAIL_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticket">Ticket Number</Label>
              <Input
                id="ticket"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                placeholder="e.g., INC123456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctx">What should the email say?</Label>
              <Textarea
                id="ctx"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., Tell user Sarah her ticket INC1234 for Outlook issue is resolved, ask to restart laptop"
                className="min-h-36 resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={footer}
                onCheckedChange={(v) => setFooter(v === true)}
                aria-label="Include IT support disclaimer footer"
              />
              Include IT support disclaimer footer
            </label>

            <Button onClick={generate} disabled={loading} className="w-full" size="lg">
              <Sparkles className="mr-1 size-4" />
              {loading ? "AI is drafting..." : "Generate Support Email"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Generated email</CardTitle>
              {output && (
                <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/15">
                  <BadgeCheck className="size-3.5" />
                  AI Confidence: High — Please verify ticket number
                </Badge>
              )}
            </div>
            {output && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(currentText());
                    toast.success("Copied to clipboard!");
                  }}
                >
                  <Copy className="mr-1 size-3.5" /> Copy
                </Button>
                <Button
                  variant={editing ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (editing) setOutput(currentText());
                    setEditing((e) => !e);
                    toast.info(editing ? "Edits saved" : "Editing enabled");
                  }}
                >
                  <Pencil className="mr-1 size-3.5" /> {editing ? "Done" : "Edit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setOutput("");
                    setEditing(false);
                  }}
                >
                  <Eraser className="mr-1 size-3.5" /> Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Saved to drafts")}
                >
                  <Save className="mr-1 size-3.5" /> Save to Drafts
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-4 animate-pulse rounded bg-muted"
                    style={{ width: `${90 - i * 12}%` }}
                  />
                ))}
                <p className="pt-2 text-sm text-muted-foreground">AI is drafting...</p>
              </div>
            )}

            {!loading && !output && (
              <EmptyState
                illustration="inbox"
                title="No email drafted yet"
                description="Fill in the ticket details on the left and generate a support email."
              />
            )}

            {!loading && output && (
              <div
                ref={outputRef}
                contentEditable={editing}
                suppressContentEditableWarning
                className={`min-h-80 whitespace-pre-wrap rounded-lg border p-4 text-sm leading-relaxed outline-none transition-colors ${
                  editing ? "border-primary bg-card ring-2 ring-primary/20" : "border-border bg-muted/40"
                }`}
              >
                {output}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Mail className="size-3.5 text-primary" /> Always confirm the recipient and ticket
        number before sending.
      </p>
    </div>
  );
}
