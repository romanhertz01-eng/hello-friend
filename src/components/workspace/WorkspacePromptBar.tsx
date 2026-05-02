import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Image as ImageIcon,
  Video,
  AudioLines,
  Sparkles,
  ChevronDown,
  Square,
  Clock,
  RectangleHorizontal,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModelPickerPill, type PickerProvider } from "@/components/workspace/ModelPickerPill";
import { imageProviders } from "@/data/imageModels";
import { videoProviders } from "@/data/videoModels";
import { getModelsByCategory } from "@/data/models";

export type GenType = "text" | "image" | "video" | "audio";

interface Props {
  type: GenType;
  onTypeChange: (t: GenType) => void;
  prompt: string;
  onPromptChange: (v: string) => void;
  onSubmit: () => void;
}

const TABS: { id: GenType; label: string; Icon: typeof MessageSquare }[] = [
  { id: "text", label: "Текст", Icon: MessageSquare },
  { id: "image", label: "Изображения", Icon: ImageIcon },
  { id: "video", label: "Видео", Icon: Video },
  { id: "audio", label: "Аудио", Icon: AudioLines },
];

const PLACEHOLDERS: Record<GenType, string> = {
  text: "Спроси что угодно...",
  image: "Опиши изображение, которое нужно создать...",
  video: "Опиши свою идею для генерации видео...",
  audio: "Опиши музыку, голос или звук...",
};

