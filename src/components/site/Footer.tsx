import { Link } from "@tanstack/react-router";
import insideLabel from "@/assets/inside-label.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">

          <p className="mt-6 max-w-sm text-eyebrow leading-loose text-muted-foreground whitespace-pre-line">
            DO WHAT THOU WILT SHALL BE THE WHOLE OF THE LAW


          </p>
          <p className="mt-6 font-serif text-2xl italic text-foreground/70 whitespace-pre-line">
            {"\n\n\n"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-2">
          <div>
            <span className="text-eyebrow block text-muted-foreground">Connect</span>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="https://instagram.com/lostsoulssociety_" className="text-eyebrow link-melt text-foreground whitespace-pre-line">
                  {"INSTAGRAM\n\n"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-eyebrow block text-muted-foreground">Society</span>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-eyebrow link-melt text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/stockists" className="text-eyebrow link-melt text-foreground">
                  Stockists
                </Link>
              </li>
              <li>
                <a href="#" className="text-eyebrow link-melt text-foreground">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-eyebrow link-melt text-foreground">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <span className="text-eyebrow block text-muted-foreground">Dispatch</span>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Type your email"
              className="text-eyebrow w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-blood focus:outline-none"
            />
            <button
              type="submit"
              className="text-eyebrow mt-4 text-blood transition-colors hover:text-foreground"
            >
              → Join the Society
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-border pt-8 md:flex-row md:items-center">
        <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
          © {new Date().getFullYear()} Lost Souls Society Ltd.
        </span>
        <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground whitespace-pre-line">
          {"\n\n"}
        </span>
      </div>
    </footer>
  );
}
