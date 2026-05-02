import { useState } from "react";
import { Plus, Zap, X, Sparkles, Square, Hash, Gem, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { TwoPanelModelSelector } from "./TwoPanelModelSelector";
import { SegmentedToolbar, SegmentedItem, AttachmentButton } from "@/components/ui/era";
import type { ImageProvider, AdvancedField } from "@/data/imageModels";
import { useState as useStateRef, useRef, useEffect } from "react";

/* ─── Aspect ratio data ─── */
const ASPECT_RATIOS_FULL = [
  { value: "16:9", label: "16:9" }, { value: "9:16", label: "9:16" }, { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" }, { value: "3:4", label: "3:4" },
  { value: "3:2", label: "3:2" }, { value: "2:3", label: "2:3" }, { value: "21:9", label: "21:9" },
  { value: "auto", label: "auto" },
];

/* ─── Inline dropdown (renders below segmented bar) ─── */
function SegmentedDropdown({
  open, onClose, anchor, children,
}: { open: boolean; onClose: () => void; anchor: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        anchor.current && !anchor.current.contains(e.target as Node)
      ) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchor]);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className="absolute top-full mt-2 z-50 min-w-[180px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-1.5 shadow-2xl"
    >
      {children}
    </div>
  );
}

function DropdownOption({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-[10px] text-sm font-mono tabular-nums transition-colors flex items-center justify-between",
        active
          ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
      )}
    >
      {children}
    </button>
  );
}

