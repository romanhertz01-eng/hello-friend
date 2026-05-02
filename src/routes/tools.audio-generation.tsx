import { createFileRoute } from "@tanstack/react-router";
import AudioGenerationPage from "@/pages/AudioGenerationPage";

export const Route = createFileRoute("/tools/audio-generation")({
  component: AudioGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация аудио с помощью ИИ — ERA2.ai" },
      { name: "description", content: "Синтез речи, озвучка, генерация музыки с ElevenLabs и Suno." },
    ],
  }),
});
