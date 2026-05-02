import { useState, useEffect } from "react";

import { PromptBlock } from "@/components/workspace/ImagePromptBlock";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import { PromptSuggestions } from "@/components/workspace/PromptSuggestions";
import { ModelCarousel } from "@/components/workspace/ModelCarousel";
import { ScenariosCarousel } from "@/components/workspace/ScenariosCarousel";
import { ModelsGrid3x3 } from "@/components/workspace/ModelsGrid3x3";

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
  { name: "Nano Banana 2", desc: "Премиум генерация", icon: "🍌", iconColor: "#eab308", isNew: true, credits: 300 },
  { name: "MidJourney", desc: "Топ для арта", icon: "⛵", iconColor: "#f97316", badges: ["Топ"], credits: 80 },
  { name: "Seedream 5 Lite", desc: "Быстрая генерация", icon: "📊", iconColor: "#22c55e", isNew: true, credits: 2 },
  { name: "GPT Image 1.5", desc: "От OpenAI", icon: "🤖", iconColor: "#3b82f6", credits: 40 },
  { name: "Flux", desc: "State of the art", icon: "⚡", iconColor: "#f97316", badges: ["SOTA"], credits: 15 },
  { name: "Runway", desc: "Креативная генерация", icon: "🎬", iconColor: "hsl(var(--primary))", credits: 20 },
  { name: "Imagen 4", desc: "От Google", icon: "🌀", iconColor: "#3b82f6", badges: ["Google"], credits: 8 },
  { name: "Higgsfield Soul", desc: "Уникальный стиль", icon: "🔥", iconColor: "hsl(var(--primary))", isNew: true, credits: 15 },
  { name: "Kling V3 Omni", desc: "Мультимодальная", icon: "🎨", iconColor: "#f97316", isNew: true, credits: 25 },
];

const DesignPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("nano-banana");
  const [selectedSubModelId, setSelectedSubModelId] = useState("banana-2");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quantity, setQuantity] = useState(1);
  const [quality, setQuality] = useState("2K");
  const [turbo, setTurbo] = useState(false);

  const provider = imageProviders.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const credits = subModel?.credits ?? 0;

  useEffect(() => { document.title = "ERA2 — Генерация изображений"; }, []);

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
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-4 space-y-4 w-full">
        <div>
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
            onGenerate={() => {}}
          />
        </div>

        <PromptSuggestions suggestions={imagePromptSuggestions} onSelect={setPrompt} />
        <ModelCarousel models={carouselModels} onSelect={handleCarouselSelect} />
        <ScenariosCarousel title="Сценарии для изображений" scenarios={designScenarios} />
        <ModelsGrid3x3 models={designGridModels} />
      </div>
    </div>
  );
};

export default DesignPage;
