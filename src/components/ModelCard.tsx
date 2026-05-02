import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/era";
import type { SearchableModel } from "@/config/searchableModels";
import { cn } from "@/lib/utils";

const brandColors: Record<string, string> = {
  chatgpt: "bg-emerald-600",
  claude: "bg-orange-500",
  gemini: "bg-blue-500",
  grok: "bg-zinc-800",
  deepseek: "bg-indigo-600",
  perplexity: "bg-teal-700",
  qwen: "bg-purple-700",
  "nano-banana-2": "bg-yellow-500",
  seedream: "bg-cyan-600",
  "flux-kontext": "bg-purple-600",
  midjourney: "bg-slate-700",
  "gpt-image": "bg-emerald-700",
  "kling-3": "bg-pink-600",
  "veo-3": "bg-blue-600",
  "sora-2": "bg-zinc-700",
  "seedance-2": "bg-teal-600",
  hailuo: "bg-fuchsia-700",
  vidu: "bg-amber-600",
  suno: "bg-violet-600",
  "eleven-labs": "bg-rose-600",
};

// rough seconds-to-render estimate per type (декоративно)
const approxSeconds: Record<SearchableModel["type"], number> = {
  text: 4,
  image: 12,
  video: 60,
  audio: 25,
};

export function ModelCard({ model }: { model: SearchableModel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      to: "/create",
      search: { type: model.type, model: model.id, prompt: "" } as never,
    });
  };

  const badgeVariant: "new" | "top" | "beta" | undefined = model.isNew ? "new" : undefined;
  const colorClass = brandColors[model.id] ?? "bg-secondary";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex-shrink-0 w-[280px] h-[320px] rounded-2xl border border-border",
        "bg-secondary hover:bg-card hover:border-primary/30 transition-all",
        "cursor-pointer p-5 flex flex-col justify-between group relative overflow-hidden",
        "snap-start text-left",
      )}
    >
      {/* top row: icon + badge */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center",
            "text-2xl text-white drop-shadow-sm shrink-0",
            colorClass,
          )}
        >
          {model.icon}
        </div>
        {badgeVariant && <StatusBadge variant={badgeVariant} />}
      </div>

      {/* center: name + provider */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-foreground">{model.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{model.provider}</p>
      </div>

      {/* bottom: metric line */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-mono tabular-nums text-primary">
          от {model.credits} cr
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span className="font-mono tabular-nums text-muted-foreground">
          ~{approxSeconds[model.type]} сек
        </span>
      </div>

      {/* hover arrow */}
      <ArrowUpRight
        size={16}
        className={cn(
          "absolute top-5 right-5 text-muted-foreground transition-all duration-200",
          "group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          badgeVariant && "opacity-0",
        )}
      />
    </button>
  );
}
