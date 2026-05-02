import { useMemo, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Sparkles, Users } from "lucide-react";
import { WorkspaceTopTabs, type WorkspaceTopTab } from "@/components/workspace/WorkspaceTopTabs";
import { GenerationCard } from "@/components/workspace/GenerationCard";
import { WorkspacePromptBar, type GenType } from "@/components/workspace/WorkspacePromptBar";
import {
  MOCK_GENERATIONS,
  defaultModelFor,
  gradientForType,
  type Generation,
} from "@/data/mockGenerations";

const routeApi = getRouteApi("/create");

function buildInitialFeed(type: GenType, seedPrompt: string): Generation[] {
  const base = MOCK_GENERATIONS.filter((g) => g.type === type);
  if (!seedPrompt.trim()) return base;
  const m = defaultModelFor(type);
  const seed: Generation = {
    id: `seed-${Date.now()}`,
    type,
    providerId: m.providerId,
    modelName: m.modelName,
    credits: m.credits,
    prompt: seedPrompt,
    createdAt: new Date(),
    text: type === "text" ? "Готово. Это пример сгенерированного ответа на ваш запрос." : undefined,
    gradient: type === "image" || type === "video" ? gradientForType(type) : undefined,
    aspect: type === "image" ? "1:1" : type === "video" ? "16:9" : undefined,
    duration: type === "video" ? "5s" : type === "audio" ? "1:24" : undefined,
  };
  return [seed, ...base];
}

function EmptyTile({
  Icon,
  title,
  subtitle,
}: {
  Icon: typeof Sparkles;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: "rgba(232,84,32,0.08)",
          color: "hsl(var(--primary))",
          border: "1px solid color-mix(in oklab, hsl(var(--primary)) 25%, transparent)",
        }}
      >
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-1.5">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export default function CreatePage() {
  const search = routeApi.useSearch();

  const [tab, setTab] = useState<WorkspaceTopTab>("history");
  const [type, setType] = useState<GenType>(search.type);
  const [prompt, setPrompt] = useState<string>(search.prompt);

  const [feedByType, setFeedByType] = useState<Record<GenType, Generation[]>>(() => ({
    text: search.type === "text" ? buildInitialFeed("text", search.prompt) : MOCK_GENERATIONS.filter((g) => g.type === "text"),
    image: search.type === "image" ? buildInitialFeed("image", search.prompt) : MOCK_GENERATIONS.filter((g) => g.type === "image"),
    video: search.type === "video" ? buildInitialFeed("video", search.prompt) : MOCK_GENERATIONS.filter((g) => g.type === "video"),
    audio: search.type === "audio" ? buildInitialFeed("audio", search.prompt) : MOCK_GENERATIONS.filter((g) => g.type === "audio"),
  }));

  const feed = feedByType[type];

  const handleSubmit = () => {
    const text = prompt.trim();
    if (!text) return;
    const m = defaultModelFor(type);
    const fresh: Generation = {
      id: `g-${Date.now()}`,
      type,
      providerId: m.providerId,
      modelName: m.modelName,
      credits: m.credits,
      prompt: text,
      createdAt: new Date(),
      text: type === "text" ? "Готово. Это пример сгенерированного ответа на ваш запрос." : undefined,
      gradient: type === "image" || type === "video" ? gradientForType(type) : undefined,
      aspect: type === "image" ? "1:1" : type === "video" ? "16:9" : undefined,
      duration: type === "video" ? "5s" : type === "audio" ? "1:24" : undefined,
    };
    setFeedByType((prev) => ({ ...prev, [type]: [fresh, ...prev[type]] }));
    setPrompt("");
  };

  const emptyState = useMemo(
    () => <EmptyTile Icon={Sparkles} title="Опиши идею ниже" subtitle="Результаты появятся здесь." />,
    [],
  );

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 56px)" }}>
      <WorkspaceTopTabs value={tab} onChange={setTab} />

      <div className="flex-1">
        {tab === "history" ? (
          <div className="max-w-[920px] mx-auto px-4 py-6 space-y-4 pb-[220px]">
            {feed.length === 0
              ? emptyState
              : feed.map((g) => <GenerationCard key={g.id} generation={g} />)}
          </div>
        ) : (
          <div className="max-w-[920px] mx-auto px-4 py-6 pb-[220px]">
            <EmptyTile
              Icon={Users}
              title="Лента сообщества скоро"
              subtitle="Здесь появятся лучшие генерации пользователей ERA2."
            />
          </div>
        )}
      </div>

      <WorkspacePromptBar
        type={type}
        onTypeChange={setType}
        prompt={prompt}
        onPromptChange={setPrompt}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
