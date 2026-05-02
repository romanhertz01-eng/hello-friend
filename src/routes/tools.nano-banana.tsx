import { createFileRoute } from "@tanstack/react-router";
import NanoBananaPage from "@/pages/NanoBananaPage";

export const Route = createFileRoute("/tools/nano-banana")({
  component: NanoBananaPage,
  head: () => ({
    meta: [
      { title: "Nano Banana 2 — генерация изображений с ИИ | ERA2.ai" },
      { name: "description", content: "Генерация фотореалистичных изображений с Nano Banana 2. Без VPN, с оплатой в рублях. Разрешение до 4K, неизменные персонажи." },
      { property: "og:title", content: "Nano Banana 2 — генерация изображений с ИИ | ERA2.ai" },
      { property: "og:description", content: "Генерация фотореалистичных изображений с Nano Banana 2. Без VPN, с оплатой в рублях. Разрешение до 4K, неизменные персонажи." },
    ],
  }),
});
