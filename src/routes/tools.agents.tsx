import { createFileRoute } from "@tanstack/react-router";
import AgentsLandingPage from "@/pages/AgentsLandingPage";

export const Route = createFileRoute("/tools/agents")({
  component: AgentsLandingPage,
  head: () => ({
    meta: [
      { title: "ИИ-агенты и ассистенты | ERA2.ai" },
      { name: "description", content: "44 ИИ-ассистента для образования, бизнеса, маркетинга, разработки, здоровья." },
    ],
  }),
});
