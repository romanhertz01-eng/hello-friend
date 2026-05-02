import { createFileRoute } from "@tanstack/react-router";
import AgentsLandingPage from "@/pages/AgentsLandingPage";

export const Route = createFileRoute("/tools/agents")({
  component: AgentsLandingPage,
  head: () => ({
    meta: [
      { title: "ИИ Агенты и ассистенты — ERA2.ai" },
      { name: "description", content: "Готовые ИИ-ассистенты для бизнеса и творчества." },
    ],
  }),
});
