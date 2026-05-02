import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X as XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ } from "@/components/shared/FAQ";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/ui/era";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

type Period = "year" | "month";

const plans = [
  {
    name: "Starter",
    oldPrice: "38 100 ₽",
    yearPrice: "756 ₽/мес",
    monthPrice: "890 ₽/мес",
    tokens: "3 120 токенов",
    recommended: false,
    features: [
      "3 120 токенов",
      "GPT-4o mini, Gemini Flash, DeepSeek, Haiku",
      "Базовые модели изображений",
      "Генерация текста без ограничений на базовых моделях",
    ],
    unlimitedModels: [
      "∞ Nano Banana 2 · FAST GENS",
      "∞ Nano Banana Pro · FAST GENS",
      "∞ Flux Schnell",
    ],
  },
  {
    name: "Creator",
    oldPrice: "66 200 ₽",
    yearPrice: "1 436 ₽/мес",
    monthPrice: "1 690 ₽/мес",
    tokens: "8 160 токенов",
    recommended: true,
    badge: "САМЫЙ ВЫГОДНЫЙ",
    features: [
      "8 160 токенов",
      "Все текстовые модели включая GPT 5, Claude Sonnet, Gemini Pro",
      "Все модели изображений включая Midjourney, Nano Banana",
      "ElevenLabs озвучка",
      "История и библиотека",
    ],
    unlimitedModels: [
      "∞ Nano Banana 2 · FAST GENS",
      "∞ Nano Banana Pro · FAST GENS",
      "∞ Flux Schnell",
      "∞ Seedream 5.0 Lite",
      "∞ GPT Image 1.5",
    ],
  },
  {
    name: "Pro",
    oldPrice: "66 200 ₽",
    yearPrice: "1 691 ₽/мес",
    monthPrice: "1 990 ₽/мес",
    tokens: "∞ токенов",
    recommended: false,
    features: [
      "∞ безлимитные токены",
      "Все модели текста, изображений, видео, аудио",
      "GPT 5.2, Claude Opus, Gemini 3 Pro",
      "Sora 2, Veo 3, Kling",
      "Приоритетная генерация",
      "API-доступ",
    ],
    unlimitedModels: [
      "∞ Все 30+ моделей без кредитов",
      "∞ Приоритетная очередь",
    ],
  },
];

const compareRows = [
  { label: "Токены", values: ["3 120", "8 160", "∞"] },
  { label: "GPT 5.2", values: [false, false, true] },
  { label: "Claude Opus", values: [false, false, true] },
  { label: "Midjourney", values: [false, true, true] },
  { label: "Nano Banana Pro", values: [false, true, true] },
  { label: "Sora 2", values: [false, false, true] },
  { label: "Veo 3", values: [false, false, true] },
  { label: "ElevenLabs", values: [false, true, true] },
  { label: "API-доступ", values: [false, false, true] },
  { label: "Приоритет", values: [false, false, true] },
];

const PricingPage = () => {
  const [period, setPeriod] = useState<Period>("year");
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => { document.title = "ERA2 — Тарифы"; }, []);

  return (
    <div className="min-w-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.12) 0%, rgba(255,122,61,0.04) 40%, transparent 70%)" }} />
        <motion.div className="relative max-w-4xl mx-auto text-center px-4 pt-16 pb-10 md:pt-20" initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[2px] text-primary font-semibold mb-4">Тарифы</motion.p>
          <motion.h1 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold mb-4">Выберите свой план</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-8">Одна подписка — доступ ко всем 90+ нейросетям. Без скрытых платежей.</motion.p>

          {/* Period toggle */}
          <motion.div variants={fadeUp} className="inline-flex rounded-full border border-[hsl(var(--border))] p-1">
            <button
              onClick={() => setPeriod("year")}
              className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2", period === "year" ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Год
              <span className="font-mono tabular-nums text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">−18%</span>
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors", period === "month" ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Месяц
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Plan cards */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "relative bg-card border rounded-card p-8 text-left",
                plan.recommended
                  ? "border-primary glow-accent"
                  : "border-border"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6">
                  <StatusBadge variant="top">{plan.badge}</StatusBadge>
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 tracking-tight">{plan.name}</h3>
              <div className="mb-2">
                <span className="font-mono tabular-nums text-sm text-muted-foreground line-through mr-2">{plan.oldPrice}</span>
              </div>
              <div className="mb-4">
                <span className="text-[32px] font-bold font-mono tabular-nums tracking-tight">{period === "year" ? plan.yearPrice : plan.monthPrice}</span>
              </div>
              <p className="text-sm text-primary font-semibold font-mono tabular-nums mb-6">{plan.tokens}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Unlimited models */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Безлимитный доступ:</p>
                {plan.unlimitedModels.map((m) => (
                  <p key={m} className="text-xs text-muted-foreground mb-1">{m}</p>
                ))}
              </div>

              <button
                className={cn(
                  "w-full py-3 rounded-button text-sm font-semibold transition-opacity",
                  plan.recommended
                    ? "gradient-accent text-white hover:opacity-90"
                    : "border border-border hover:bg-muted"
                )}
              >
                Выбрать
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compare toggle */}
      <section className="max-w-5xl mx-auto px-4 pb-8 text-center">
        <button
          onClick={() => setShowCompare(!showCompare)}
          className="px-6 py-3 rounded-button border border-border text-sm font-medium hover:border-primary/30 transition-colors"
        >
          {showCompare ? "Скрыть сравнение" : "Сравнить все тарифы"}
        </button>
      </section>

      {/* Compare table */}
      {showCompare && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-[28px] font-bold mb-8 text-center">Сравнение тарифов</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold sticky left-0 bg-background z-10">Функция</th>
                  {plans.map((p) => (
                    <th key={p.name} className="text-center py-3 px-4 font-semibold">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.label} className={cn("border-b border-border", i % 2 === 0 ? "bg-card/50" : "")}>
                    <td className="py-3 px-4 sticky left-0 bg-inherit z-10">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="text-center py-3 px-4">
                        {typeof v === "boolean" ? (
                          v ? <Check className="h-4 w-4 text-primary mx-auto" /> : <XIcon className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                        ) : (
                          <span className="font-mono font-semibold">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <FAQ />
      <Footer />
    </div>
  );
};

export default PricingPage;
