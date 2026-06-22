import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Lost Souls Society" },
      { name: "description", content: "Complete your order. Shipping worldwide." },
      { property: "og:title", content: "Checkout — Lost Souls Society" },
    ],
  }),
  component: CheckoutPage,
});

// Hardcoded promo codes
const PROMOS: Record<string, { off: number; label: string }> = {
  LOSTSOULS10: { off: 0.1, label: "10% OFF" },
  AFTERHOURS: { off: 0.15, label: "15% OFF" },
  MIDNIGHT25: { off: 0.25, label: "25% OFF" },
};

type Suggestion = {
  display_name: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    state?: string;
  };
};

function CheckoutPage() {
  const { items, subtotal, clear, setQty, remove } = useCart();
  const { convert, locale } = useLocale();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    postcode: "",
    country: "",
    phone: "",
    shipping: "standard" as "standard" | "express",
  });
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ code: string; off: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  // Address autocomplete
  const [addrSuggestions, setAddrSuggestions] = useState<Suggestion[]>([]);
  const [addrOpen, setAddrOpen] = useState(false);
  const addrAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!form.address || form.address.length < 3) {
      setAddrSuggestions([]);
      return;
    }
    const t = setTimeout(async () => {
      addrAbort.current?.abort();
      const ctrl = new AbortController();
      addrAbort.current = ctrl;
      try {
        const r = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
            form.address,
          )}`,
          { signal: ctrl.signal, headers: { Accept: "application/json" } },
        );
        const data: Suggestion[] = await r.json();
        setAddrSuggestions(data);
        setAddrOpen(true);
      } catch {}
    }, 350);
    return () => clearTimeout(t);
  }, [form.address]);

  const pickSuggestion = (s: Suggestion) => {
    const a = s.address || {};
    const street = [a.house_number, a.road].filter(Boolean).join(" ") || s.display_name.split(",")[0];
    setForm((f) => ({
      ...f,
      address: street,
      city: a.city || a.town || a.village || f.city,
      postcode: a.postcode || f.postcode,
      country: a.country || f.country,
    }));
    setAddrOpen(false);
  };

  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0;
    return form.shipping === "express" ? 35 : 15;
  }, [form.shipping, items.length]);

  const discount = useMemo(
    () => (promo ? Math.round(subtotal * promo.off) : 0),
    [promo, subtotal],
  );

  const tax = useMemo(() => Math.round((subtotal - discount) * 0.08), [subtotal, discount]);
  const total = subtotal - discount + shippingCost + tax;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const found = PROMOS[code];
    if (!found) {
      setPromoError("Invalid code");
      setPromo(null);
      return;
    }
    setPromo({ code, ...found });
    setPromoError("");
    toast.success(`Promo applied — ${found.label}`);
  };

  const removePromo = () => {
    setPromo(null);
    setPromoInput("");
  };

  const canPlace =
    items.length > 0 &&
    form.email &&
    form.firstName &&
    form.lastName &&
    form.address &&
    form.city &&
    form.postcode &&
    form.country;

  const placeOrder = async () => {
    if (!canPlace) {
      toast.error("Fill in all required fields");
      return;
    }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const id = "LSS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setConfirmed(id);
    clear();
    setPlacing(false);
  };

  if (confirmed) {
    return (
      <Layout>
        <section className="px-6 pt-40 pb-32 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-eyebrow text-blood">Order confirmed</span>
            <h1 className="mt-6 font-display text-melt text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
              Your soul is on its way
            </h1>
            <p className="mt-6 font-serif text-lg italic text-muted-foreground">
              Order #{confirmed} — confirmation sent to {form.email}
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <Link
                to="/shop"
                className="text-eyebrow border border-border px-8 py-3 transition-colors hover:bg-foreground hover:text-background"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <section className="px-6 pt-40 pb-32 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
              Cart is empty
            </h1>
            <p className="mt-6 font-serif text-lg italic text-muted-foreground">
              Nothing to check out — yet.
            </p>
            <Link
              to="/shop"
              className="text-eyebrow mt-10 inline-flex border border-border px-8 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Go to shop
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const field = "w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors";
  const label = "text-eyebrow text-muted-foreground mb-2 block";

  return (
    <Layout>
      <section className="px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="text-eyebrow text-blood">Checkout</span>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl">
            Final rites
          </h1>

          <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_420px]">
            {/* Left: form */}
            <div className="space-y-12">
              {/* Contact */}
              <div>
                <h2 className="text-eyebrow mb-6 border-b border-border pb-3">01 — Contact</h2>
                <div>
                  <label className={label}>Email *</label>
                  <input
                    type="email"
                    className={field}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                  />
                </div>
                <div className="mt-4">
                  <label className={label}>Phone</label>
                  <input
                    type="tel"
                    className={field}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 555 0100"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-eyebrow mb-6 border-b border-border pb-3">02 — Shipping address</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={label}>First name *</label>
                    <input
                      className={field}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={label}>Last name *</label>
                    <input
                      className={field}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 relative">
                    <label className={label}>Address *</label>
                    <input
                      className={field}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      onFocus={() => addrSuggestions.length && setAddrOpen(true)}
                      onBlur={() => setTimeout(() => setAddrOpen(false), 150)}
                      placeholder="Start typing to search…"
                      autoComplete="off"
                    />
                    {addrOpen && addrSuggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto border border-border bg-background shadow-lg">
                        {addrSuggestions.map((s, i) => (
                          <li key={i}>
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => pickSuggestion(s)}
                              className="block w-full px-4 py-3 text-left text-xs text-foreground transition-colors hover:bg-foreground hover:text-background"
                            >
                              {s.display_name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Powered by OpenStreetMap
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className={label}>Apartment, suite (optional)</label>
                    <input
                      className={field}
                      value={form.apt}
                      onChange={(e) => setForm({ ...form, apt: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={label}>City *</label>
                    <input
                      className={field}
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={label}>Postal code *</label>
                    <input
                      className={field}
                      value={form.postcode}
                      onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={label}>Country *</label>
                    <input
                      className={field}
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping method */}
              <div>
                <h2 className="text-eyebrow mb-6 border-b border-border pb-3">03 — Shipping method</h2>
                <div className="space-y-3">
                  {[
                    { id: "standard", label: "Standard", time: "5–9 business days", cost: 15 },
                    { id: "express", label: "Express", time: "2–3 business days", cost: 35 },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center justify-between border px-4 py-4 transition-colors ${
                        form.shipping === opt.id ? "border-foreground" : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          checked={form.shipping === opt.id}
                          onChange={() => setForm({ ...form, shipping: opt.id as "standard" | "express" })}
                          className="accent-foreground"
                        />
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{opt.time}</p>
                        </div>
                      </div>
                      <span className="font-sans font-bold">${opt.cost}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment placeholder */}
              <div>
                <h2 className="text-eyebrow mb-6 border-b border-border pb-3">04 — Payment</h2>
                <div className="border border-border p-6 text-center">
                  <p className="font-serif italic text-muted-foreground">
                    Demo checkout — no card is charged. Connect Shopify or Stripe to enable real payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="border border-border p-6">
                <h2 className="text-eyebrow mb-6 border-b border-border pb-3">Order — {items.length} {items.length === 1 ? "item" : "items"}</h2>

                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.size}`} className="flex gap-3 py-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-border">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <p className="truncate text-xs font-medium">{item.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Size {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border text-xs">
                            <button onClick={() => setQty(item.slug, item.size, item.qty - 1)} className="px-2 py-0.5 hover:bg-foreground hover:text-background">−</button>
                            <span className="px-2">{item.qty}</span>
                            <button onClick={() => setQty(item.slug, item.size, item.qty + 1)} className="px-2 py-0.5 hover:bg-foreground hover:text-background">+</button>
                          </div>
                          <span className="font-sans text-sm font-bold">${item.price * item.qty}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Promo */}
                <div className="mt-6 border-t border-border pt-6">
                  <label className={label}>Promo code</label>
                  {promo ? (
                    <div className="flex items-center justify-between border border-foreground px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{promo.code}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{promo.label}</p>
                      </div>
                      <button onClick={removePromo} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        className={field}
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPromo())}
                        placeholder="ENTER CODE"
                      />
                      <button
                        type="button"
                        onClick={applyPromo}
                        className="text-eyebrow shrink-0 border border-border px-5 transition-colors hover:bg-foreground hover:text-background"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && <p className="mt-2 text-xs text-blood">{promoError}</p>}
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Try LOSTSOULS10 · AFTERHOURS · MIDNIGHT25
                  </p>
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
                  <Row label="Subtotal" value={`$${subtotal}`} />
                  {discount > 0 && <Row label={`Discount (${promo?.code})`} value={`−$${discount}`} accent />}
                  <Row label="Shipping" value={`$${shippingCost}`} />
                  <Row label="Tax (est.)" value={`$${tax}`} />
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
                  <span className="text-eyebrow">Total</span>
                  <div className="text-right">
                    <span className="font-sans text-3xl font-bold">${total}</span>
                    {locale && locale.currency !== "USD" && (
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        ≈ {convert(total)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={!canPlace || placing}
                  className="text-eyebrow mt-6 w-full bg-foreground py-4 text-background transition-opacity hover:opacity-80 disabled:opacity-40"
                >
                  {placing ? "Processing…" : "Place order"}
                </button>
                <button
                  onClick={() => navigate({ to: "/shop" })}
                  className="mt-3 w-full text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                >
                  ← Back to shop
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-blood" : "text-foreground"}>{value}</span>
    </div>
  );
}
