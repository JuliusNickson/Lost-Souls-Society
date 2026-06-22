import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { LocaleProvider } from "@/lib/locale";
import { ThemeProvider } from "@/lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl uppercase tracking-tighter text-foreground">404</h1>
        <h2 className="mt-6 font-serif text-2xl italic text-foreground/70">A soul lost in transit</h2>
        <p className="mt-3 text-eyebrow text-muted-foreground">This page has dissolved.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="text-eyebrow inline-flex border border-border px-8 py-3 text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl uppercase tracking-tighter text-foreground">
          The signal broke
        </h1>
        <p className="mt-3 text-eyebrow text-muted-foreground">
          Something failed in the dark. Try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="text-eyebrow border border-border bg-foreground px-6 py-3 text-background transition-colors hover:bg-foreground/80"
          >
            Try again
          </button>
          <a
            href="/"
            className="text-eyebrow border border-border px-6 py-3 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lost Souls Society — After Hours SS25" },
      {
        name: "description",
        content:
          "Lost Souls Society. Underground streetwear between Tbilisi and New York. Limited drops for the restless, the obsessed, the lost.",
      },
      { name: "author", content: "Lost Souls Society" },
      { name: "theme-color", content: "#09090b" },
      { property: "og:title", content: "Lost Souls Society — After Hours SS25" },
      {
        property: "og:description",
        content: "A society for the lost. Built between Tbilisi and New York.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lost Souls Society — After Hours SS25" },
      { name: "description", content: "Lost Souls Societ - Official Website" },
      { property: "og:description", content: "Lost Souls Societ - Official Website" },
      { name: "twitter:description", content: "Lost Souls Societ - Official Website" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/XnhlWeFYT9NLkied7uT5GL90W6q2/social-images/social-1781651179722-VALENTINA_KIKNA-6.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/XnhlWeFYT9NLkied7uT5GL90W6q2/social-images/social-1781651179722-VALENTINA_KIKNA-6.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Antonio:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500;600&family=Montserrat:wght@900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <CartProvider>
            <Outlet />
          </CartProvider>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
