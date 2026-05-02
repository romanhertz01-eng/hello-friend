import { createFileRoute } from "@tanstack/react-router";
import CreatePage from "@/pages/CreatePage";

type GenType = "text" | "image" | "video" | "audio";
const GEN_TYPES: GenType[] = ["text", "image", "video", "audio"];

interface CreateSearch {
  type: GenType;
  model: string;
  prompt: string;
}

export const Route = createFileRoute("/create")({
  validateSearch: (raw: Record<string, unknown>): CreateSearch => {
    const t = String(raw.type ?? "image");
    return {
      type: (GEN_TYPES.includes(t as GenType) ? t : "image") as GenType,
      model: typeof raw.model === "string" ? raw.model : "",
      prompt: typeof raw.prompt === "string" ? raw.prompt : "",
    };
  },
  head: () => ({
    meta: [
      { title: "Рабочая зона — ERA2" },
      { name: "description", content: "Рабочая зона генерации ERA2." },
    ],
  }),
  component: CreatePage,
});
