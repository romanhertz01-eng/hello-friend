import type { LucideIcon } from "lucide-react";
import { ModelGlyph } from "@/components/ui/era/ModelGlyph";

export interface WelcomeScenario {
  Icon: LucideIcon;
  title: string;
  desc: string;
  prompt: string;
}

interface Props {
  modelName: string;
  subModelName?: string;
  description?: string;
  scenarios: WelcomeScenario[];
  onScenarioClick: (prompt: string) => void;
}

/**
 * Unified welcome screen for /design /video /audio.
 * Mirrors the look-and-feel of TextPage WelcomeScreen so layout switches feel consistent.
 */
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
        <ModelGlyph name={modelName} size={64} className="mb-5" />
        <h1
          className="text-[28px] font-semibold mb-1 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {modelName}
        </h1>
        {subModelName && (
          <p className="text-[16px] mb-1 font-mono tabular-nums" style={{ color: "var(--text-secondary)" }}>
            {subModelName}
          </p>
        )}
        <p className="text-[14px] mb-8" style={{ color: "var(--text-tertiary)" }}>{description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {scenarios.map((s) => (
            <button
              key={s.title}
              onClick={() => onScenarioClick(s.prompt)}
              className="group p-4 rounded-[16px] text-left transition-all"
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
