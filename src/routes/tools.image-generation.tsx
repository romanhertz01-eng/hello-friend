import { createFileRoute } from "@tanstack/react-router";
import ImageGenerationPage from "@/pages/ImageGenerationPage";

export const Route = createFileRoute("/tools/image-generation")({
  component: ImageGenerationPage,
  head: () => ({
    meta: [
      { title: "Генерация изображений с помощью ИИ — ERA2.ai" },
      { name: "description", content: "9 нейросетей для создания изображений — от фотореализма до арта. Без VPN, с оплатой в рублях." },
    ],
  }),
});
