import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate({ to: "/" });
  };

  const SocialButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-[15px] font-medium hover:bg-gray-50 transition-colors"
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 md:p-12">
        {/* Logo */}
        <div className="text-center">
          <span className="text-2xl font-bold tracking-tight text-gray-900">ERA2</span>
          <span className="text-sm font-mono font-semibold text-primary">.ai</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mt-6">Войдите в ERA2</h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          90+ нейросетей в одном месте. Без VPN, с оплатой в рублях.
        </p>

        {/* Social buttons */}
        <div className="flex flex-col gap-2.5 mt-8">
          <SocialButton
            label="Telegram"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" fill="#29B6F6"/></svg>}
          />
          <SocialButton
            label="Яндекс"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#FC3F1D"/><text x="8.5" y="16" fontSize="12" fill="white" fontWeight="bold">Я</text></svg>}
          />
          <SocialButton
            label="Google"
            icon={<svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
          />
          <SocialButton
            label="VK"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 13.98h-1.6c-.6 0-.79-.48-1.87-1.58-1-.96-1.4-1.08-1.64-1.08-.34 0-.44.1-.44.56v1.44c0 .4-.13.64-1.18.64-1.74 0-3.67-1.06-5.03-3.02C3.59 10.42 3 8.6 3 8.26c0-.24.1-.46.56-.46h1.6c.42 0 .58.18.74.62.82 2.36 2.18 4.42 2.74 4.42.2 0 .3-.1.3-.62V10.3c-.06-1.08-.62-1.18-.62-1.56 0-.18.16-.38.4-.38h2.52c.36 0 .48.2.48.6v2.4c0 .34.16.46.26.46.2 0 .38-.12.76-.5 1.18-1.32 2.02-3.36 2.02-3.36.12-.24.3-.46.72-.46h1.6c.48 0 .58.24.48.6-.2.9-2.1 3.6-2.1 3.6-.16.28-.22.4 0 .7.16.22.7.68 1.06 1.1.66.76 1.16 1.4 1.3 1.84.14.42-.08.64-.5.64z" fill="#4C75A3"/></svg>}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[13px] text-gray-400">или</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email buttons */}
        <div className="flex gap-2.5">
          <button onClick={handleLogin} className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-[15px] font-medium hover:bg-gray-50 transition-colors">
            ✉ Вход
          </button>
          <button onClick={handleLogin} className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-[15px] font-medium hover:bg-gray-50 transition-colors">
            Регистрация
          </button>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-gray-400 text-center mt-6 leading-relaxed">
          Регистрируясь, вы соглашаетесь с{" "}
          <a href="#" className="underline hover:text-gray-600">обработкой персональных данных</a>{" "}
          и{" "}
          <a href="#" className="underline hover:text-gray-600">условиями использования</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
