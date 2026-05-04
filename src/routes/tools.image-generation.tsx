import { createFileRoute } from "@tanstack/react-router";
import ImageGenerationPage from "@/pages/ImageGenerationPage";

export const Route = createFileRoute("/tools/image-generation")({
  component: ImageGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация изображений — ИИ нейросети | ERA2.ai" },
      { name: "description", content: "MidJourney, Nano Banana, FLUX, Stable Diffusion. Создавайте изображения с помощью лучших нейросетей." },
    ],
  }),
});
