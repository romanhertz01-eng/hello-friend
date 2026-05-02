import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ERA2.ai — Агрегатор нейросетей" },
      { name: "description", content: "Единая подписка на ChatGPT, Claude, Midjourney, Sora, ElevenLabs и 90+ других нейросетей. Без VPN, оплата в рублях." },
    ],
  }),
});
