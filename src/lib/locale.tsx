import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type LocaleData = {
  country: string;
  countryCode: string;
  city?: string;
  currency: string; // ISO code, e.g. EUR
  currencySymbol: string;
  timezone: string;
  rateFromUsd: number; // 1 USD -> rateFromUsd in `currency`
};

type LocaleContextValue = {
  locale: LocaleData | null;
  loading: boolean;
  now: Date;
  convert: (usd: number) => string;
  formatTime: () => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "lss-locale-v1";
const STORAGE_TTL = 1000 * 60 * 60 * 12; // 12h

const SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", KRW: "₩", INR: "₹",
  RUB: "₽", TRY: "₺", BRL: "R$", AUD: "A$", CAD: "C$", CHF: "CHF",
  SEK: "kr", NOK: "kr", DKK: "kr", PLN: "zł", CZK: "Kč", HUF: "Ft",
  GEL: "₾", UAH: "₴", AED: "د.إ", SAR: "﷼", ILS: "₪", MXN: "MX$",
  ZAR: "R", SGD: "S$", HKD: "HK$", NZD: "NZ$", THB: "฿", IDR: "Rp",
  PHP: "₱", MYR: "RM", VND: "₫",
};

async function fetchLocale(): Promise<LocaleData> {
  const geo = await fetch("https://ipapi.co/json/").then((r) => r.json());
  const currency: string = geo.currency || "USD";
  let rate = 1;
  if (currency !== "USD") {
    try {
      const fx = await fetch(`https://open.er-api.com/v6/latest/USD`).then((r) => r.json());
      if (fx?.rates?.[currency]) rate = fx.rates[currency];
    } catch {}
  }
  return {
    country: geo.country_name || "Unknown",
    countryCode: geo.country_code || "",
    city: geo.city,
    currency,
    currencySymbol: SYMBOLS[currency] ?? currency + " ",
    timezone: geo.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    rateFromUsd: rate,
  };
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let cancelled = false;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { ts: number; data: LocaleData };
        if (Date.now() - parsed.ts < STORAGE_TTL) {
          setLocale(parsed.data);
          setLoading(false);
          return;
        }
      }
    } catch {}

    fetchLocale()
      .then((data) => {
        if (cancelled) return;
        setLocale(data);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data }));
        } catch {}
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const convert = (usd: number) => {
      if (!locale || locale.currency === "USD") return `$${Math.round(usd)}`;
      const converted = usd * locale.rateFromUsd;
      const rounded =
        converted >= 1000 ? Math.round(converted / 10) * 10 : Math.round(converted);
      return `${locale.currencySymbol}${rounded.toLocaleString()}`;
    };
    const formatTime = () => {
      const tz = locale?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      try {
        return new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
          hour12: false,
        }).format(now);
      } catch {
        return "";
      }
    };
    return { locale, loading, now, convert, formatTime };
  }, [locale, loading, now]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
