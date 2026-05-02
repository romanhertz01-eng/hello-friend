import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const sidebarPages = ["/text", "/design", "/video", "/audio", "/agents", "/toolkit", "/history", "/pricing", "/create"];
const workspacePages = ["/text", "/design", "/video", "/audio", "/create"];

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthed } = useAuth();
  const location = useLocation();

  // Auth page has no layout at all
  if (location.pathname === "/auth") {
    return <>{children}</>;
  }

  const showSidebar = isAuthed && sidebarPages.some((p) => location.pathname.startsWith(p));
  const isFullWidth = !showSidebar;
  const isWorkspace = workspacePages.includes(location.pathname);

  return (
    <CommandPaletteProvider>
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} showBurger={showSidebar} />

        {showSidebar && (
          <Sidebar
            open={sidebarOpen}
            collapsed={sidebarCollapsed}
            onClose={() => setSidebarOpen(false)}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        <main
          className={cn(
            "transition-all duration-200",
            !isFullWidth && (sidebarCollapsed ? "lg:pl-14" : "lg:pl-[200px]"),
          )}
        >
          {isFullWidth ? (
            children
          ) : isWorkspace ? (
            <div className="max-w-full">{children}</div>
          ) : (
            <div className="p-4 md:p-6 max-w-full">{children}</div>
          )}
        </main>

        <CommandPalette />
      </div>
    </CommandPaletteProvider>
  );
}
