import { useEffect, useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { HistoryFilters, type HistoryFilter } from "@/components/history/HistoryFilters";
import { HistoryCard } from "@/components/history/HistoryCard";
import { HistoryDetailDialog } from "@/components/history/HistoryDetailDialog";
import { MOCK_HISTORY, type HistoryItem } from "@/data/mockHistory";

function pluralizeGenerations(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "генерация";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "генерации";
  return "генераций";
}

const HistoryPage = () => {
  useEffect(() => {
    document.title = "ERA2 — История";
  }, []);

  const [filter, setFilter] = useState<HistoryFilter>("all");
  const [assetFilter, setAssetFilter] = useState<"all" | "image" | "video" | "audio" | "favorites">("all");
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  const [items, setItems] = useState<HistoryItem[]>(MOCK_HISTORY);

  const handleAssetFilter = (id: "all" | "image" | "video" | "audio" | "favorites") => {
    setAssetFilter(id);
    setFilter(id);
  };

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "favorites") return items.filter((i) => i.favorite);
    return items.filter((i) => i.type === filter);
  }, [items, filter]);

  const counts = useMemo<Partial<Record<HistoryFilter, number>>>(
    () => ({
      all: items.length,
      text: items.filter((i) => i.type === "text").length,
      image: items.filter((i) => i.type === "image").length,
      video: items.filter((i) => i.type === "video").length,
      audio: items.filter((i) => i.type === "audio").length,
      favorites: items.filter((i) => i.favorite).length,
    }),
    [items],
  );

  const toggleFavorite = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
  };

  const collections: { id: "all" | "favorites"; label: string; count: number }[] = [
    { id: "all", label: "Все файлы", count: counts.all ?? 0 },
    { id: "favorites", label: "Избранное", count: counts.favorites ?? 0 },
  ];
  const tools: { id: "image" | "video" | "audio"; label: string }[] = [
    { id: "image", label: "Изображения" },
    { id: "video", label: "Видео" },
    { id: "audio", label: "Аудио" },
  ];

  return (
    <div className="flex h-[calc(100vh-var(--header-height,64px))]">
      {/* Asset sidebar */}
      <div className="w-[200px] shrink-0 border-r border-border p-4 flex flex-col gap-1 overflow-y-auto">
        <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Коллекции</h3>
        {collections.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAssetFilter(item.id)}
            className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] transition-colors ${assetFilter === item.id ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary/50"}`}
          >
            {item.label}
            <span className="text-[10px] font-mono text-muted-foreground">{item.count}</span>
          </button>
        ))}

        <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 mt-4">Инструменты</h3>
        {tools.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAssetFilter(item.id)}
            className={`flex items-center px-3 py-2 rounded-[8px] text-[13px] transition-colors ${assetFilter === item.id ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary/50"}`}
          >
            {item.label}
          </button>
        ))}

        <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 mt-4">Проекты</h3>
        <button className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-[13px] text-muted-foreground hover:bg-secondary/50 transition-colors">
          + Новый проект
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">История</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} {pluralizeGenerations(filtered.length)}
          </p>
        </div>

        <HistoryFilters value={filter} onChange={setFilter} counts={counts} />

        <div className="max-w-[1200px] mx-auto px-4">
          {filtered.length === 0 ? (
            items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="text-4xl">📁</div>
                <h3 className="text-base font-medium text-foreground">Здесь появятся ваши генерации</h3>
                <p className="text-sm text-muted-foreground">Используйте папки для организации работ</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-24">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(232,84,32,0.08)",
                    color: "hsl(var(--primary))",
                    border: "1px solid color-mix(in oklab, hsl(var(--primary)) 25%, transparent)",
                  }}
                >
                  <Inbox size={24} strokeWidth={1.8} />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-1.5">Здесь пока пусто</h2>
                <p className="text-sm text-muted-foreground">
                  {filter === "favorites"
                    ? "Вы ещё не отметили ничего избранным"
                    : "Попробуйте сменить фильтр"}
                </p>
              </div>
            )
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mt-4 pb-12">
              {filtered.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelected(item)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <HistoryDetailDialog
        item={selected}
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
};

export default HistoryPage;
