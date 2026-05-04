import { createFileRoute } from "@tanstack/react-router";
import TextGenerationPage from "@/pages/TextGenerationPage";

export const Route = createFileRoute("/tools/text-generation")({
  component: TextGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация текста — ИИ нейросети | ERA2.ai" },
      { name: "description", content: "ChatGPT, Claude, Gemini, DeepSeek и другие текстовые нейросети. Генерация текста, переводы, анализ документов в одном месте." },
    ],
  }),
});
