import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">Запрашиваемая страница не существует.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ERA2.ai — Агрегатор нейросетей" },
      { name: "description", content: "Единая подписка на 90+ нейросетей. Без VPN, оплата в рублях." },
      { property: "og:title", content: "ERA2.ai — Агрегатор нейросетей" },
      { property: "og:description", content: "Единая подписка на 90+ нейросетей. Без VPN, оплата в рублях." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "ERA2.ai — Агрегатор нейросетей" },
      { name: "twitter:description", content: "Единая подписка на 90+ нейросетей. Без VPN, оплата в рублях." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c2c7b508-753d-4918-a0a4-29d196f418ee/id-preview-63512518--b3e3b6fa-e6be-4fc4-8c8e-4cb4a2544096.lovable.app-1776079340512.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c2c7b508-753d-4918-a0a4-29d196f418ee/id-preview-63512518--b3e3b6fa-e6be-4fc4-8c8e-4cb4a2544096.lovable.app-1776079340512.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Layout>
            <Outlet />
          </Layout>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
