import { Link, useLocation } from "@tanstack/react-router";
import { MessageSquare, Image as ImageIcon, Video, AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "text" | "image" | "video" | "audio";

const TABS: {
  id: TabId;
  label: string;
  to: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}[] = [
  { id: "text", label: "Текст", to: "/text", Icon: MessageSquare },
  { id: "image", label: "Изображения", to: "/design", Icon: ImageIcon },
  { id: "video", label: "Видео", to: "/video", Icon: Video },
  { id: "audio", label: "Аудио", to: "/audio", Icon: AudioLines },
];

const PATH_TO_ID: Record<string, TabId> = {
  "/text": "text",
  "/design": "image",
  "/video": "video",
  "/audio": "audio",
};

interface WorkspaceTabsProps {
  /**
   * "attached" сохраняется ради совместимости — больше не влияет на стили,
   * так как табы теперь рендерятся как внутренний бар единой карточки
   * (см. WorkspaceCard). Шов между табами и полем больше не возможен.
   */
  variant?: "attached" | "standalone";
}

export function WorkspaceTabs({ variant = "standalone" }: WorkspaceTabsProps) {
  const { pathname } = useLocation();
  const activeId = PATH_TO_ID[pathname];

  return (
    <div
      className={cn(
        "w-full flex items-center gap-1 px-2 sm:px-3 pt-2 overflow-x-auto no-scrollbar",
        variant === "attached"
          ? "border-b border-[hsl(var(--border))]"
          : "",
      )}
    >
      {TABS.map((t) => {
        const isActive = t.id === activeId;
        const { Icon } = t;
        return (
          <Link
            key={t.id}
            to={t.to}
            className={cn(
              "shrink-0 inline-flex items-center gap-2 px-3 sm:px-4 h-9 text-[13px] sm:text-sm font-medium rounded-t-[10px] transition-colors duration-200 relative",
              isActive
                ? "text-[hsl(var(--primary))] bg-[hsl(var(--secondary))]"
                : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--secondary))]/50",
            )}
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{t.label}</span>
            {isActive && (
              <span
                aria-hidden
                className="absolute left-2 right-2 -bottom-px h-[2px] rounded-full bg-[hsl(var(--primary))]"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
