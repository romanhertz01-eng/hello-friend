import { createFileRoute } from "@tanstack/react-router";
import AudioGenerationPage from "@/pages/AudioGenerationPage";

export const Route = createFileRoute("/tools/audio-generation")({
  component: AudioGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация аудио — ИИ нейросети | ERA2.ai" },
      { name: "description", content: "ElevenLabs, Suno. Озвучка текста, создание музыки, клон голоса." },
    ],
  }),
});
