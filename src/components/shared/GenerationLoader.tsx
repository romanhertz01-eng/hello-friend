import { Loader2 } from "lucide-react";

interface GenerationLoaderProps {
  type: "text" | "image" | "video" | "audio";
  model?: string;
}

export function GenerationLoader({ type, model }: GenerationLoaderProps) {
  const messages: Record<GenerationLoaderProps["type"], string> = {
    text: "Генерирую ответ...",
    image: "Создаю изображение...",
    video: "Генерирую видео...",
    audio: "Обрабатываю аудио...",
  };

  return (
    <div className="max-w-[780px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 p-4 rounded-[14px] border border-border bg-card">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(232,84,32,0.12)" }}>
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: "hsl(var(--primary))" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">{messages[type]}</span>
            {model && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full text-muted-foreground" style={{ background: "var(--bg-pill)", border: "1px solid var(--border-primary)" }}>
                {model}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
