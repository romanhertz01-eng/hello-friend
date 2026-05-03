import { useState, useEffect } from "react";
import {
  Search, ChevronDown, Bot, Sparkles,
  Calculator, FlaskConical, GraduationCap, BookOpen, FileText, Award, Brain,
  RefreshCw, BookMarked, Feather, Lightbulb, Clapperboard, Music, Megaphone,
  TrendingUp, Receipt, Scale,
  Code, Bug, ScanText,
  Stethoscope, HeartPulse, Dumbbell, Apple, TestTube2,
  Plane, Stars, Sun, Moon,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = ["Все", "Образование", "Контент", "Бизнес", "Разработка", "Здоровье", "Лайфстайл"];

interface Agent {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tab: string;
}

const agents: Agent[] = [
  // Образование (7)
  { Icon: Calculator, title: "Математик", desc: "Решение задач, уравнений, доказательства теорем", tab: "Образование" },
  { Icon: FlaskConical, title: "Химик", desc: "Формулы, реакции, молекулярные структуры", tab: "Образование" },
  { Icon: GraduationCap, title: "Помощь в учёбе", desc: "Объяснение тем, подготовка к экзаменам", tab: "Образование" },
  { Icon: BookOpen, title: "Сочинения", desc: "Эссе, изложения, аргументация", tab: "Образование" },
  { Icon: FileText, title: "Реферат", desc: "Структура, источники, оформление", tab: "Образование" },
  { Icon: Award, title: "Диплом", desc: "Дипломные и курсовые работы", tab: "Образование" },
  { Icon: Brain, title: "Решение задач", desc: "Пошаговый разбор любых задач", tab: "Образование" },
  // Контент (7)
  { Icon: RefreshCw, title: "Рерайт", desc: "Перефразирование и уникализация текста", tab: "Контент" },
  { Icon: BookMarked, title: "Сторителлинг", desc: "Увлекательные истории и нарративы", tab: "Контент" },
  { Icon: Feather, title: "Написание книг", desc: "Главы, сюжеты, персонажи", tab: "Контент" },
  { Icon: Lightbulb, title: "Генерация идей", desc: "Концепции, названия, слоганы", tab: "Контент" },
  { Icon: Clapperboard, title: "Сценарист", desc: "Сценарии для видео и рекламы", tab: "Контент" },
  { Icon: Music, title: "Песенник", desc: "Тексты песен, куплеты, припевы", tab: "Контент" },
  { Icon: Megaphone, title: "Рекламный текст", desc: "Объявления, баннеры, слоганы", tab: "Контент" },
  // Бизнес (3)
  { Icon: TrendingUp, title: "Маркетолог", desc: "Стратегии продвижения и аналитика", tab: "Бизнес" },
  { Icon: Receipt, title: "Бухгалтер", desc: "Учёт, налоги, финансовая отчётность", tab: "Бизнес" },
  { Icon: Scale, title: "Юрист", desc: "Анализ документов, консультации", tab: "Бизнес" },
  // Разработка (3)
  { Icon: Code, title: "Генерация кода", desc: "Написание кода на любом языке", tab: "Разработка" },
  { Icon: Bug, title: "Исправление кода", desc: "Дебаг, рефакторинг, оптимизация", tab: "Разработка" },
  { Icon: ScanText, title: "Распознавание текста", desc: "OCR из изображений и PDF", tab: "Разработка" },
  // Здоровье (5)
  { Icon: Stethoscope, title: "Доктор", desc: "Общие медицинские консультации", tab: "Здоровье" },
  { Icon: HeartPulse, title: "Психолог", desc: "Поддержка и рекомендации", tab: "Здоровье" },
  { Icon: Dumbbell, title: "Фитнес-тренер", desc: "Программы тренировок и упражнения", tab: "Здоровье" },
  { Icon: Apple, title: "Рацион питания", desc: "Меню, калории, рекомендации", tab: "Здоровье" },
  { Icon: TestTube2, title: "Расшифровка анализов", desc: "Интерпретация результатов анализов", tab: "Здоровье" },
  // Лайфстайл (4)
  { Icon: Plane, title: "Путешествия", desc: "Маршруты, бюджет, достопримечательности", tab: "Лайфстайл" },
  { Icon: Stars, title: "Таролог", desc: "Расклады и интерпретации карт", tab: "Лайфстайл" },
  { Icon: Sun, title: "Гороскоп", desc: "Персональный астрологический прогноз", tab: "Лайфстайл" },
  { Icon: Moon, title: "Толкование снов", desc: "Анализ символов и значений", tab: "Лайфстайл" },
];

const textModels = ["ChatGPT", "Claude", "Gemini", "Grok", "Deepseek", "Perplexity", "Qwen"];

const AgentsPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Все");
  const [selectedTextModel, setSelectedTextModel] = useState("ChatGPT");
  const navigate = useNavigate();

  useEffect(() => { document.title = "ERA2 — ИИ Агенты и ассистенты"; }, []);

  const filtered = agents.filter((a) => {
    const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "Все" || a.tab === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 px-4 md:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center text-white text-2xl shrink-0">
            <Bot />
          </div>
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold mb-1">Создайте и общайтесь со своим личным агентом</h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              27 ИИ-ассистентов для любых задач
            </p>
          </div>
        </motion.div>

        {/* Agent dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm cursor-pointer hover:border-primary/30 transition-colors">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Выберите агента из списка</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Искать агента..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow placeholder:text-muted-foreground"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                t === activeTab ? "gradient-accent text-white" : "border border-border hover:bg-accent/50"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Agent grid */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((a) => (
            <motion.div
              key={a.title}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              onClick={() => navigate({ to: "/text" })}
              className="border border-border rounded-2xl p-5 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all flex items-start gap-4 group bg-card"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[hsl(var(--primary))/0.18]" style={{ background: "rgba(232, 84, 32, 0.1)", border: "1px solid rgba(232, 84, 32, 0.2)" }}>
                <a.Icon className="w-[22px] h-[22px]" style={{ color: "hsl(var(--primary))" }} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Агенты не найдены</p>
        )}
      </div>

      {/* Right panel */}
      <div className="hidden xl:flex w-72 border-l border-border bg-background flex-col p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] mb-3">Выбор модели</h3>
          <div className="space-y-1">
            {textModels.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedTextModel(m)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedTextModel === m
                    ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-primary/40"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Системный промпт</h3>
          <textarea
            placeholder="Введите кастомные инструкции для агента..."
            rows={4}
            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm outline-none resize-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">О модели</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {selectedTextModel} — одна из лучших текстовых моделей для генерации контента, анализа данных и работы с кодом.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
