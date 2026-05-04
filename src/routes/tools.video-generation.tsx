import { createFileRoute } from "@tanstack/react-router";
import VideoGenerationPage from "@/pages/VideoGenerationPage";

export const Route = createFileRoute("/tools/video-generation")({
  component: VideoGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация видео — ИИ нейросети | ERA2.ai" },
      { name: "description", content: "Kling, Sora, Seedance, Veo. Генерация видео из текста и изображений." },
    ],
  }),
});
