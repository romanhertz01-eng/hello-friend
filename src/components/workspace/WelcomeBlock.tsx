import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ModelGlyph } from "@/components/ui/era/ModelGlyph";

export interface WelcomeScenario {
  Icon: LucideIcon;
  title: string;
  desc: string;
  prompt: string;
  // Preset fields (optional)
  providerId?: string;
  subModelId?: string;
  aspect?: string;
  quality?: string;
  quantity?: number;
  duration?: string;
  resolution?: string;
}

interface Props {
  modelName: string;
  subModelName?: string;
  description?: string;
  scenarios: WelcomeScenario[];
  onScenarioClick: (scenario: WelcomeScenario) => void;
}

export function WelcomeBlock({
  modelName,
  subModelName,
  description = "Единый доступ к 90+ нейросетям",
  scenarios,
  onScenarioClick,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height,64px)-180px)] px-4 py-12">
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <ModelGlyph name={modelName} size={64} className="mb-5" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="text-[28px] font-semibold mb-1 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {modelName}
        </motion.h1>
        {subModelName && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="text-[16px] mb-1 font-mono tabular-nums"
            style={{ color: "var(--text-secondary)" }}
          >
            {subModelName}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="text-[14px] mb-8"
          style={{ color: "var(--text-tertiary)" }}
        >
          {description}
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
          }}
        >
          {scenarios.map((s) => (
            <motion.button
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onScenarioClick(s)}
              className="group p-4 rounded-[14px] text-left transition-colors"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.background = "var(--bg-card-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-primary)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-2.5"
                style={{ background: "rgba(232, 84, 32, 0.12)" }}
              >
                <s.Icon className="w-[18px] h-[18px]" style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div className="text-[15px] font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{s.title}</div>
              <div className="text-[13px] leading-snug line-clamp-2" style={{ color: "var(--text-secondary)" }}>{s.desc}</div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
