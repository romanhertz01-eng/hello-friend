import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Megaphone, TrendingUp, FileText, GraduationCap, Briefcase, Palette, type LucideIcon } from "lucide-react";
import { StatusBadge } from "@/components/ui/era";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Студии — ERA2" },
      { name: "description", content: "Многошаговые рабочие пространства ERA2 для профессиональных задач." },
    ],
  }),
  component: StudiosPage,
});

const studios: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Megaphone, title: "SMM-студия", desc: "Генерация постов, сторис, обложек и видео для соцсетей в одном workflow" },
  { Icon: TrendingUp, title: "Маркетинговая студия", desc: "Лендинги, рекламные креативы, A/B-варианты заголовков и email-рассылки" },
  { Icon: FileText, title: "Контент-студия", desc: "Транскрибация, монтаж по сценарию, субтитры, озвучка и нарезка для Reels" },
  { Icon: GraduationCap, title: "Образовательная студия", desc: "Создание курсов: план, лекции, тесты, визуализация и экзамены" },
  { Icon: Briefcase, title: "Бизнес-студия", desc: "Коммерческие предложения, договоры, презентации и финансовые таблицы" },
  { Icon: Palette, title: "Креативная студия", desc: "Storyboard, концепт-арт, видео, саундтрек и финальный монтаж" },
];

function StudiosPage() {
  useEffect(() => { document.title = "ERA2 — Студии"; }, []);

  return (
    <div className="min-h-[calc(100vh-var(--header-height,64px))] px-4 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Студии
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Многошаговые рабочие пространства для профессиональных задач. Несколько ИИ-моделей в одном проекте.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studios.map((s) => (
            <div
              key={s.title}
              className="relative rounded-2xl p-6 cursor-default transition-colors"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
            >
              <div className="absolute top-4 right-4">
                <StatusBadge variant="soon">СКОРО</StatusBadge>
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(232, 84, 32, 0.12)", border: "1px solid rgba(232, 84, 32, 0.18)" }}
              >
                <s.Icon className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
              </div>

              <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