/* ─── More popup ─── */
function MorePopup({
  open, onClose,
  aspectRatio, onAspectSelect, aspectRatios,
  quantity, onQuantityChange, quantityOptions,
  quality, onQualityChange, qualityOptions,
  fields, styles, advValues, onAdvChange,
}: {
  open: boolean; onClose: () => void;
  aspectRatio: string; onAspectSelect: (r: string) => void; aspectRatios: string[];
  quantity: number; onQuantityChange: (n: number) => void; quantityOptions?: number[];
  quality: string; onQualityChange: (q: string) => void; qualityOptions?: string[];
  fields?: AdvancedField[]; styles?: string[];
  advValues: Record<string, any>; onAdvChange: (key: string, val: any) => void;
}) {
  if (!open) return null;
  const ratios = ASPECT_RATIOS_FULL.filter((r) => aspectRatios.includes(r.value) || r.value === "auto");
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] rounded-[22px] p-5 space-y-5 bg-[hsl(var(--popover))] border border-[hsl(var(--border))] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Параметры</span>
          <button onClick={onClose} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"><X size={16} /></button>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Соотношение сторон</span>
          <div className="grid grid-cols-5 gap-1.5">
            {ratios.map((r) => (
              <button
                key={r.value}
                onClick={() => onAspectSelect(r.value)}
                className={cn(
                  "w-[52px] h-[52px] rounded-[14px] border flex flex-col items-center justify-center gap-1 text-[11px] font-mono tabular-nums transition-colors",
                  aspectRatio === r.value
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"
                    : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))]"
                )}
              >
                <AspectIcon ratio={r.value} active={aspectRatio === r.value} />
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {quantityOptions && quantityOptions.length > 1 && (
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Количество</span>
            <div className="flex gap-1.5">
              {quantityOptions.map((q) => (
                <button
                  key={q}
                  onClick={() => onQuantityChange(q)}
                  className={cn(
                    "w-[44px] h-9 rounded-[10px] border text-sm font-mono tabular-nums font-medium transition-colors",
                    quantity === q
                      ? "border-transparent text-white gradient-accent"
                      : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                  )}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {qualityOptions && qualityOptions.length > 0 && (
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Разрешение</span>
            <div className="flex gap-1.5">
              {qualityOptions.map((q) => (
                <button
                  key={q}
                  onClick={() => onQualityChange(q)}
                  className={cn(
                    "px-4 h-9 rounded-[10px] border text-sm font-mono tabular-nums font-medium transition-colors",
                    quality === q
                      ? "border-transparent text-white gradient-accent"
                      : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                  )}
                >
                  {q.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {fields?.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">{f.label}</span>
            {f.type === "slider" && (
              <div className="flex items-center gap-3">
                <input type="range" min={f.min} max={f.max} value={advValues[f.key] ?? f.default ?? f.min} onChange={(e) => onAdvChange(f.key, Number(e.target.value))} className="flex-1 accent-[hsl(var(--primary))]" />
                <span className="text-sm font-mono tabular-nums w-8 text-right text-[hsl(var(--foreground))]">{advValues[f.key] ?? f.default}</span>
              </div>
            )}
            {f.type === "input" && (
              <input type="number" value={advValues[f.key] ?? ""} onChange={(e) => onAdvChange(f.key, e.target.value)} placeholder="Случайный" className="w-full rounded-[10px] px-3 py-2 text-sm font-mono tabular-nums bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))]" />
            )}
          </div>
        ))}

        {styles && styles.length > 0 && (
          <div className="space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Стиль</span>
            <div className="grid grid-cols-3 gap-1.5">
              {styles.map((s) => (
                <button key={s} onClick={() => onAdvChange("style", s)} className={cn("px-3 py-2 rounded-[10px] text-xs border transition-colors", advValues.style === s ? "border-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-[hsl(var(--primary))]" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AspectIcon({ ratio, active }: { ratio: string; active: boolean }) {
  const color = active ? "hsl(var(--primary))" : "currentColor";
  const sizes: Record<string, [number, number]> = {
    "16:9": [22, 14], "9:16": [14, 22], "1:1": [18, 18], "4:3": [20, 16],
    "3:4": [16, 20], "3:2": [20, 14], "2:3": [14, 20], "21:9": [24, 10], "auto": [18, 18],
  };
  const [w, h] = sizes[ratio] || [18, 18];
  return (
    <svg width={20} height={20} viewBox="0 0 24 24">
      <rect x={(24 - w) / 2} y={(24 - h) / 2} width={w} height={h} rx={2} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

/* ─── Provider icon (inline svg-rendered single emoji-mapped) ─── */
function ProviderIcon({ icon }: { icon?: string }) {
  // Map known emojis to lucide-like inline letters; fallback dot
  if (!icon) return <Square className="w-3.5 h-3.5" />;
  // Use the provider's emoji as small text (since data is emoji-based)
  return <span className="inline-block text-[14px] leading-none">{icon}</span>;
}

/* ─── Main Image PromptBlock ─── */

interface PromptBlockImageProps {
  prompt: string;
  onPromptChange: (v: string) => void;
  providers: ImageProvider[];
  selectedProviderId: string;
  selectedSubModelId: string;
  onModelSelect: (providerId: string, subModelId: string) => void;
  aspectRatio: string;
  onAspectSelect: (r: string) => void;
  quantity: number;
  onQuantityChange: (n: number) => void;
  quality: string;
  onQualityChange: (q: string) => void;
  turbo: boolean;
  onTurboToggle: () => void;
  onGenerate: () => void;
}

export function PromptBlock({
  prompt, onPromptChange,
  providers, selectedProviderId, selectedSubModelId, onModelSelect,
  aspectRatio, onAspectSelect,
  quantity, onQuantityChange,
  quality, onQualityChange,
  turbo, onTurboToggle,
  onGenerate,
}: PromptBlockImageProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [advValues, setAdvValues] = useStateRef<Record<string, any>>({});

  // Per-segment dropdown state
  const [openDD, setOpenDD] = useState<null | "aspect" | "qty" | "quality">(null);
  const aspectRef = useRef<HTMLDivElement>(null);
  const qtyRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);

  const provider = providers.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const credits = subModel?.credits ?? 0;

  if (!provider) return null;

  const selectorProviders = providers.map((p) => ({
    id: p.id, name: p.name, icon: p.icon, badge: p.badge,
    subModels: p.subModels.map((s) => ({
      id: s.id, name: s.name, credits: s.credits, isNew: s.isNew, isDefault: s.isDefault, badge: s.badge,
      desc: s.desc, time: s.time,
    })),
  }));

  return (
    <>
      <div
        className="rounded-[22px] rounded-tl-none border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 w-full transition-all duration-200 has-[textarea:focus]:border-[hsl(var(--primary))] has-[textarea:focus]:shadow-[0_0_0_3px_rgba(232,84,32,0.12),0_1px_4px_rgba(0,0,0,0.2)]"
      >
        {/* Row 1: attachment + textarea */}
        <div className="flex items-start gap-3 mb-3">
          <AttachmentButton current={0} max={provider.maxUploads} />
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Введите свою идею для генерации"
            rows={4}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] resize-none min-h-[120px] py-3 px-1 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] placeholder:opacity-60"
          />
        </div>

        {/* Row 2: segmented toolbar + generate */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Model selector — kept as standalone capsule (rich UI) */}
          <TwoPanelModelSelector
            providers={selectorProviders}
            selectedProviderId={selectedProviderId}
            selectedSubModelId={selectedSubModelId}
            onSelect={onModelSelect}
          />

          {/* Segmented bar: aspect / qty / quality / turbo / more */}
          <SegmentedToolbar>
            {/* Aspect ratio */}
            <div ref={aspectRef} className="relative inline-flex">
              <SegmentedItem
                icon={<Square />}
                label={<span className="font-mono tabular-nums">{aspectRatio}</span>}
                active={openDD === "aspect"}
                onClick={() => setOpenDD(openDD === "aspect" ? null : "aspect")}
              />
              <SegmentedDropdown open={openDD === "aspect"} onClose={() => setOpenDD(null)} anchor={aspectRef}>
                {provider.aspectRatios.map((r) => (
                  <DropdownOption key={r} active={aspectRatio === r} onClick={() => { onAspectSelect(r); setOpenDD(null); }}>
                    <span>{r}</span>
                    {aspectRatio === r && <span className="text-[hsl(var(--primary))]">✓</span>}
                  </DropdownOption>
                ))}
              </SegmentedDropdown>
            </div>

            {/* Quantity */}
            {provider.quantityOptions && provider.quantityOptions.length > 1 && (
              <div ref={qtyRef} className="relative inline-flex">
                <SegmentedItem
                  icon={<Hash />}
                  label={<span className="font-mono tabular-nums">{quantity}</span>}
                  active={openDD === "qty"}
                  onClick={() => setOpenDD(openDD === "qty" ? null : "qty")}
                />
                <SegmentedDropdown open={openDD === "qty"} onClose={() => setOpenDD(null)} anchor={qtyRef}>
                  {provider.quantityOptions.map((q) => (
                    <DropdownOption key={q} active={quantity === q} onClick={() => { onQuantityChange(q); setOpenDD(null); }}>
                      <span>{q}</span>
                      {quantity === q && <span className="text-[hsl(var(--primary))]">✓</span>}
                    </DropdownOption>
                  ))}
                </SegmentedDropdown>
              </div>
            )}

            {/* Quality */}
            {provider.qualityOptions && provider.qualityOptions.length > 0 && (
              <div ref={qualityRef} className="relative inline-flex">
                <SegmentedItem
                  icon={<Gem />}
                  label={<span className="font-mono tabular-nums uppercase">{quality}</span>}
                  active={openDD === "quality"}
                  onClick={() => setOpenDD(openDD === "quality" ? null : "quality")}
                />
                <SegmentedDropdown open={openDD === "quality"} onClose={() => setOpenDD(null)} anchor={qualityRef}>
                  {provider.qualityOptions.map((q) => (
                    <DropdownOption key={q} active={quality === q} onClick={() => { onQualityChange(q); setOpenDD(null); }}>
                      <span className="uppercase">{q}</span>
                      {quality === q && <span className="text-[hsl(var(--primary))]">✓</span>}
                    </DropdownOption>
                  ))}
                </SegmentedDropdown>
              </div>
            )}

            {/* Turbo toggle */}
            {provider.hasTurbo && (
              <SegmentedItem
                icon={<Zap />}
                label={<span className="font-mono tabular-nums">{turbo ? "ON" : "OFF"}</span>}
                active={turbo}
                onClick={onTurboToggle}
                trailing={null}
              />
            )}

            {/* More */}
            <SegmentedItem
              icon={<MoreHorizontal />}
              label={null}
              onClick={() => setMoreOpen(true)}
              trailing={null}
            />
          </SegmentedToolbar>

          {/* Generate button */}
          <button
            onClick={onGenerate}
            disabled={!prompt.trim()}
            className="ml-auto inline-flex items-center gap-1.5 px-5 h-10 rounded-full gradient-accent text-white text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" /> Генерировать
            <span className="inline-flex items-center gap-1 ml-1 font-mono tabular-nums">
              <Zap className="w-3 h-3" /> {credits}
            </span>
          </button>
        </div>
      </div>

      <MorePopup
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        aspectRatio={aspectRatio}
        onAspectSelect={onAspectSelect}
        aspectRatios={provider.aspectRatios}
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        quantityOptions={provider.quantityOptions}
        quality={quality}
        onQualityChange={onQualityChange}
        qualityOptions={provider.qualityOptions}
        fields={provider.advancedFields}
        styles={provider.styles}
        advValues={advValues}
        onAdvChange={(k, v) => setAdvValues((prev) => ({ ...prev, [k]: v }))}
      />
    </>
  );
}
