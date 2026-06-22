import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, setQty, remove, count } = useCart();
  const { convert, locale } = useLocale();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent className="flex w-full flex-col gap-0 border-border bg-background p-0 text-foreground sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-6 text-left">
          <SheetTitle className="text-eyebrow font-normal text-foreground">
            Cart — {count} {count === 1 ? "piece" : "pieces"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center py-24 text-center">
              <p className="font-serif text-lg italic text-muted-foreground">
                Nothing here yet. The night is young.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="flex gap-4 py-6">
                  <div className="h-24 w-20 shrink-0 overflow-hidden ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {item.detail}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Size {item.size}
                        </p>
                      </div>
                      <span className="shrink-0 text-right font-sans text-base font-bold">
                        ${item.price * item.qty}
                        {locale && locale.currency !== "USD" && (
                          <span className="block text-[10px] not-italic uppercase tracking-[0.2em] text-muted-foreground">
                            ≈ {convert(item.price * item.qty)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                          className="px-3 py-1 text-foreground transition-colors hover:bg-foreground hover:text-background"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="px-3 text-xs">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                          className="px-3 py-1 text-foreground transition-colors hover:bg-foreground hover:text-background"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.slug, item.size)}
                        className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-eyebrow text-muted-foreground">Subtotal</span>
              <span className="text-right font-sans text-2xl font-bold">
                ${subtotal}
                {locale && locale.currency !== "USD" && (
                  <span className="block text-xs not-italic uppercase tracking-[0.2em] text-muted-foreground">
                    ≈ {convert(subtotal)}
                  </span>
                )}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={close}
              className="text-eyebrow mt-6 block w-full bg-foreground py-4 text-center text-background transition-opacity hover:opacity-80"
            >
              Checkout
            </Link>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
