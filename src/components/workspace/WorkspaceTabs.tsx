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
   * "attached" — таб «прирастает» к карточке снизу: общий фон, общая граница,
   * шов скрывается. Используется поверх PromptBlock/ImagePromptBlock.
   * "standalone" — обычные табы без сшивки.
   */
  variant?: "attached" | "standalone";
}

export function WorkspaceTabs({ variant = "standalone" }: WorkspaceTabsProps) {
  const { pathname } = useLocation();
  const activeId = PATH_TO_ID[pathname];

  return (
    <div className="w-full relative">
      <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const isActive = t.id === activeId;
          const { Icon } = t;
          return (
            <Link
              key={t.id}
              to={t.to}
              className={cn(
                "shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 h-10 text-sm font-medium transition-colors duration-200 rounded-t-[14px] rounded-b-none relative",
                isActive
                  ? "text-[hsl(var(--primary))] z-10"
                  : "text-muted-foreground hover:text-foreground",
              )}
              style={
                isActive
                  ? {
                      // Активный таб = «крышка» карточки.
                      // Сидит на её верхней границе и перекрывает её на 1px,
                      // чтобы шов между табом и PromptBlock исчез.
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderBottom: "1px solid hsl(var(--card))",
                      marginBottom: variant === "attached" ? -1 : 0,
                    }
                  : {
                      background: "transparent",
                      border: "1px solid transparent",
                    }
              }
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
