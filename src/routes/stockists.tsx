import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/stockists")({
  head: () => ({
    meta: [
      { title: "Stockists — Lost Souls Society" },
      {
        name: "description",
        content: "Where to find Lost Souls Society — stockists in Tbilisi and beyond.",
      },
      { property: "og:title", content: "Stockists — Lost Souls Society" },
      {
        property: "og:description",
        content: "Where to find Lost Souls Society — stockists in Tbilisi and beyond.",
      },
    ],
  }),
  component: StockistsPage,
});

type Stockist = {
  city: string;
  name: string;
  address: string;
  note: string;
  lat: number;
  lon: number;
};

const stockists: Stockist[] = [
  { city: "Tbilisi", name: "Chaos Concept Store", address: "14 Merab Kostava St", note: "Stockist", lat: 41.70578, lon: 44.78776 },
  { city: "Tbilisi", name: "Grind Concept Store", address: "14 Ivane Machabeli St", note: "Stockist", lat: 41.69071, lon: 44.80009 },
  { city: "Berlin", name: "Voo Store", address: "Oranienstraße 24", note: "Exclusive drops", lat: 52.50122, lon: 13.42115 },
];

function StockistsPage() {
  const [selected, setSelected] = useState<Stockist>(stockists[0]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      stockists.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.city.toLowerCase().includes(query.toLowerCase()) ||
          s.address.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  // OSM embed bbox around selected point
  const bbox = useMemo(() => {
    const d = 0.01;
    return `${selected.lon - d},${selected.lat - d},${selected.lon + d},${selected.lat + d}`;
  }, [selected]);

  return (
    <Layout>
      <section className="px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="text-eyebrow text-blood">Stockists — {stockists.length}</span>
          <h1 className="mt-6 font-display text-melt text-6xl uppercase leading-[0.9] tracking-tight md:text-8xl">
            Where to find us
          </h1>
        </div>
      </section>

      {/* Find a store */}
      <section className="px-6 pb-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            <div>
              <label className="text-eyebrow mb-3 block text-muted-foreground">Find a store</label>
              <input
                type="text"
                placeholder="City, name, or address…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
              />
              <ul className="mt-6 max-h-[420px] divide-y divide-border overflow-y-auto border border-border">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center font-serif italic text-muted-foreground">
                    No stockists match.
                  </li>
                )}
                {filtered.map((s) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      onClick={() => setSelected(s)}
                      className={`block w-full px-4 py-4 text-left transition-colors ${
                        selected.name === s.name
                          ? "bg-foreground text-background"
                          : "hover:bg-foreground/5"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                        {s.city}
                      </span>
                      <p className="mt-1 font-display text-lg uppercase tracking-tight">
                        {s.name}
                      </p>
                      <p className="mt-1 font-serif text-sm italic opacity-70">{s.address}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border">
              <div className="aspect-[4/3] w-full bg-muted lg:aspect-auto lg:h-[480px]">
                <iframe
                  key={selected.name}
                  title={`Map — ${selected.name}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${selected.lat},${selected.lon}`}
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {selected.city}
                  </p>
                  <p className="font-display text-xl uppercase tracking-tight">{selected.name}</p>
                  <p className="font-serif italic text-foreground/70">{selected.address}</p>
                </div>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${selected.lat}&mlon=${selected.lon}#map=17/${selected.lat}/${selected.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-eyebrow border border-border px-5 py-3 transition-colors hover:bg-foreground hover:text-background"
                >
                  Open in maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full list */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <span className="text-eyebrow text-muted-foreground">All locations</span>
            <span className="text-eyebrow hidden text-muted-foreground md:block">Updated SS25</span>
          </div>

          <ul className="divide-y divide-border">
            {stockists.map((s) => (
              <li
                key={s.name}
                className="grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-6 transition-colors hover:text-blood md:grid-cols-12"
                onClick={() => {
                  setSelected(s);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className="text-eyebrow md:col-span-2 shrink-0 text-muted-foreground">
                  {s.city}
                </span>
                <span className="min-w-0 truncate font-display text-2xl uppercase tracking-tight md:col-span-4">
                  {s.name}
                </span>
                <span className="hidden font-serif italic text-foreground/70 md:col-span-4 md:block">
                  {s.address}
                </span>
                <span className="text-eyebrow shrink-0 text-muted-foreground md:col-span-2 md:text-right">
                  {s.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
