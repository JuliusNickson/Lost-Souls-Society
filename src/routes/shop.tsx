import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { getProducts } from "@/lib/api/products.functions";
import { getVariantForSize, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { toast } from "sonner";

export const Route = createFileRoute("/shop")({
  loader: () => getProducts(),
  head: () => ({
    meta: [
      { title: "Shop — After Hours Zip Hoodie — Lost Souls Society" },
      {
        name: "description",
        content:
          "After Hours Zip Hoodie. Four pigment-dyed colorways, limited to 80 each. Lost Souls Society — Tbilisi & New York.",
      },
      { property: "og:title", content: "Shop — Lost Souls Society" },
      {
        property: "og:description",
        content: "Limited drops. Uniforms for the lost.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { products } = Route.useLoaderData();
  const { add } = useCart();
  const { convert, locale } = useLocale();
  const [selectedSlug, setSelectedSlug] = useState(products[0]?.slug ?? "");
  const [size, setSize] = useState("M");
  const detailRef = useRef<HTMLDivElement | null>(null);

  const selected =
    products.find((p) => p.slug === selectedSlug) ?? products[0];

  const sizeOptions = useMemo(() => {
    if (!selected?.variants?.length) return ["XS", "S", "M", "L", "XL"];
    return selected.variants.map((v) => v.size);
  }, [selected]);

  const selectAndScroll = (slug: string) => {
    setSelectedSlug(slug);
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleAdd = (product: Product = selected, chosenSize = size) => {
    if (!product || product.soldOut) return;
    const variant = getVariantForSize(product, chosenSize);
    if (variant && !variant.available) {
      toast.error(`Size ${chosenSize} is sold out`);
      return;
    }
    add({
      slug: product.slug,
      name: product.name,
      detail: product.detail,
      price: variant?.price ?? product.price,
      image: product.image,
      size: chosenSize,
      variantId: variant?.variantId,
    });
    toast(`Added — ${product.name}`, {
      description: `${product.colorway ?? ""} · Size ${chosenSize}`,
    });
  };

  if (!selected) {
    return (
      <Layout>
        <section className="px-6 pt-40 pb-32 md:px-10">
          <p className="text-muted-foreground">No products available.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="px-6 pt-40 pb-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="text-eyebrow text-muted-foreground">Archive 003 — Current</span>
          <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-8xl">
            After Hours
            <br />
            SS26
          </h1>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            One garment, four rituals. {products.length} pigment-dyed colorways of the After Hours Zip Hoodie — each limited to 80, hand-finished, never restocked.
          </p>
        </div>
      </section>

      <section className="border-b border-border px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto py-6">
          <span className="text-eyebrow shrink-0 text-foreground">Outerwear</span>
          <span className="text-eyebrow ml-auto shrink-0 text-muted-foreground">
            {products.length} colorways
          </span>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-4 md:gap-x-6">
          {products.map((p) => (
            <button
              type="button"
              key={p.slug}
              onClick={() => selectAndScroll(p.slug)}
              className="group block text-left"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.colorway}`}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-contain transition-all duration-1000 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-medium tracking-wide">{p.colorway}</h2>
                  <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.code}
                  </p>
                </div>
                <span className="shrink-0 text-right font-sans text-base font-bold text-foreground">
                  {p.soldOut ? (
                    <span className="text-muted-foreground">SOLD OUT</span>
                  ) : (
                    <>
                      ${p.price}
                      {locale && locale.currency !== "USD" && (
                        <span className="block text-[10px] not-italic uppercase tracking-[0.2em] text-muted-foreground">
                          ≈ {convert(p.price)}
                        </span>
                      )}
                    </>
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section ref={detailRef} className="scroll-mt-24 border-t border-border px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="text-eyebrow text-muted-foreground">Specimen — {selected.code}</span>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="overflow-hidden">
                <img
                  src={selected.image}
                  alt={`${selected.name} — ${selected.colorway}`}
                  width={1200}
                  height={1500}
                  className="aspect-[4/5] w-full object-contain"
                />
              </div>
            </div>
            <div className="md:col-span-5 md:pt-8">
              <h2 className="font-display text-4xl uppercase tracking-tight md:text-5xl">
                {selected.name}
              </h2>
              <p className="mt-3 text-eyebrow text-muted-foreground">{selected.detail}</p>
              <p className="mt-6 font-sans text-3xl font-bold text-foreground">
                {selected.soldOut ? (
                  <span className="text-muted-foreground">SOLD OUT</span>
                ) : (
                  <>
                    ${selected.price}
                    {locale && locale.currency !== "USD" && (
                      <span className="ml-3 text-sm not-italic uppercase tracking-[0.2em] text-muted-foreground">
                        ≈ {convert(selected.price)}
                      </span>
                    )}
                  </>
                )}
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <span className="text-eyebrow block text-muted-foreground">Colorway</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {products.map((p) => {
                      const active = p.slug === selected.slug;
                      return (
                        <button
                          key={p.slug}
                          disabled={p.soldOut}
                          onClick={() => setSelectedSlug(p.slug)}
                          className={`text-eyebrow flex h-12 items-center justify-center border px-4 transition-colors ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : p.soldOut
                                ? "cursor-not-allowed border-border text-muted-foreground line-through"
                                : "border-border text-foreground hover:border-foreground"
                          }`}
                        >
                          {p.colorway}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="text-eyebrow block text-muted-foreground">Size</span>
                  <div className="mt-3 flex gap-2">
                    {sizeOptions.map((s) => {
                      const active = s === size;
                      const variant = getVariantForSize(selected, s);
                      const unavailable = variant ? !variant.available : false;
                      return (
                        <button
                          key={s}
                          disabled={unavailable}
                          onClick={() => setSize(s)}
                          className={`text-eyebrow flex h-12 w-12 items-center justify-center border transition-colors ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : unavailable
                                ? "cursor-not-allowed border-border text-muted-foreground line-through"
                                : "border-border text-foreground hover:border-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleAdd()}
                  disabled={selected.soldOut}
                  className={`text-eyebrow w-full py-4 transition-opacity ${
                    selected.soldOut
                      ? "cursor-not-allowed border border-border bg-transparent text-muted-foreground"
                      : "bg-foreground text-background hover:opacity-80"
                  }`}
                >
                  {selected.soldOut ? "Sold Out" : `Add to Cart — $${selected.price}`}
                </button>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {selected.soldOut ? "◉ Fully sold out — never restocked" : `◉ Limited to ${selected.limited} — ships from Tbilisi`}
                </p>

                <div className="space-y-4 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
                  <div>
                    <span className="text-eyebrow block text-foreground">Materials</span>
                    <p className="mt-2">100% organic cotton, 380gsm fleece. Pigment-dyed for a natural fade over time.</p>
                  </div>
                  <div>
                    <span className="text-eyebrow block text-foreground">Shipping</span>
                    <p className="mt-2">Worldwide. 5–10 business days. All artifacts dispatched from Tbilisi.</p>
                  </div>
                  <div>
                    <span className="text-eyebrow block text-foreground">The Drop</span>
                    <p className="mt-2">
                      Part of {selected.drop}. Once sold, this piece will not return.{" "}
                      <Link to="/lookbook" className="link-melt text-foreground underline underline-offset-4">
                        See lookbook →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
