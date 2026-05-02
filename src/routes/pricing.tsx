import { createFileRoute } from "@tanstack/react-router";
import PricingPage from "@/pages/PricingPage";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "ERA2.ai — Тарифы" },
      { name: "description", content: "Тарифы ERA2.ai — единая подписка на 90+ нейросетей." },
    ],
  }),
});
