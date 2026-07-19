import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { getProducts } from "@/lib/api/products.functions";
import { products as fallbackProducts } from "@/lib/products";
import heroVideo from "@/assets/after-hours-ss26.mp4.asset.json";

export const Route = createFileRoute("/")({
  loader: () => getProducts(),
  head: ({ loaderData }) => {
    const image =
      loaderData?.products?.[0]?.image ?? fallbackProducts[0].image;
    return {
      meta: [
        { title: "Lost Souls Society — After Hours SS26" },
        {
          name: "description",
          content:
            "AFTER HOURS SS26. Limited drop streetwear from Lost Souls Society. Tbilisi & New York.",
        },
        { property: "og:title", content: "Lost Souls Society — After Hours SS26" },
        {
          property: "og:description",
          content: "A society for the lost. Limited drops, post-rave aesthetic.",
        },
        { property: "og:image", content: image },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { products } = Route.useLoaderData();
  const colorways = products.length > 0 ? products : fallbackProducts;

  return (
    <Layout>
      <section className="relative flex h-[100svh] min-h-[680px] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/50" />
        </div>

        <div className="relative z-10 animate-melt-in">
          <h1 className="mx-auto w-full max-w-5xl px-4">
            <span className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9]">
              LOST SOULS SOCIETY
            </span>
          </h1>
          <p className="mt-4 font-display text-sm font-medium uppercase tracking-[0.35em] text-foreground/70 md:text-base">
            Love is the law, Love under the will
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-fade-up">
          <div className="mx-auto h-20 w-px bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
          <p className="text-eyebrow mt-3 text-muted-foreground">Scroll</p>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-[44ch]">
              <span className="text-eyebrow mb-4 block text-blood whitespace-pre-line">{"\n"}</span>
              <h2 className="font-display text-balance text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
                After Hours
                <br />
                SS26
              </h2>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
                A collection forged in the silence of the 4am walk. Archival fabrics meeting
                modern silhouettes for those who find peace in the dark.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-eyebrow group inline-flex items-center gap-3 border border-foreground px-8 py-4 text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Explore Collection
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
            <div>
              <span className="text-eyebrow text-blood">AH-ZH01 — Four Rituals</span>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-tight md:text-4xl">
                Pick your colorway
              </h2>
            </div>
            <span className="text-eyebrow hidden text-muted-foreground md:block">
              Each limited to 80
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {colorways.map((h) => (
              <Link to="/shop" key={h.slug} className="group flex h-full flex-col items-center text-center">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={h.image}
                    alt={`Society Zip Hoodie — ${h.colorway}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-eyebrow text-foreground">{h.colorway}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {h.code}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
