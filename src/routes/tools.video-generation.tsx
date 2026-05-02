import { createFileRoute } from "@tanstack/react-router";
import VideoGenerationPage from "@/pages/VideoGenerationPage";

export const Route = createFileRoute("/tools/video-generation")({
  component: VideoGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация видео с помощью ИИ — ERA2.ai" },
      { name: "description", content: "7 нейросетей для создания видео. Kling, Seedance, Veo, Sora и другие." },
    ],
  }),
});
