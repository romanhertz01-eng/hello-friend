import { Link } from "@tanstack/react-router";
import { Send, Youtube, Twitter } from "lucide-react";

const productLinks = [
  { label: "Главная", to: "/" },
  { label: "Текст", to: "/tools/text-generation" },
  { label: "Изображения", to: "/tools/image-generation" },
  { label: "Видео", to: "/tools/video-generation" },
  { label: "Аудио", to: "/tools/audio-generation" },
  { label: "Агенты", to: "/tools/agents" },
  { label: "Тарифы", to: "/pricing" },
];

const resourcesLinks = [
  { label: "Документация", to: "#" },
  { label: "История изменений", to: "#" },
  { label: "FAQ", to: "#" },
];

const companyLinks = [
  { label: "О нас", to: "#" },
  { label: "Контакты", to: "#" },
  { label: "Поддержка", to: "#" },
  { label: "Telegram-канал", to: "#" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-[hsl(var(--foreground))] hover:text-[#ff7a3d] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-1">
            <span className="text-[22px] font-bold tracking-tight text-foreground">ERA2</span>
            <span className="font-mono text-sm text-[#ff7a3d]">.ai</span>
          </Link>
          <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))] max-w-[320px] leading-relaxed">
            Все нейросети в одном месте. Единая подписка, оплата в рублях.
          </p>
          <div className="flex gap-2 mt-5">
            {[
              { Icon: Send, label: "Telegram" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Twitter, label: "X" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 inline-flex items-center justify-center rounded-full text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[#ff7a3d] transition-colors"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Продукт" links={productLinks} />
        <FooterColumn title="Ресурсы" links={resourcesLinks} />
        <FooterColumn title="Компания" links={companyLinks} />
      </div>

      <div className="border-t border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            © 2026 ERA2. Все права защищены.
          </span>
          <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
            v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
