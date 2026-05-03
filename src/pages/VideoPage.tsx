import { useState, useEffect, useRef } from "react";
import { Zap, Sparkles, Square, Clock, Monitor, Film, Music, User, Clapperboard, Smartphone, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModelGlyph } from "@/components/ui/era/ModelGlyph";
import { cn } from "@/lib/utils";
import { AttachmentButton } from "@/components/ui/era";
import { InlinePillDropdown } from "@/components/workspace/InlinePillDropdown";

import { PromptSuggestions } from "@/components/workspace/PromptSuggestions";
import { ModelCarousel } from "@/components/workspace/ModelCarousel";
import { ScenariosCarousel } from "@/components/workspace/ScenariosCarousel";
import { ModelsGrid3x3 } from "@/components/workspace/ModelsGrid3x3";

import { TwoPanelModelSelector } from "@/components/workspace/TwoPanelModelSelector";
import { WelcomeBlock, type WelcomeScenario } from "@/components/workspace/WelcomeBlock";
import { MediaChatFeed, type MediaGeneration } from "@/components/workspace/MediaChatFeed";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import { GenerationLoader } from "@/components/shared/GenerationLoader";
import {
  videoProviders,
  videoCarouselCards,
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

const welcomeScenarios: WelcomeScenario[] = [
  {
    Icon: Film,
    title: "Рекламный ролик",
    desc: "Видео для продвижения продукта",
    prompt: "Product showcase commercial, smooth camera movement, clean white studio, premium lighting, slow motion details",
    providerId: "kling",
    subModelId: "kling-3.0",
    aspect: "16:9",
    duration: "5s",
    resolution: "1080p",
  },
  {
    Icon: Music,
    title: "Музыкальный клип",
    desc: "Визуальный ряд к треку",
    prompt: "Music video scene, cinematic color grading, dynamic transitions, artistic visual effects, concert atmosphere",
    providerId: "kling",
    subModelId: "kling-3.0",
    aspect: "16:9",
    duration: "10s",
    resolution: "1080p",
  },
  {
    Icon: User,
    title: "Анимация персонажа",
    desc: "Оживить статичного героя",
    prompt: "Character animation, smooth movement, expressive gestures, 3D rendered style, professional quality",
    providerId: "kling",
    subModelId: "kling-3.0",
    aspect: "1:1",
    duration: "5s",
    resolution: "720p",
  },
  {
    Icon: Clapperboard,
    title: "Кинематографичная сцена",
    desc: "Кинокачество с ИИ",
    prompt: "Cinematic establishing shot, golden hour lighting, anamorphic lens flare, shallow depth of field, film grain",
    providerId: "veo",
    aspect: "21:9",
    duration: "5s",
    resolution: "1080p",
  },
  {
    Icon: Smartphone,
    title: "Короткий клип для Reels",
    desc: "9:16 вертикальное видео",
    prompt: "Trendy vertical video, fast cuts, text overlay ready, vibrant colors, social media optimized, engaging hook",
    providerId: "kling",
    subModelId: "kling-3.0",
    aspect: "9:16",
    duration: "5s",
    resolution: "1080p",
  },
  {
    Icon: Heart,
    title: "Видеооткрытка",
    desc: "Поздравление с анимацией",
    prompt: "Animated greeting card, floating particles, warm colors, celebration mood, gentle camera movement, sparkle effects",
    providerId: "kling",
    subModelId: "kling-2.1",
    aspect: "1:1",
    duration: "5s",
    resolution: "720p",
  },
];

const VideoPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("kling");
  const [selectedSubModelId, setSelectedSubModelId] = useState("kling-3.0");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5s");
  const [resolution, setResolution] = useState("720p");
  const [quality, setQuality] = useState("Стандарт");
  const [, setSelectedFunc] = useState("Текст в видео");
  const [moreOpen, setMoreOpen] = useState(false);
  const [generations, setGenerations] = useState<MediaGeneration[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  
  const [capsuleOpen, setCapsuleOpen] = useState(false);

  useEffect(() => {
    if (!capsuleOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-capsule-dropdown]")) setCapsuleOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [capsuleOpen]);

  const provider = videoProviders.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const credits = subModel?.credits ?? 0;
  const hasGenerations = generations.length > 0;

  useEffect(() => { document.title = "ERA2 — Генерация видео"; }, []);
  useEffect(() => {
    if (generations.length > 0) {
      feedEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [generations]);

  useEffect(() => {
    const saved = sessionStorage.getItem("era2_draft_video");
    if (saved) setPrompt(saved);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("era2_draft_video", prompt);
  }, [prompt]);

  const handleGenerate = () => {
    const text = prompt.trim();
    if (!text || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGenerations((prev) => [...prev, {
        id: Date.now().toString(),
        prompt: text,
        model: provider?.name || "Video",
        subModel: subModel?.name || "",
        createdAt: new Date(),
        type: "video",
        aspect: aspectRatio,
        duration,
        resolution,
      }]);
      setIsGenerating(false);
      setPrompt("");
      sessionStorage.removeItem("era2_draft_video");
    }, 2000 + Math.random() * 2000);
  };

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
    { name: "Kling 3.0", desc: "Топовое видео от Kling AI", isNew: true, credits: 75 },
    { name: "Seedance 2.0", desc: "Плавные многокадровые видео", isNew: true, badges: ["60% OFF"], credits: 48 },
    { name: "Veo 3", desc: "Топовая модель Google", isNew: true, credits: 120 },
    { name: "Sora 2", desc: "Флагман видеогенерации OpenAI", credits: 480 },
    { name: "Wan AI", desc: "Точное управление видео", isNew: true, credits: 30 },
    { name: "Hailuo AI", desc: "Новый игрок на рынке", isNew: true, credits: 40 },
    { name: "Vidu AI", desc: "Кинотеатральное качество", isNew: true, credits: 50 },
    { name: "Sora 2 Pro", desc: "Максимальное качество", credits: 1440 },
    { name: "Kling 2.5 Turbo", desc: "Быстрая генерация видео", credits: 30 },
  ];

  const handleCarouselSelect = (name: string) => {
    const card = videoCarouselCards.find((c) => c.title === name);
    if (card) handleModelSelect(card.providerId, card.subModelId);
  };

  return (
    <ErrorBoundary>
    <div className="flex flex-col h-[calc(100vh-var(--header-height,64px))]">
      {/* Scrollable area: chat (welcome OR feed) + catalog below */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="sticky top-0 z-20 flex justify-center py-2" style={{ background: "color-mix(in oklab, var(--c-bg) 85%, transparent)", backdropFilter: "blur(12px)" }}>
          <div className="relative" data-capsule-dropdown>
            <button onClick={() => setCapsuleOpen(!capsuleOpen)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium hover:opacity-90 transition-opacity" style={{ background: "var(--c-bg-1)", border: "1px solid var(--c-line)", color: "var(--c-fg)" }}>
              <ModelGlyph name={provider?.name || "Kling"} size={20} />
              <span>{provider?.name}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono tabular-nums text-xs" style={{ color: "var(--c-accent-2)" }}>{subModel?.name}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            <AnimatePresence>
              {capsuleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] max-h-[400px] overflow-y-auto rounded-[14px] border p-1.5 shadow-2xl z-50"
                  style={{ background: "hsl(var(--popover))", borderColor: "hsl(var(--border))" }}
                >
                  {videoProviders.map((p) => (
                    <div key={p.id}>
                      <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{p.name}</div>
                      {p.subModels.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { handleModelSelect(p.id, s.id); setCapsuleOpen(false); }}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm transition-colors text-left",
                            selectedSubModelId === s.id ? "bg-[rgba(232,84,32,0.12)]" : "hover:bg-secondary"
                          )}
                        >
                          <ModelGlyph name={p.name} size={24} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate" style={{ color: selectedSubModelId === s.id ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}>{s.name}</div>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground shrink-0">{s.credits} cr</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {!hasGenerations ? (
          <WelcomeBlock
            modelName={provider?.name || "Видео"}
            subModelName={subModel?.name}
            scenarios={welcomeScenarios}
            onScenarioClick={(scenario) => {
              setPrompt(scenario.prompt);
              if (scenario.providerId) {
                const prov = videoProviders.find(p => p.id === scenario.providerId);
                if (prov) {
                  setSelectedProviderId(prov.id);
                  if (scenario.subModelId) {
                    const sub = prov.subModels.find(s => s.id === scenario.subModelId);
                    if (sub) setSelectedSubModelId(sub.id);
                  }
                }
              }
              if (scenario.aspect) setAspectRatio(scenario.aspect);
              if (scenario.duration) setDuration(scenario.duration);
              if (scenario.resolution) setResolution(scenario.resolution);
            }}
          />
        ) : (
          <>
            <MediaChatFeed generations={generations} />
            {isGenerating && <GenerationLoader type="video" model={subModel?.name} />}
            <div ref={feedEndRef} />
          </>
        )}

        {/* Каталог — всегда виден при скролле */}
        <div className="px-4 lg:px-8 py-6 space-y-6 border-t border-border mt-6">
          <PromptSuggestions suggestions={videoPromptSuggestions} onSelect={setPrompt} />
          <ModelCarousel models={carouselModels} onSelect={handleCarouselSelect} />
          <ScenariosCarousel title="Сценарии для видео" scenarios={videoScenarios} />
          <ModelsGrid3x3 models={videoGridModels} />
        </div>
      </div>

      {/* Sticky input area */}
      <div ref={inputAreaRef} className="shrink-0 px-4 lg:px-6 pb-4 pt-1.5 bg-[var(--bg-primary)]">
        <div className="max-w-[780px] mx-auto">
          <WorkspaceTabs variant="attached" />
          <div className="rounded-[22px] rounded-tl-none border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 w-full transition-all duration-200 has-[textarea:focus]:border-[hsl(var(--primary))] has-[textarea:focus]:shadow-[0_0_0_3px_rgba(232,84,32,0.12),0_1px_4px_rgba(0,0,0,0.2)]">
            <div className="flex items-start gap-3 mb-3">
              <AttachmentButton current={0} max={5} />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Введите свою идею для генерации"
                rows={3}
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] resize-none min-h-[80px] py-3 px-1 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] placeholder:opacity-60"
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

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="ml-auto inline-flex items-center gap-1.5 px-5 h-10 rounded-full gradient-accent text-white text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" /> Генерировать
                <span className="inline-flex items-center gap-1 ml-1 font-mono tabular-nums">
                  <Zap className="w-3 h-3" /> {credits}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
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
    </ErrorBoundary>
  );
};

export default VideoPage;
