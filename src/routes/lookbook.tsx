import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import heroVideo from "@/assets/after-hours-ss26.mp4.asset.json";
import ahModel from "@/assets/ah-hoodie-model.png.asset.json";
import ahLabel from "@/assets/ah-hoodie-label.png.asset.json";
import sfBelt from "@/assets/sf-belt.mp4.asset.json";
import sf1 from "@/assets/sf-1.jpg.asset.json";
import sf2 from "@/assets/sf-2.jpg.asset.json";
import sf3 from "@/assets/sf-3.jpg.asset.json";
import sf4 from "@/assets/sf-4.jpg.asset.json";
import sf5 from "@/assets/sf-5.jpg.asset.json";
import sorcery1 from "@/assets/sorcery-1.jpg.asset.json";
import sorcery2 from "@/assets/sorcery-2.jpg.asset.json";
import sorcery3 from "@/assets/sorcery-3.jpg.asset.json";
import sorcery4 from "@/assets/sorcery-4.jpg.asset.json";
import sorcery5 from "@/assets/sorcery-5.jpg.asset.json";
import sorcery6 from "@/assets/sorcery-6.png.asset.json";
import sorcery7 from "@/assets/sorcery-7.png.asset.json";
import sorcery8 from "@/assets/sorcery-8.png.asset.json";
import sorcery9 from "@/assets/sorcery-9.png.asset.json";
import beltBuckleCloseup from "@/assets/belt-buckle-closeup.jpg.asset.json";

const sorceryFrames = [
  { src: sorcery1.url, caption: 'Frame 01 — "Sorcery" tee, wall study', w: 1920, h: 1280, span: "md:col-span-7 md:col-start-1" },
  { src: sorcery2.url, caption: "Frame 02 — Curbside, midday", w: 1920, h: 1280, span: "md:col-span-5 md:col-start-8 md:mt-16" },
  { src: sorcery3.url, caption: "Frame 03 — FamilyMart floor portrait", w: 1365, h: 2048, span: "md:col-span-4 md:col-start-2" },
  { src: sorcery4.url, caption: "Frame 04 — Storefront glare", w: 1365, h: 2048, span: "md:col-span-4 md:col-start-6 md:mt-20" },
  { src: sorcery5.url, caption: "Frame 05 — Checkout counter", w: 1365, h: 2048, span: "md:col-span-4 md:col-start-10 md:mt-8" },
  { src: sorcery6.url, caption: "Frame 06 — Red room study", w: 1299, h: 1948, span: "md:col-span-6 md:col-start-2" },
  { src: sorcery7.url, caption: "Frame 07 — Velvet lounge", w: 1299, h: 1948, span: "md:col-span-5 md:col-start-8 md:mt-16" },
  { src: sorcery8.url, caption: "Frame 08 — Window crouch", w: 1366, h: 2048, span: "md:col-span-5 md:col-start-1" },
  { src: sorcery9.url, caption: "Frame 09 — Daybed repose", w: 2048, h: 1366, span: "md:col-span-7 md:col-start-6 md:mt-24" },
];

const afterHoursFrames = [
  { src: ahModel.url, caption: 'Frame 01 — "After Hours" hoodie, SS26', w: 1235, h: 1852, span: "md:col-span-5 md:col-start-2", maxH: "max-h-[65vh]" },
  { src: ahLabel.url, caption: 'Frame 02 — "Love is the Law" woven label', w: 1235, h: 1852, span: "md:col-span-4 md:col-start-7 md:mt-32", maxH: "max-h-[55vh]" },
];

const spookyfrauFrames = [
  { src: sf1.url, caption: "Frame 02 — Junkyard, Tbilisi outskirts", w: 1920, h: 1280, span: "md:col-span-7 md:col-start-1" },
  { src: sf3.url, caption: "Frame 03 — Bat buckle, front", w: 1920, h: 1280, span: "md:col-span-5 md:col-start-8 md:mt-16" },
  { src: sf2.url, caption: "Frame 04 — Studded leather flares", w: 1920, h: 1280, span: "md:col-span-6 md:col-start-2" },
  { src: sf5.url, caption: "Frame 05 — Wreckage interior", w: 1920, h: 1280, span: "md:col-span-6 md:col-start-7" },
  { src: beltBuckleCloseup.url, caption: "Frame 06 — Belt buckle, close-up", w: 1920, h: 1280, span: "md:col-span-5 md:col-start-1 md:mt-8" },
];

