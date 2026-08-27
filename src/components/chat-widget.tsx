import { useState } from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { aiReply, SUGGESTIONS, WELCOME, type ChatMsg } from "@/lib/chat-replies";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { role: "user", content: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: aiReply(value) }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[70vh] max-h-[560px] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:right-6">
          <div className="flex items-center justify-between gap-2 bg-sidebar px-4 py-3 text-sidebar-foreground">
            <span className="flex min-w-0 items-center gap-2">
              <Sparkles className="size-4 shrink-0 text-primary" />
              <span className="truncate text-sm font-semibold">ServiceDesk AI Assistant</span>
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="size-4" />
            </button>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-3 p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {typing && (
                <p className="text-xs text-muted-foreground">ServiceDesk AI is typing...</p>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
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
                placeholder="Type your request..."
                className="min-w-0"
              />
              <Button size="icon" onClick={() => send(input)} aria-label="Send message">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close ServiceDesk AI chat" : "Open ServiceDesk AI chat"}
        className="fixed bottom-6 right-4 z-50 size-14 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6"
      >
        {open ? <X className="size-5" /> : <MessageSquare className="size-5" />}
      </Button>
    </>
  );
}
