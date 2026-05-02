import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Студии — ERA2" },
      { name: "description", content: "Студии ERA2 — скоро." },
    ],
  }),
  component: StudiosPage,
});

function StudiosPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-semibold text-foreground mb-2">Студии</h1>
      <p className="text-muted-foreground">Скоро.</p>
    </div>
  );
}
