import { Bell, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-border bg-background/80 px-3 py-2.5 backdrop-blur sm:gap-4 sm:px-5">
      <SidebarTrigger className="shrink-0" />

      <div className="relative min-w-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools, tasks, notes..."
          className="h-9 w-full max-w-md pl-9 transition-shadow focus-visible:shadow-sm"
        />
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
        </Button>
        <Avatar className="size-8 ring-1 ring-border">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            AM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
