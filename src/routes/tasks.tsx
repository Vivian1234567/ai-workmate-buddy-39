import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Sparkles, Trash2 } from "lucide-react";

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
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Amukel AI Workspace" },
      {
        name: "description",
        content: "Turn goals into a structured daily task list with priorities and deadlines.",
      },
      { property: "og:title", content: "AI Task Planner — Amukel AI Workspace" },
      {
        property: "og:description",
        content: "Plan your day with AI-generated, editable tasks and priority tags.",
      },
    ],
  }),
  component: TaskPlanner,
});

type Priority = "High" | "Medium" | "Low";
type Task = { id: string; title: string; priority: Priority; deadline: string; done: boolean };

const MOCK_TASKS: Task[] = [
  { id: "1", title: "Draft the Q3 launch brief", priority: "High", deadline: "2026-08-27", done: false },
  { id: "2", title: "Review design handoff with Sarah", priority: "High", deadline: "2026-08-27", done: false },
  { id: "3", title: "Align QA schedule with engineering", priority: "Medium", deadline: "2026-08-28", done: false },
  { id: "4", title: "Update stakeholder status deck", priority: "Medium", deadline: "2026-08-29", done: false },
  { id: "5", title: "Archive completed sprint notes", priority: "Low", deadline: "2026-08-31", done: true },
];

const priorityClass: Record<Priority, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-foreground",
  Low: "bg-success/15 text-foreground",
};

function TaskPlanner() {
  const [goals, setGoals] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");
  const [newDeadline, setNewDeadline] = useState("");

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setTasks(MOCK_TASKS);
      setLoading(false);
    }, 700);
  };

  const update = (id: string, patch: Partial<Task>) =>
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, ...patch } : task)));

  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks((t) => [
      ...t,
      {
        id: crypto.randomUUID(),
        title: newTitle.trim(),
        priority: newPriority,
        deadline: newDeadline || "—",
        done: false,
      },
    ]);
    setNewTitle("");
    setNewDeadline("");
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="AI Task Planner"
        description="Describe your goals and get a prioritized, editable daily plan."
      />

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Goals & projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">What do you want to accomplish?</Label>
            <Textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Ship the Q3 launch, unblock design handoff, prepare the stakeholder update."
              className="min-h-32 resize-y"
            />
          </div>
          <Button onClick={generate} disabled={loading}>
            <Sparkles className="mr-1 size-4" />
            {loading ? "Planning..." : "Generate plan"}
          </Button>
        </CardContent>
      </Card>

      {tasks.length > 0 && (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Your daily plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent/40"
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={(v) => update(task.id, { done: Boolean(v) })}
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <Input
                    value={task.title}
                    onChange={(e) => update(task.id, { title: e.target.value })}
                    className={`h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 ${
                      task.done ? "text-muted-foreground line-through" : ""
                    }`}
                  />
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge className={`${priorityClass[task.priority]} border-0 text-[11px]`}>
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Due {task.deadline}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete task"
                  onClick={() => setTasks((t) => t.filter((x) => x.id !== task.id))}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            <div className="grid gap-2 rounded-xl border border-dashed border-border p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add a task..."
                className="min-w-0"
              />
              <Select value={newPriority} onValueChange={(v) => setNewPriority(v as Priority)}>
                <SelectTrigger className="sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="sm:w-40"
              />
              <Button onClick={addTask}>
                <Plus className="mr-1 size-4" /> Add
              </Button>
            </div>

            <AiDisclaimer />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
