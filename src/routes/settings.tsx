import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Workplace" },
      {
        name: "description",
        content: "Manage your profile, workspace defaults and AI preferences.",
      },
      { property: "og:title", content: "Settings — AI Workplace" },
      {
        property: "og:description",
        content: "Profile, notifications and AI output preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader title="Settings" description="Manage your profile and AI preferences." />

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue="Amukelani Mashele" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" defaultValue="amukelani@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Product Manager" />
          </div>
          <div className="space-y-2">
            <Label>Default tone</Label>
            <Select defaultValue="Professional">
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
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications", desc: "Weekly digest of your AI activity", on: true },
            { label: "Autosave AI outputs", desc: "Keep a draft of every generated result", on: true },
            { label: "Show responsible AI reminders", desc: "Display review disclaimers on outputs", on: true },
          ].map((row, i, arr) => (
            <div key={row.label}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.desc}</p>
                </div>
                <Switch defaultChecked={row.on} />
              </div>
              {i < arr.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
      </div>
    </div>
  );
}
