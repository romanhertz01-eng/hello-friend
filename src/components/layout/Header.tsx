import { Link } from "@tanstack/react-router";
import { Bell, Clock, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { UserDropdown } from "./UserDropdown";
import { NavMegaMenu } from "./NavMegaMenu";
import { PROMO_ACTIVE, PROMO_LABEL, PROMO_TEXT } from "@/config/promo";

interface HeaderProps {
  onToggleSidebar: () => void;
  showBurger?: boolean;
}

const iconBtn =
  "relative w-9 h-9 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors flex items-center justify-center";

export function Header({ onToggleSidebar, showBurger = true }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthed } = useAuth();
  const { setOpen } = useCommandPalette();

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 md:px-6 bg-background/85 backdrop-blur-md border-b border-border" style={{ height: "var(--header-height)" }}>
      {/* Left: burger + logo */}
      <div className="flex items-center gap-3">
        {showBurger && isAuthed && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Меню"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="flex items-center justify-center font-bold text-white select-none"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #E85420, #ff7a3d)",
              fontSize: 18,
              letterSpacing: "-0.02em",
              boxShadow: "0 2px 8px rgba(232, 84, 32, 0.3)",
            }}
          >
            E
          </span>
          <span className="text-[20px] font-semibold tracking-tight" style={{ color: "var(--c-fg)" }}>
            era<span style={{ color: "var(--c-accent-2)" }}>2</span>
            <span className="font-mono text-[13px] font-normal ml-0.5" style={{ color: "var(--c-fg-mute)" }}>.ai</span>
          </span>
        </Link>
      </div>

      {/* Center: mega menu */}
      <div className="flex-1 flex justify-center">
        <NavMegaMenu />
      </div>

      {/* Right: utility cluster */}
      <div className="flex items-center gap-2">
        {/* ⌘K search */}
        <button
          onClick={() => setOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 h-9 px-3 bg-secondary border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Поиск моделей</span>
          <span className="bg-card rounded-md px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">⌘K</span>
        </button>

        {/* History */}
        <Link
          to="/history"
          className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Clock className="h-3.5 w-3.5" />
          История
        </Link>

        {/* Promo */}
        {PROMO_ACTIVE && (
          <Link
            to="/pricing"
            className="hidden md:inline-flex items-center gap-2 h-9 px-3 bg-[hsl(var(--accent))] border border-primary/30 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px var(--c-accent)" }}
            />
            <span className="font-mono tabular-nums text-primary">{PROMO_LABEL}</span>
            <span className="text-foreground">{PROMO_TEXT}</span>
          </Link>
        )}

        {/* Bell */}
        {isAuthed && (
          <button className={iconBtn} aria-label="Уведомления">
            <Bell className="h-4 w-4" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"
              style={{ boxShadow: "0 0 6px var(--c-accent)" }}
            />
          </button>
        )}

        {/* Theme */}
        <button onClick={toggleTheme} className={iconBtn} aria-label="Переключить тему">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Avatar / auth */}
        {isAuthed ? (
          <UserDropdown />
        ) : (
          <Link
            to="/auth"
            className="inline-flex items-center h-9 px-4 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-[#ff7a3d] transition-colors"
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}
