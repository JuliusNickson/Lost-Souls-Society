import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lost Souls Society" },
      {
        name: "description",
        content: "Get in touch with Lost Souls Society. Wholesale and press inquiries.",
      },
      { property: "og:title", content: "Contact — Lost Souls Society" },
      {
        property: "og:description",
        content: "Wholesale and press inquiries. Tbilisi & New York.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <section className="px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="text-eyebrow text-blood">Reach out</span>
          <h1 className="mt-6 font-display text-melt text-6xl uppercase leading-[0.9] tracking-tight md:text-8xl">
            WE ARE LISTENING
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <form className="space-y-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { id: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm font-semibold uppercase tracking-widest text-foreground">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="mt-3 w-full rounded-none border-2 border-foreground bg-transparent px-4 py-4 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-blood focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-widest text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={8}
                placeholder="Tell us everything..."
                className="mt-3 w-full resize-none rounded-none border-2 border-foreground bg-transparent px-4 py-4 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-blood focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full border-2 border-foreground bg-foreground px-10 py-5 text-center text-sm font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-blood hover:text-foreground"
            >
              Send →
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
