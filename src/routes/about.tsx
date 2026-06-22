import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import aboutImg from "@/assets/about-hero.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lost Souls Society" },
      {
        name: "description",
        content:
          "Lost Souls Society is built from tension—the trace of a feeling that refuses to fade.",
      },
      { property: "og:title", content: "About — Lost Souls Society" },
      {
        property: "og:description",
        content: "A piece that functions as both shield and confession.",
      },
      { property: "og:image", content: aboutImg.url },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="px-6 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="mt-6 font-display text-melt text-balance text-6xl uppercase leading-[0.9] tracking-tight md:text-8xl">
            LOST SOULS&nbsp;SOCIETY
          </h1>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <img
            src={aboutImg.url}
            alt="Two figures on a Tbilisi rooftop at dusk"
            width={1600}
            height={1056}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-12">
          <aside className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <span className="text-eyebrow text-blood">About</span>
          </aside>
          <div className="md:col-span-8 space-y-8 text-lg leading-relaxed text-foreground/85">
            <p>
              Lost Souls Society is built from tension—the trace of a feeling that refuses to fade.
            </p>
            <p>
              A piece that functions as both shield and confession.
            </p>
            <p>
              Each garment is a fragment of a larger story.
            </p>
            <p>
              Lost Souls Society.
            </p>
            <div className="pt-8 border-t border-foreground/10">
              <p className="text-pretty font-serif text-2xl italic text-foreground">
                {"\n"}
              </p>
              <p className="mt-2 text-foreground/70 whitespace-pre-line">
                Founded in New York, 2025{"\n"}
                by Stirakli{"\n"}
                Creative Director
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
