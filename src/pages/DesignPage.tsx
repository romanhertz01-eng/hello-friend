import { useState, useEffect, useRef } from "react";
import { Camera, Palette, Sparkles, Image as ImageIcon, Zap, Paintbrush } from "lucide-react";

import { PromptBlock } from "@/components/workspace/ImagePromptBlock";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import { PromptSuggestions } from "@/components/workspace/PromptSuggestions";
import { ModelCarousel } from "@/components/workspace/ModelCarousel";
import { ScenariosCarousel } from "@/components/workspace/ScenariosCarousel";
import { ModelsGrid3x3 } from "@/components/workspace/ModelsGrid3x3";
import { WelcomeBlock, type WelcomeScenario } from "@/components/workspace/WelcomeBlock";
import { MediaChatFeed, type MediaGeneration } from "@/components/workspace/MediaChatFeed";

const ASPECT_TO_DIM: Record<string, [number, number]> = {
  "1:1": [1024, 1024], "16:9": [1280, 720], "9:16": [720, 1280],
  "4:3": [1152, 864], "3:4": [864, 1152], "3:2": [1216, 832], "2:3": [832, 1216],
  "21:9": [1536, 658], "4:5": [896, 1120], "5:4": [1120, 896],
};

import {
  imageProviders,
  imageCarouselCards,
  imagePromptSuggestions,
} from "@/data/imageModels";

const designScenarios = [
  { name: "Фотореалистичный портрет", gradient: "linear-gradient(135deg, #1a0533, #2d1250)" },
  { name: "Арт и иллюстрация", gradient: "linear-gradient(135deg, #0d1b2a, #1b2838)" },
  { name: "Логотип и брендинг", gradient: "linear-gradient(135deg, #1a0a2e, #2a1a3e)" },
  { name: "Контент для соцсетей", gradient: "linear-gradient(135deg, #0a1628, #162040)" },
  { name: "Стикеры и эмодзи", gradient: "linear-gradient(135deg, #1a1030, #2a1840)" },
  { name: "Фон и обои", gradient: "linear-gradient(135deg, #0d2018, #1a3028)" },
  { name: "Концепт-арт", gradient: "linear-gradient(135deg, #1a1520, #2a2030)" },
];

const designGridModels = [
  { name: "Nano Banana 2", desc: "Премиум генерация", isNew: true, credits: 300 },
  { name: "MidJourney", desc: "Топ для арта", badges: ["Топ"], credits: 80 },
  { name: "Seedream 5 Lite", desc: "Быстрая генерация", isNew: true, credits: 2 },
  { name: "GPT Image 1.5", desc: "От OpenAI", credits: 40 },
  { name: "Flux", desc: "State of the art", badges: ["SOTA"], credits: 15 },
  { name: "Runway", desc: "Креативная генерация", credits: 20 },
  { name: "Imagen 4", desc: "От Google", badges: ["Google"], credits: 8 },
  { name: "Higgsfield Soul", desc: "Уникальный стиль", isNew: true, credits: 15 },
  { name: "Kling V3 Omni", desc: "Мультимодальная", isNew: true, credits: 25 },
];

const welcomeScenarios: WelcomeScenario[] = [
  { Icon: Camera, title: "Фотореалистичный портрет", desc: "Портрет человека с детализацией", prompt: "Фотореалистичный портрет " },
  { Icon: Palette, title: "Логотип и брендинг", desc: "Минималистичный лого для бренда", prompt: "Логотип для " },
  { Icon: Sparkles, title: "Аниме иллюстрация", desc: "Персонаж в стиле аниме", prompt: "Аниме иллюстрация " },
  { Icon: ImageIcon, title: "Контент для соцсетей", desc: "Пост, сторис, обложка", prompt: "Изображение для поста " },
  { Icon: Zap, title: "Киберпанк сцена", desc: "Неоновый город будущего", prompt: "Киберпанк город ночью " },
  { Icon: Paintbrush, title: "Арт и иллюстрация", desc: "Художественная иллюстрация", prompt: "Иллюстрация " },
];

const DesignPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("nano-banana");
  const [selectedSubModelId, setSelectedSubModelId] = useState("banana-2");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quantity, setQuantity] = useState(1);
  const [quality, setQuality] = useState("2K");
  const [turbo, setTurbo] = useState(false);
  const [generations, setGenerations] = useState<MediaGeneration[]>([]);
  const feedEndRef = useRef<HTMLDivElement>(null);

  const provider = imageProviders.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const hasGenerations = generations.length > 0;

  useEffect(() => { document.title = "ERA2 — Генерация изображений"; }, []);
  useEffect(() => { feedEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [generations]);

  const handleGenerate = () => {
    const text = prompt.trim();
    if (!text) return;
    const [w, h] = ASPECT_TO_DIM[aspectRatio] || [1024, 1024];
    const imgs = Array.from({ length: Math.max(1, quantity) }, () => ({ width: w, height: h }));
    setGenerations((prev) => [...prev, {
      id: Date.now().toString(),
      prompt: text,
      model: provider?.name || "Image",
      subModel: subModel?.name || "",
      createdAt: new Date(),
      type: "image",
      images: imgs,
      aspect: aspectRatio,
      quality,
    }]);
    setPrompt("");
  };

  const handleModelSelect = (providerId: string, subModelId: string) => {
    setSelectedProviderId(providerId);
    setSelectedSubModelId(subModelId);
    const p = imageProviders.find((pr) => pr.id === providerId);
    if (p) {
      setAspectRatio(p.aspectRatios[0] || "1:1");
      setQuality(p.qualityOptions?.[1] || p.qualityOptions?.[0] || "2K");
      setQuantity(p.quantityOptions?.[0] || 1);
    }
  };

  const carouselModels = imageCarouselCards.map((c) => ({
    name: c.title,
    desc: c.desc,
    gradient: c.gradient,
    badge: c.badge,
  }));

  const handleCarouselSelect = (name: string) => {
    const card = imageCarouselCards.find((c) => c.title === name);
    if (card) handleModelSelect(card.providerId, card.subModelId);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,64px))]">
      {/* Scrollable area: chat (welcome OR feed) + catalog below */}
      <div className="flex-1 overflow-y-auto w-full">
        {!hasGenerations ? (
          <WelcomeBlock
            modelName={provider?.name || "Изображения"}
            subModelName={subModel?.name}
            scenarios={welcomeScenarios}
            onScenarioClick={(p) => setPrompt(p)}
          />
        ) : (
          <MediaChatFeed generations={generations} />
        )}
        <div ref={feedEndRef} />

        <div className="px-4 lg:px-8 py-6 space-y-6">
          <PromptSuggestions suggestions={imagePromptSuggestions} onSelect={setPrompt} />
          <ModelCarousel models={carouselModels} onSelect={handleCarouselSelect} />
          <ScenariosCarousel title="Сценарии для изображений" scenarios={designScenarios} />
          <ModelsGrid3x3 models={designGridModels} />
        </div>
      </div>

      {/* Sticky input area */}
      <div className="shrink-0 px-4 lg:px-8 pb-5 pt-2 bg-[var(--bg-primary)]">
        <div className="max-w-[980px] mx-auto">
          <WorkspaceTabs variant="attached" />
          <PromptBlock
            prompt={prompt}
            onPromptChange={setPrompt}
            providers={imageProviders}
            selectedProviderId={selectedProviderId}
            selectedSubModelId={selectedSubModelId}
            onModelSelect={handleModelSelect}
            aspectRatio={aspectRatio}
            onAspectSelect={setAspectRatio}
            quantity={quantity}
            onQuantityChange={setQuantity}
            quality={quality}
            onQualityChange={setQuality}
            turbo={turbo}
            onTurboToggle={() => setTurbo(!turbo)}
            onGenerate={handleGenerate}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
