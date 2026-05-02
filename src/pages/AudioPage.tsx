import { useState, useEffect } from "react";
import { ChevronDown, Play, Plus, Zap, Settings2, Smartphone, Film, Mic, Sparkles, Megaphone, Headphones, Globe, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { PillDropdown } from "@/components/workspace/PillDropdown";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import { ModelGlyph } from "@/components/ui/era/ModelGlyph";

/* ─── Voice data ─── */
const voices = [
  { name: "Dmitry D", gender: "Мужской", lang: "Русский", color: "hsl(var(--primary))", category: ["popular", "male", "russian"] },
  { name: "Mikhail K", gender: "Мужской", lang: "Русский", color: "#3b82f6", category: ["male", "russian"] },
  { name: "Sergey V", gender: "Мужской", lang: "Русский", color: "#10b981", category: ["male", "russian"] },
  { name: "Anton R", gender: "Мужской", lang: "Русский", color: "#f59e0b", category: ["male", "russian"] },
  { name: "Anna S", gender: "Женский", lang: "Русский", color: "#ff7a3d", category: ["popular", "female", "russian"] },
  { name: "Elena V", gender: "Женский", lang: "Русский", color: "hsl(var(--primary))", category: ["popular", "female", "russian"] },
  { name: "Maria T", gender: "Женский", lang: "Русский", color: "#ffb27a", category: ["female", "russian"] },
  { name: "Olga N", gender: "Женский", lang: "Русский", color: "#06b6d4", category: ["female", "russian"] },
  { name: "James", gender: "Мужской", lang: "Английский", color: "hsl(var(--primary))", category: ["popular", "male"] },
  { name: "Sarah", gender: "Женский", lang: "Английский", color: "#f43f5e", category: ["popular", "female"] },
  { name: "Alex", gender: "Мужской", lang: "Английский", color: "#14b8a6", category: ["male"] },
  { name: "Emily", gender: "Женский", lang: "Английский", color: "#eab308", category: ["female"] },
];

const voiceTabs = [
  { id: "popular", label: "Популярные" },
  { id: "male", label: "Мужские" },
  { id: "female", label: "Женские" },
  { id: "russian", label: "Русские" },
];

const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical", "R&B", "Lo-Fi", "Ambient", "Cinematic", "Folk", "Latin"];

const sunoPromptChips = [
  "Энергичный поп-трек для рекламы",
  "Спокойная Lo-Fi музыка для учёбы",
  "Кинематографический саундтрек",
  "Рок-баллада о любви",
  "Электронный бит для Reels",
  "Джазовая композиция для кафе",
];

const elevenScenarios = [
  { Icon: Mic, label: "Озвучка видео" },
  { Icon: Megaphone, label: "Реклама" },
  { Icon: Headphones, label: "Подкасты" },
  { Icon: Globe, label: "Локализация" },
];

const sunoScenarios = [
  { Icon: Music, label: "Музыка для видео" },
  { Icon: Smartphone, label: "Треки для Reels" },
  { Icon: Film, label: "Саундтреки" },
  { Icon: Mic, label: "Песни с вокалом" },
];

const AudioPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<"elevenlabs" | "suno">("elevenlabs");
  const [modelDDOpen, setModelDDOpen] = useState(false);

  // ElevenLabs state
  const [selectedVoice, setSelectedVoice] = useState("Dmitry D");
  const [voiceTab, setVoiceTab] = useState("popular");
  const [elModel, setElModel] = useState("Speech (Eleven v2)");
  const [elLang, setElLang] = useState("Русский");
  const [elFormat, setElFormat] = useState("MP3");

  // Suno state
  const [sunoVersion, setSunoVersion] = useState("v5");
  const [sunoMode, setSunoMode] = useState("Автоматический");
  const [sunoDuration, setSunoDuration] = useState("До 2 минут");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => { document.title = "ERA2 — Генерация аудио"; }, []);

  const isEL = selectedModel === "elevenlabs";
  const filteredVoices = voices.filter(v => v.category.includes(voiceTab));

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-8 w-full">

        <div>
        <WorkspaceTabs variant="attached" />

        {/* ─── Prompt Block ─── */}
        <div
          className="rounded-[20px] rounded-tl-none p-6 border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-200 has-[textarea:focus]:border-[hsl(var(--primary))] has-[textarea:focus]:shadow-[0_0_0_3px_rgba(232,84,32,0.12),0_1px_4px_rgba(0,0,0,0.2)]"
          style={{ minHeight: 140 }}
        >
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={isEL ? "Введите текст для озвучки..." : "Опишите музыку, которую хотите создать..."}
            className="w-full min-h-[100px] bg-transparent border-none outline-none text-[15px] resize-none text-foreground placeholder:text-muted-foreground"
          />
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Model selector pill */}
            <div className="relative">
              <button
                onClick={() => setModelDDOpen(!modelDDOpen)}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] font-medium whitespace-nowrap leading-none transition-colors text-foreground"
                style={{ background: "var(--bg-pill)", border: "1px solid var(--border-primary)" }}
              >
                <span className="leading-none">{isEL ? "🔊 ElevenLabs" : "🎵 Suno"}</span>
                <ChevronDown size={12} className="shrink-0 opacity-60" />
              </button>
              {modelDDOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 rounded-xl shadow-xl z-50 p-1" style={{ background: "var(--bg-popup)", border: "1px solid var(--border-primary)" }}>
                  {[
                    { id: "elevenlabs" as const, icon: "🔊", name: "ElevenLabs", desc: "Озвучка и голос", credits: 60 },
                    { id: "suno" as const, icon: "🎵", name: "Suno", desc: "Генерация музыки", credits: 30 },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setSelectedModel(m.id); setModelDDOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                        selectedModel === m.id ? "bg-[rgba(232, 84, 32,0.15)]" : "hover:bg-[rgba(255,255,255,0.04)]"
                      )}
                    >
                      <span className="text-lg">{m.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium" style={{ color: selectedModel === m.id ? "hsl(var(--primary))" : "var(--text-primary)" }}>{m.name}</div>
                        <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{m.desc}</div>
                      </div>
                      <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>от {m.credits} cr</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isEL ? (
              <>
                <PillDropdown icon="🎤" value={`Голос: ${selectedVoice}`} options={voices.map(v => ({ value: v.name, label: v.name }))} onSelect={setSelectedVoice} />
                <PillDropdown value="v2 Multilingual" options={[{ value: "v2 Multilingual", label: "v2 Multilingual" }, { value: "v3", label: "v3" }]} onSelect={() => {}} />
              </>
            ) : (
              <>
                <PillDropdown value={sunoVersion} options={[{ value: "v5", label: "v5" }, { value: "v4.5", label: "v4.5" }, { value: "v4", label: "v4" }]} onSelect={setSunoVersion} />
                <PillDropdown value={sunoMode} options={[
                  { value: "Автоматический", label: "Автоматический" },
                  { value: "Инструментал", label: "Инструментал" },
                  { value: "Свой текст", label: "Свой текст" },
                ]} onSelect={setSunoMode} />
              </>
            )}

            <button
              className="inline-flex items-center justify-center h-9 w-9 rounded-full text-foreground transition-colors shrink-0"
              style={{ background: "var(--bg-pill)", border: "1px solid var(--border-primary)" }}
            >
              <Settings2 size={14} />
            </button>

            <div className="flex-1" />

            <button
              onClick={() => {}}
              disabled={!prompt.trim()}
              className="px-4 py-2 rounded-[10px] text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-1.5"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
            >
              <Plus size={14} /> Генерировать <Zap size={12} /> {isEL ? 60 : 30}
            </button>
          </div>
        </div>
        </div>

        {/* ─── ElevenLabs content ─── */}
        {isEL && (
          <>
            {/* Voice selector */}
            <div>
              <h2 className="text-base font-bold text-foreground mb-4">Выберите голос</h2>
              <div className="flex gap-2 mb-4">
                {voiceTabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setVoiceTab(t.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors",
                      voiceTab === t.id ? "text-white" : ""
                    )}
                    style={voiceTab === t.id ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : { background: "var(--bg-pill)", border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredVoices.map(v => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVoice(v.name)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border transition-colors text-left",
                      selectedVoice === v.name ? "border-[hsl(var(--primary))] bg-[rgba(232, 84, 32,0.05)]" : ""
                    )}
                    style={selectedVoice !== v.name ? { background: "var(--bg-card)", borderColor: "var(--border-primary)" } : undefined}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: v.color }}
                    >
                      {v.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">{v.name}</div>
                      <div className="text-xs text-muted-foreground">{v.gender} • {v.lang}</div>
                    </div>
                    <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: "var(--bg-pill)" }}
                      onClick={e => e.stopPropagation()}
                    >
                      <Play size={8} className="ml-px text-muted-foreground" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { title: "МОДЕЛЬ", value: elModel, setter: setElModel, options: ["Speech (Eleven v2)", "Dialogue/Speech (Eleven v3)"] },
                { title: "ЯЗЫК", value: elLang, setter: setElLang, options: ["Русский", "Английский", "Немецкий", "Французский", "Испанский", "Китайский", "Японский"] },
                { title: "ФОРМАТ", value: elFormat, setter: setElFormat, options: ["MP3", "WAV"] },
              ].map(s => (
                <div key={s.title} className="flex-1 rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                  <div className="text-[13px] text-muted-foreground uppercase tracking-wide mb-3">{s.title}</div>
                  <PillDropdown value={s.value} options={s.options.map(o => ({ value: o, label: o }))} onSelect={v => s.setter(v)} />
                </div>
              ))}
            </div>

            {/* Scenarios */}
            <div>
              <h2 className="text-base font-bold text-foreground mb-4">Сценарии использования</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {elevenScenarios.map(s => (
                  <div key={s.label} className="rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer transition-colors" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: "rgba(232, 84, 32, 0.1)", border: "1px solid rgba(232, 84, 32, 0.18)" }}>
                      <s.Icon size={20} strokeWidth={1.75} style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <span className="text-[13px] font-semibold text-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ─── Suno content ─── */}
        {!isEL && (
          <>
            {/* Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "ВЕРСИЯ", value: sunoVersion, setter: setSunoVersion, options: ["v5", "v4.5", "v4"] },
                { title: "РЕЖИМ", value: sunoMode, setter: setSunoMode, options: ["Автоматический", "Инструментал", "Свой текст"] },
                { title: "ДЛИТЕЛЬНОСТЬ", value: sunoDuration, setter: setSunoDuration, options: ["До 1 минуты", "До 2 минут", "До 4 минут"] },
              ].map(s => (
                <div key={s.title} className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                  <div className="text-[13px] text-muted-foreground uppercase tracking-wide mb-3">{s.title}</div>
                  <PillDropdown value={s.value} options={s.options.map(o => ({ value: o, label: o }))} onSelect={v => s.setter(v)} />
                </div>
              ))}
            </div>

            {/* Genres */}
            <div>
              <h2 className="text-base font-bold text-foreground mb-4">Выберите жанр</h2>
              <div className="flex flex-wrap gap-2">
                {genres.map(g => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[13px] transition-colors",
                    selectedGenres.includes(g)
                      ? "text-white border-none"
                      : ""
                  )}
                  style={selectedGenres.includes(g) ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : { background: "var(--bg-pill)", border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt chips */}
            <div>
              <h2 className="text-base font-bold text-foreground mb-4">Идеи для генерации</h2>
              <div className="flex flex-wrap gap-2">
                {sunoPromptChips.map(c => (
                  <button
                    key={c}
                    onClick={() => setPrompt(c)}
                    className="px-4 py-2 rounded-xl text-[13px] text-muted-foreground transition-colors"
                    style={{ background: "var(--bg-pill)", border: "1px solid var(--border-primary)" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenarios */}
            <div>
              <h2 className="text-base font-bold text-foreground mb-4">Сценарии использования</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sunoScenarios.map(s => (
                  <div key={s.label} className="rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer transition-colors" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: "rgba(232, 84, 32, 0.1)", border: "1px solid rgba(232, 84, 32, 0.18)" }}>
                      <s.Icon size={20} strokeWidth={1.75} style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <span className="text-[13px] font-semibold text-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ─── Models block (shared) ─── */}
        <div>
          <h2 className="text-lg font-bold text-foreground mt-10 mb-5">Модели</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "elevenlabs" as const, name: "ElevenLabs", desc: "Озвучка текста и клонирование голоса", credits: 60 },
              { id: "suno" as const, name: "Suno", desc: "Генерация музыки по описанию", credits: 30 },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border transition-colors text-left",
                  selectedModel === m.id
                    ? "border-[hsl(var(--primary))] bg-[rgba(232, 84, 32,0.05)]"
                    : ""
                )}
                style={selectedModel !== m.id ? { background: "var(--bg-card)", borderColor: "var(--border-primary)" } : undefined}
              >
                <ModelGlyph name={m.name} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground">{m.name}</div>
                  <div className="text-[13px] text-muted-foreground">{m.desc}</div>
                </div>
                <span className="text-[12px] text-muted-foreground shrink-0">от {m.credits} cr</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPage;
