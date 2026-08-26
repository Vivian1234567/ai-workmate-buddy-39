import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Plus, Send, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace" },
      {
        name: "description",
        content: "Chat with your workplace AI assistant about emails, plans and research.",
      },
      { property: "og:title", content: "AI Chatbot — AI Workplace" },
      {
        property: "og:description",
        content: "A focused chat workspace for everyday professional tasks.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const HISTORY = [
  "Q3 launch checklist",
  "Rewrite client proposal intro",
  "Competitor pricing research",
  "Weekly standup agenda",
];

const SUGGESTIONS = [
  "Summarize my day into 3 priorities",
  "Draft a polite deadline extension email",
  "Turn these notes into action items",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi Amukelani — I'm your workplace assistant. Ask me to draft an email, plan your day, or summarize notes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(HISTORY[0]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", content: value }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Here's a starting point for "${value}":\n\n1. Clarify the outcome you want and who needs to act.\n2. Draft the shortest version that still carries the context.\n3. Add a clear deadline and a single next step.\n\nWant me to turn this into an email or a task list?`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <PageHeader title="AI Chatbot" description="Your always-on workplace assistant." />

      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Card className="hidden rounded-2xl p-3 shadow-sm lg:block">
          <Button variant="outline" className="mb-3 w-full justify-start">
            <Plus className="mr-1 size-4" /> New chat
          </Button>
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            History
          </p>
          <div className="space-y-1">
            {HISTORY.map((h) => (
              <button
                key={h}
                onClick={() => setActive(h)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent ${
                  active === h ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <MessageSquare className="size-3.5 shrink-0" />
                <span className="truncate">{h}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="flex h-[70vh] min-h-[520px] flex-col overflow-hidden rounded-2xl shadow-sm">
          <ScrollArea className="flex-1">
            <div className="space-y-4 p-4 sm:p-6">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="size-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-3 sm:p-4">
            <div className="mb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask anything about your work..."
                className="min-w-0"
              />
              <Button onClick={() => send(input)} aria-label="Send">
                <Send className="size-4" />
              </Button>
            </div>
            <AiDisclaimer />
          </div>
        </Card>
      </div>
    </div>
  );
}
