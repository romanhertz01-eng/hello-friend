import { createFileRoute } from "@tanstack/react-router";
import ToolPage from "@/pages/ToolPage";

export const Route = createFileRoute("/tools/$slug")({
  component: ToolPage,
});
