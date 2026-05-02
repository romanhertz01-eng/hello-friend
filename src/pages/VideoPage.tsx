import { useState, useEffect } from "react";
import { Zap, X, Sparkles, Square, Clock, Monitor, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { SegmentedToolbar, SegmentedItem, AttachmentButton, Placeholder } from "@/components/ui/era";

import { PromptSuggestions } from "@/components/workspace/PromptSuggestions";
import { ModelCarousel } from "@/components/workspace/ModelCarousel";
import { ScenariosCarousel } from "@/components/workspace/ScenariosCarousel";
import { ModelsGrid3x3 } from "@/components/workspace/ModelsGrid3x3";

import { TwoPanelModelSelector } from "@/components/workspace/TwoPanelModelSelector";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import {
  videoProviders,
  videoCarouselCards,
  videoGridCards,
  videoPromptSuggestions,
} from "@/data/videoModels";

/* ─── Aspect ratio icon ─── */
function AspectIcon({ ratio, active }: { ratio: string; active: boolean }) {
  const color = active ? "hsl(var(--primary))" : "#666";
  const sizes: Record<string, [number, number]> = {
    "16:9": [22, 14], "9:16": [14, 22], "1:1": [18, 18], "4:3": [20, 16],
    "3:4": [16, 20], "3:2": [20, 14], "2:3": [14, 20], "21:9": [24, 10],
  };
  const [w, h] = sizes[ratio] || [18, 18];
  return (
    <svg width={24} height={24} viewBox="0 0 24 24">
      <rect x={(24 - w) / 2} y={(24 - h) / 2} width={w} height={h} rx={2} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

/* ─── More popup for video ─── */
function VideoMorePopup({
  open, onClose,
  aspectRatio, onAspectSelect, aspectRatios,
  duration, onDurationChange, durationOptions,
  resolution, onResolutionChange, resolutionOptions,
  quality, onQualityChange, qualityOptions,
}: {
  open: boolean; onClose: () => void;
  aspectRatio: string; onAspectSelect: (r: string) => void; aspectRatios: string[];
  duration: string; onDurationChange: (d: string) => void; durationOptions: string[];
  resolution: string; onResolutionChange: (r: string) => void; resolutionOptions: string[];
  quality?: string; onQualityChange?: (q: string) => void; qualityOptions?: string[];
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] rounded-2xl p-5 space-y-5"
        style={{ background: "var(--bg-popup)", border: "1px solid var(--border-primary)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Параметры</span>
          <button onClick={onClose} style={{ color: "var(--text-tertiary)" }} className="hover:opacity-80"><X size={16} /></button>
        </div>

        {/* Aspect ratio */}
        <div className="space-y-2">
          <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>Соотношение сторон</span>
          <div className="grid grid-cols-5 gap-1.5">
            {aspectRatios.map((r) => (
              <button
                key={r}
                onClick={() => onAspectSelect(r)}
                className={cn(
                  "w-[52px] h-[52px] rounded-lg border flex flex-col items-center justify-center gap-1 text-[11px] transition-colors",
                  aspectRatio === r
                    ? "border-[hsl(var(--primary))] bg-[rgba(232, 84, 32,0.1)] text-[hsl(var(--primary))]"
                    : ""
                )}
                style={aspectRatio !== r ? { borderColor: "var(--border-primary)", color: "var(--text-tertiary)" } : undefined}
              >
                <AspectIcon ratio={r} active={aspectRatio === r} />
                <span>{r}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>Длительность</span>
          <div className="flex gap-1.5 flex-wrap">
            {durationOptions.map((d) => (
              <button
                key={d}
                onClick={() => onDurationChange(d)}
                className={cn(
                  "px-3 h-[36px] rounded-lg border text-sm font-medium transition-colors",
                  duration === d ? "text-white border-transparent" : ""
                )}
                style={duration === d ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : { borderColor: "var(--border-primary)", color: "var(--text-tertiary)" }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div className="space-y-2">
          <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>Разрешение</span>
          <div className="flex gap-1.5">
            {resolutionOptions.map((r) => (
              <button
                key={r}
                onClick={() => onResolutionChange(r)}
                className={cn(
                  "px-4 h-[36px] rounded-lg border text-sm font-medium transition-colors",
                  resolution === r ? "text-white border-transparent" : ""
                )}
                style={resolution === r ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : { borderColor: "var(--border-primary)", color: "var(--text-tertiary)" }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Quality */}
        {qualityOptions && onQualityChange && quality && (
          <div className="space-y-2">
            <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>Качество</span>
            <div className="flex gap-1.5">
              {qualityOptions.map((q) => (
                <button
                  key={q}
                  onClick={() => onQualityChange(q)}
                  className={cn(
                    "px-4 h-[36px] rounded-lg border text-sm font-medium transition-colors",
                    quality === q ? "text-white border-transparent" : ""
                  )}
                  style={quality === q ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : { borderColor: "var(--border-primary)", color: "var(--text-tertiary)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const VideoPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("kling");
  const [selectedSubModelId, setSelectedSubModelId] = useState("kling-3.0");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5s");
  const [resolution, setResolution] = useState("720p");
  const [quality, setQuality] = useState("Стандарт");
  const [selectedFunc, setSelectedFunc] = useState("Текст в видео");
  const [funcOpen, setFuncOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const provider = videoProviders.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const credits = subModel?.credits ?? 0;

  useEffect(() => { document.title = "ERA2 — Генерация видео"; }, []);

  const handleModelSelect = (providerId: string, subModelId: string) => {
    setSelectedProviderId(providerId);
    setSelectedSubModelId(subModelId);
    const p = videoProviders.find((pr) => pr.id === providerId);
    if (p) {
      setAspectRatio(p.aspectRatios[0] || "16:9");
      setDuration(p.durationOptions[0] || "5s");
      setResolution(p.resolutionOptions[0] || "720p");
      if (p.qualityOptions) setQuality(p.qualityOptions[0]);
      if (p.functions) setSelectedFunc(p.functions[0]);
    }
  };

  const selectorProviders = videoProviders.map((p) => ({
    id: p.id, name: p.name, icon: p.icon, badge: p.badge,
    subModels: p.subModels.map((s) => ({
      id: s.id, name: s.name, credits: s.credits, isNew: s.isNew, isDefault: s.isDefault, badge: s.badge, desc: s.desc, time: s.time,
    })),
  }));

  const carouselModels = videoCarouselCards.map((c) => ({
    name: c.title, desc: c.desc, gradient: c.gradient, badge: c.badge,
  }));

  const videoScenarios = [
    { name: "Рекламный ролик", gradient: "linear-gradient(135deg, #1a0533, #2d1250)" },
    { name: "Музыкальный клип", gradient: "linear-gradient(135deg, #0d1b2a, #1b2838)" },
    { name: "Анимация персонажа", gradient: "linear-gradient(135deg, #1a0a2e, #2a1a3e)" },
    { name: "Кинематографичная сцена", gradient: "linear-gradient(135deg, #0a1628, #162040)" },
    { name: "Короткий клип для Reels", gradient: "linear-gradient(135deg, #1a1030, #2a1840)" },
    { name: "Видеопоздравление", gradient: "linear-gradient(135deg, #0d2018, #1a3028)" },
    { name: "Продуктовое видео", gradient: "linear-gradient(135deg, #1a1520, #2a2030)" },
  ];

  const videoGridModels = [
    { name: "Kling 3.0", desc: "Топовое видео от Kling AI", icon: "🎬", iconColor: "#f97316", isNew: true, credits: 75 },
    { name: "Seedance 2.0", desc: "Плавные многокадровые видео", icon: "📊", iconColor: "#22c55e", isNew: true, badges: ["60% OFF"], credits: 48 },
    { name: "Veo 3", desc: "Топовая модель Google", icon: "🌊", iconColor: "#3b82f6", isNew: true, credits: 120 },
    { name: "Sora 2", desc: "Флагман видеогенерации OpenAI", icon: "⬛", iconColor: "#1f2937", credits: 480 },
    { name: "Wan AI", desc: "Точное управление видео", icon: "🌊", iconColor: "hsl(var(--primary))", isNew: true, credits: 30 },
    { name: "Hailuo AI", desc: "Новый игрок на рынке", icon: "🎬", iconColor: "#eab308", isNew: true, credits: 40 },
    { name: "Vidu AI", desc: "Кинотеатральное качество", icon: "🎬", iconColor: "hsl(var(--primary))", isNew: true, credits: 50 },
    { name: "Sora 2 Pro", desc: "Максимальное качество", icon: "⬛", iconColor: "#1f2937", credits: 1440 },
    { name: "Kling 2.5 Turbo", desc: "Быстрая генерация видео", icon: "🎬", iconColor: "#f97316", credits: 30 },
  ];

  const handleCarouselSelect = (name: string) => {
    const card = videoCarouselCards.find((c) => c.title === name);
    if (card) handleModelSelect(card.providerId, card.subModelId);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-4 space-y-4 w-full">
        <div>
        <WorkspaceTabs variant="attached" />
        <div className="rounded-[22px] rounded-tl-none border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 w-full transition-all duration-200 has-[textarea:focus]:border-[hsl(var(--primary))] has-[textarea:focus]:shadow-[0_0_0_3px_rgba(232,84,32,0.12),0_1px_4px_rgba(0,0,0,0.2)]">
          <div className="flex items-start gap-3 mb-3">
            <AttachmentButton current={0} max={5} />
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Введите свою идею для генерации"
              rows={4}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] resize-none min-h-[120px] py-3 px-1 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] placeholder:opacity-60"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <TwoPanelModelSelector
              providers={selectorProviders}
              selectedProviderId={selectedProviderId}
              selectedSubModelId={selectedSubModelId}
              onSelect={handleModelSelect}
            />

            <SegmentedToolbar>
              <SegmentedItem icon={<Square />} label={<span className="font-mono tabular-nums">{aspectRatio}</span>} onClick={() => setMoreOpen(true)} />
              <SegmentedItem icon={<Clock />} label={<span className="font-mono tabular-nums">{duration}</span>} onClick={() => setMoreOpen(true)} />
              <SegmentedItem icon={<Monitor />} label={<span className="font-mono tabular-nums">{resolution}</span>} onClick={() => setMoreOpen(true)} />
              <SegmentedItem icon={<MoreHorizontal />} label={null} onClick={() => setMoreOpen(true)} trailing={null} />
            </SegmentedToolbar>

            <button
              onClick={() => {}}
              disabled={!prompt.trim()}
              className="ml-auto inline-flex items-center gap-1.5 px-5 h-10 rounded-full gradient-accent text-white text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" /> Генерировать
              <span className="inline-flex items-center gap-1 ml-1 font-mono tabular-nums">
                <Zap className="w-3 h-3" /> {credits}
              </span>
            </button>
          </div>
        </div>
        </div>

        <PromptSuggestions suggestions={videoPromptSuggestions} onSelect={setPrompt} />
        <ModelCarousel models={carouselModels} onSelect={handleCarouselSelect} />
        <ScenariosCarousel title="Сценарии для видео" scenarios={videoScenarios} />
        <ModelsGrid3x3 models={videoGridModels} />
      </div>

      <VideoMorePopup
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        aspectRatio={aspectRatio}
        onAspectSelect={setAspectRatio}
        aspectRatios={provider?.aspectRatios || []}
        duration={duration}
        onDurationChange={setDuration}
        durationOptions={provider?.durationOptions || []}
        resolution={resolution}
        onResolutionChange={setResolution}
        resolutionOptions={provider?.resolutionOptions || []}
        quality={quality}
        onQualityChange={setQuality}
        qualityOptions={provider?.qualityOptions}
      />
    </div>
  );
};

export default VideoPage;