/* ── Compact param pill (local lightweight version) ── */
function ParamPill({
  Icon,
  value,
  options,
  onChange,
  mono,
}: {
  Icon: typeof Square;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  mono?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number; width: number }>({
    left: 0,
    top: 0,
    width: 160,
  });

  useEffect(() => {
    if (!open) return;

    const compute = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.max(160, rect.width);
      const itemH = 32;
      const height = options.length * itemH + 8;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const left = Math.min(
        Math.max(8, rect.left),
        window.innerWidth - width - 8,
      );
      if (spaceBelow < height + 8 && spaceAbove > spaceBelow) {
        setPos({ left, bottom: window.innerHeight - rect.top + 6, width });
      } else {
        setPos({ left, top: rect.bottom + 6, width });
      }
    };
    compute();

    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        triggerRef.current?.contains(t) ||
        popupRef.current?.contains(t)
      )
        return;
      setOpen(false);
    };
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, options.length]);

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap"
        style={{
          background: "var(--c-bg-2)",
          border: "1px solid var(--c-line)",
          color: "var(--c-fg-dim)",
        }}
      >
        <Icon size={12} strokeWidth={1.8} />
        <span className={mono ? "font-mono tabular-nums" : ""}>{value}</span>
        <ChevronDown size={11} strokeWidth={1.8} style={{ opacity: 0.6 }} />
      </button>
      {open && (
        <div
          ref={popupRef}
          className="fixed rounded-[12px] shadow-xl z-[100] p-1"
          style={{
            left: pos.left,
            top: pos.top,
            bottom: pos.bottom,
            width: pos.width,
            background: "var(--c-bg-1)",
            border: "1px solid var(--c-line-2)",
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-1.5 rounded-[8px] text-[12px] transition-colors",
                mono && "font-mono tabular-nums",
              )}
              style={{
                color: o === value ? "var(--c-accent-2)" : "var(--c-fg-dim)",
                background: o === value ? "var(--c-accent-soft)" : "transparent",
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


function buildProviders(type: GenType): PickerProvider[] {
  if (type === "image") {
    return imageProviders.map((p) => ({
      id: p.id,
      name: p.name,
      icon: p.icon,
      badge: p.badge,
      badgeColor: p.badgeColor,
      subModels: p.subModels.map((s) => ({
        id: s.id,
        name: s.name,
        credits: s.credits,
        isNew: s.isNew,
        desc: s.desc,
        time: s.time,
        badge: s.badge,
      })),
    }));
  }
  if (type === "video") {
    return videoProviders.map((p) => ({
      id: p.id,
      name: p.name,
      icon: p.icon,
      badge: p.badge,
      badgeColor: "orange",
      subModels: p.subModels.map((s) => ({
        id: s.id,
        name: s.name,
        credits: s.credits,
        isNew: s.isNew,
        desc: s.desc,
        time: s.time,
        badge: s.badge,
      })),
    }));
  }
  return getModelsByCategory(type).map((m) => ({
    id: m.id,
    name: m.name,
    icon: m.icon,
    badge: m.provider,
    badgeColor: type === "audio" ? "pink" : "purple",
    subModels: (m.subModels || [{ id: m.id, name: m.name, credits: m.credits }]).map((s) => ({
      id: s.id,
      name: s.name,
      credits: s.credits,
      isNew: s.isNew,
      desc: m.provider,
    })),
  }));
}

function TypeParams({ type }: { type: GenType }) {
  const [imgSize, setImgSize] = useState("1024×1024");
  const [vidAspect, setVidAspect] = useState("16:9");
  const [vidDur, setVidDur] = useState("5s");
  const [audDur, setAudDur] = useState("3 мин");
  const [textPreset, setTextPreset] = useState("Без пресета");

  if (type === "image") {
    return (
      <ParamPill
        Icon={Square}
        value={imgSize}
        onChange={setImgSize}
        options={["512×512", "1024×1024", "1536×1024", "1024×1536"]}
        mono
      />
    );
  }
  if (type === "video") {
    return (
      <>
        <ParamPill
          Icon={RectangleHorizontal}
          value={vidAspect}
          onChange={setVidAspect}
          options={["16:9", "9:16", "1:1", "4:3"]}
          mono
        />
        <ParamPill
          Icon={Clock}
          value={vidDur}
          onChange={setVidDur}
          options={["3s", "5s", "8s", "10s"]}
          mono
        />
      </>
    );
  }
  if (type === "audio") {
    return (
      <ParamPill
        Icon={Clock}
        value={audDur}
        onChange={setAudDur}
        options={["1 мин", "2 мин", "3 мин", "4 мин"]}
      />
    );
  }
  return (
    <ParamPill
      Icon={FileText}
      value={textPreset}
      onChange={setTextPreset}
      options={["Без пресета", "Копирайтер", "Программист", "Учитель", "Переводчик"]}
    />
  );
}

export function WorkspacePromptBar({ type, onTypeChange, prompt, onPromptChange, onSubmit }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const providers = buildProviders(type);
  const [sel, setSel] = useState(() => ({
    pid: providers[0]?.id ?? "",
    sid: providers[0]?.subModels[0]?.id ?? "",
  }));

  // Reset selection when type changes
  useEffect(() => {
    const p = buildProviders(type);
    setSel({ pid: p[0]?.id ?? "", sid: p[0]?.subModels[0]?.id ?? "" });
  }, [type]);

  // Auto-grow textarea
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const max = 4 * 24; // ~4 rows at 24px line height
    ta.style.height = `${Math.min(ta.scrollHeight, max)}px`;
  }, [prompt]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim()) onSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 z-30 w-full pointer-events-none">
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 30%, color-mix(in oklab, hsl(var(--background)) 60%, transparent) 70%, transparent 100%)",
        }}
      />
      <div className="relative max-w-[920px] mx-auto px-4 pb-4 pt-3 pointer-events-auto">
        <div
          className="rounded-2xl shadow-lg overflow-hidden"
          style={{
            background: "var(--c-bg-2)",
            border: "1px solid var(--c-line)",
          }}
        >
          {/* Tabs row */}
          <div className="flex items-center gap-1.5 px-3 pt-2.5">
            {TABS.map((t) => {
              const active = type === t.id;
              const { Icon } = t;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onTypeChange(t.id)}
                  className={cn(
                    "h-8 px-3 rounded-full inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-all",
                    active ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                  style={
                    active
                      ? {
                          background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                          boxShadow: "0 4px 14px -4px rgba(232,84,32,0.5)",
                        }
                      : undefined
                  }
                >
                  <Icon size={13} strokeWidth={1.8} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Textarea */}
          <div className="px-4 pt-2">
            <textarea
              ref={taRef}
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder={PLACEHOLDERS[type]}
              className="w-full bg-transparent border-none outline-none resize-none text-[15px] leading-6 text-foreground placeholder:text-muted-foreground"
              style={{ minHeight: 24, maxHeight: 96 }}
            />
          </div>

          {/* Bottom row: pills + submit */}
          <div className="flex items-center gap-2 px-3 pb-3 pt-1 flex-wrap">
            <ModelPickerPill
              providers={providers}
              selectedProviderId={sel.pid}
              selectedSubModelId={sel.sid}
              onSelect={(pid, sid) => setSel({ pid, sid })}
            />
            <TypeParams type={type} />

            <button
              type="button"
              onClick={onSubmit}
              disabled={!prompt.trim()}
              className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                boxShadow: "0 8px 22px -8px rgba(232,84,32,0.55)",
              }}
            >
              <Sparkles size={13} strokeWidth={1.8} />
              <span>Генерировать</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
