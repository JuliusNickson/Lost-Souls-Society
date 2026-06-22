import { useLocale } from "@/lib/locale";

export function LocaleBar() {
  const { locale, loading, formatTime } = useLocale();

  if (loading && !locale) {
    return (
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        · · ·
      </span>
    );
  }
  if (!locale) return null;

  return (
    <span className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-foreground/70 sm:inline-flex">
      <span aria-label="Local time">{formatTime()}</span>
      <span className="h-3 w-px bg-foreground/30" />
      <span aria-label="Detected location">
        {locale.countryCode || locale.country} · {locale.currency}
      </span>
    </span>
  );
}
