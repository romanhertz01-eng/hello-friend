import { createFileRoute } from "@tanstack/react-router";
import TextGenerationPage from "@/pages/TextGenerationPage";

export const Route = createFileRoute("/tools/text-generation")({
  component: TextGenerationPage,
  head: () => ({
    meta: [
      { title: "Текстовые нейросети — ChatGPT, Claude, Gemini — ERA2.ai" },
      { name: "description", content: "6 провайдеров, 15+ моделей для работы с текстом. Единая подписка без VPN." },
    ],
  }),
});