type Chapter = {
  id: string;
  index: string;
  title: string;
  quote: string;
  frames?: { src: string; caption: string; w: number; h: number; span: string; maxH?: string }[];
  heroVideo?: string;
  heroImage?: string;
  heroCaption?: string;
  status?: string;
};

const chapters: Chapter[] = [
  {
    id: "after-hours",
    index: "Visual Diary 004",
    title: "After Hours",
    quote: "\"It wasn't a night. It was a country we visited together.\"",
    frames: afterHoursFrames,
  },
  {
    id: "sorcery",
    index: "Visual Diary 005",
    title: "Sorcery",
    quote: "\n\n\n",
    frames: sorceryFrames,
  },
  {
    id: "lss-x-spookyfrau",
    index: "Collaboration 001",
    title: "LSS × SPOOKYFRAU",
    quote: "\n\n\n",
    heroVideo: sfBelt.url,
    heroImage: sf4.url,
    heroCaption: 'Frame 01 — "Bat" belt buckle, sterling cast',
    frames: spookyfrauFrames,
  },
];

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — After Hours SS26 — Lost Souls Society" },
      {
        name: "description",
        content:
          "Visual diaries from Lost Souls Society — After Hours, Sorcery, and LSS × SPOOKYFRAU. Captured between Tbilisi and New York.",
      },
      { property: "og:title", content: "Lookbook — Lost Souls Society" },
      {
        property: "og:description",
        content: "A record of the nights that never ended.",
      },
      { property: "og:image", content: ahModel.url },
    ],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  return (
    <Layout>
      <section className="px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-eyebrow text-blood">Visual Diary 004</span>
              <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-8xl">
                After Hours
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[70vh] min-h-[480px] overflow-hidden md:h-[85vh]">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      </section>

      {chapters.map((chapter, ci) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className={`px-6 md:px-10 ${ci === 0 ? "pb-24" : "border-t border-border py-24"}`}
        >
          <div className="mx-auto max-w-7xl">
            {ci > 0 && (
              <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="text-eyebrow text-blood">{chapter.index}</span>
                  <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
                    {chapter.title}
                  </h2>
                </div>
                <p className="max-w-md font-serif text-xl italic leading-relaxed text-foreground/70">
                  {chapter.quote}
                </p>
              </div>
            )}

            {chapter.heroVideo && (
              <figure className="group mb-12 md:mb-16">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
                  <video
                    src={chapter.heroVideo}
                    poster={chapter.heroImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {chapter.heroCaption && (
                  <figcaption className="text-eyebrow mt-4 flex items-center justify-between text-muted-foreground">
                    <span>{chapter.heroCaption}</span>
                    <span>Main piece — sterling cast</span>
                  </figcaption>
                )}
              </figure>
            )}


            {chapter.frames ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                {chapter.frames.map((f, i) => (
                  <figure key={i} className={`group ${f.span}`}>
                    <div className={`overflow-hidden bg-card ${f.maxH ?? ""}`}>
                      <img
                        src={f.src}
                        alt={f.caption}
                        width={f.w}
                        height={f.h}
                        loading="lazy"
                        className={`w-full object-cover transition-all duration-1000 group-hover:scale-[1.02] ${f.maxH ? "h-full" : ""}`}
                      />
                    </div>
                    <figcaption className="text-eyebrow mt-4 flex items-center justify-between text-muted-foreground">
                      <span>{f.caption}</span>
                      <span>
                        0{i + 1} / 0{chapter.frames!.length}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden border border-border/60 bg-card/40 px-6 py-24 text-center">
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(0deg,transparent_0_2px,currentColor_2px_3px)]" />
                <span className="text-eyebrow text-blood">Chapter sealed</span>
                <p className="mt-6 font-display text-3xl uppercase tracking-tight md:text-5xl">
                  {chapter.status}
                </p>
                <p className="mt-6 max-w-md font-serif text-base italic text-foreground/60">
                  Frames developing in the darkroom. Check back after midnight.
                </p>
              </div>
            )}
          </div>
        </section>
      ))}

    </Layout>
  );
}
