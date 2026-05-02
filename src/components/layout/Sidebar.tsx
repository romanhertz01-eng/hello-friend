import { Link, useLocation } from "@tanstack/react-router";
import {
  Home, Image, Video, MessageSquare, Mic, Bot, LayoutGrid,
  CreditCard, History, ChevronLeft, X, ArrowRight, Gem,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/era/StatusBadge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const genItems = [
  { icon: MessageSquare, label: "Текст", path: "/text" },
  { icon: Image, label: "Изображения", path: "/design" },
  { icon: Video, label: "Видео", path: "/video" },
  { icon: Mic, label: "Аудио", path: "/audio" },
];

const toolItems: Array<{ icon: React.ElementType; label: string; path: string; badge?: "new" }> = [
  { icon: Bot, label: "Агенты / Ассистенты", path: "/agents" },
  { icon: LayoutGrid, label: "Все нейросети", path: "/toolkit" },
  { icon: LayoutGrid, label: "Студии", path: "/studios", badge: "new" },
];

const bottomItems = [
  { icon: CreditCard, label: "Тарифы", path: "/pricing" },
  { icon: History, label: "История", path: "/history" },
];

export function Sidebar({ open, collapsed, onClose, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const renderItem = (item: { icon: React.ElementType; label: string; path: string; badge?: "new" }) => (
    <Link
      key={item.label}
      to={item.path}
      onClick={() => { if (window.innerWidth < 1024) onClose(); }}
      className={cn(
        "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
        collapsed && "justify-center px-2",
        isActive(item.path)
          ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-primary/40"
          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
      )}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate flex-1">{item.label}</span>}
      {!collapsed && item.badge === "new" && <StatusBadge variant="new" />}
    </Link>
  );

  const renderSection = (label: string, items: Array<{ icon: React.ElementType; label: string; path: string; badge?: "new" }>) => (
    <>
      {!collapsed && label && (
        <div className="px-4 pt-5 pb-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            {label}
          </span>
        </div>
      )}
      {collapsed && <div className="h-3" />}
      {items.map(renderItem)}
    </>
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 flex flex-col transition-all duration-200",
          "bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))]",
          collapsed ? "w-14" : "w-[200px]",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo / mobile close */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[hsl(var(--sidebar-border))]">
          <Link to="/" className="flex items-center gap-1">
            {!collapsed ? (
              <>
                <span className="text-[22px] font-bold tracking-tight text-foreground">ERA2</span>
                <span className="font-mono text-sm text-[#ff7a3d]">.ai</span>
              </>
            ) : (
              <span className="text-[22px] font-bold tracking-tight text-foreground">E</span>
            )}
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-[hsl(var(--secondary))]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top: Home */}
        <div className="px-0 pt-3 space-y-0.5">
          {renderItem({ icon: Home, label: "Главная", path: "/" })}
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto space-y-0.5">
          {renderSection("Генерация", genItems)}
          {renderSection("Инструменты", toolItems)}
          {renderSection("", bottomItems)}
        </div>

        {/* Bottom CTA — ghost link */}
        <div className="mt-auto border-t border-[hsl(var(--sidebar-border))] pt-3">
          <Link
            to="/pricing"
            className={cn(
              "flex items-center gap-2 px-3 h-9 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors mx-2 mb-3",
              collapsed && "justify-center px-2"
            )}
          >
            <Gem className="h-3.5 w-3.5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">Обновить план</span>
                <ArrowRight className="h-3 w-3 ml-auto" />
              </>
            )}
          </Link>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>
    </>
  );
}
