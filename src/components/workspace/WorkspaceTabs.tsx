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
  variant?: "attached" | "standalone";
}

export function WorkspaceTabs({ variant = "standalone" }: WorkspaceTabsProps) {
  const { pathname } = useLocation();
  const activeId = PATH_TO_ID[pathname];

  // Match PromptBlock surface and border exactly
  const cardBg = "hsl(var(--card))";
  const cardBorder = "hsl(var(--border))";

  return (
    <div className="w-full">
      <div className="flex items-end gap-1 overflow-x-auto scrollbar-hide flex-nowrap justify-start">
        {TABS.map((t) => {
          const isActive = t.id === activeId;
          const { Icon } = t;
          const activeBottomBorder =
            variant === "attached"
              ? `1px solid ${cardBg}`
              : `1px solid ${cardBorder}`;
          return (
            <Link
              key={t.id}
              to={t.to}
              className={cn(
                "shrink-0 inline-flex items-center gap-2 px-5 text-sm font-medium transition-colors duration-200",
                "rounded-t-xl rounded-b-none",
              )}
              style={
                isActive
                  ? {
                      height: 40,
                      marginBottom: variant === "attached" ? -2 : 0,
                      paddingBottom: variant === "attached" ? 2 : 0,
                      position: "relative",
                      zIndex: 2,
                      background: cardBg,
                      borderTop: `1px solid ${cardBorder}`,
                      borderLeft: `1px solid ${cardBorder}`,
                      borderRight: `1px solid ${cardBorder}`,
                      borderBottom: "none",
                      color: "var(--c-accent-2)",
                    }
                  : {
                      height: 40,
                      background: "color-mix(in oklab, var(--c-bg-1) 92%, #000)",
                      borderTop: `1px solid ${cardBorder}`,
                      borderLeft: `1px solid ${cardBorder}`,
                      borderRight: `1px solid ${cardBorder}`,
                      borderBottom: `1px solid ${cardBorder}`,
                      color: "color-mix(in oklab, var(--c-fg-dim) 70%, transparent)",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "var(--c-fg)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.color =
                    "color-mix(in oklab, var(--c-fg-dim) 70%, transparent)";
              }}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
