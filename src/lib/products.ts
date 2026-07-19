import hoodieRust from "@/assets/hoodie-rust.png.asset.json";
import hoodieSage from "@/assets/hoodie-sage.png.asset.json";
import hoodieCharcoal from "@/assets/hoodie-charcoal.png.asset.json";
import hoodieNavy from "@/assets/hoodie-navy.png.asset.json";

export type ProductVariant = {
  size: string;
  variantId: string;
  available: boolean;
  price: number;
};

export type Product = {
  id?: string;
  slug: string;
  code: string;
  name: string;
  detail: string;
  price: number;
  image: string;
  category: "Tops" | "Outerwear" | "Bottoms" | "Objects";
  drop: string;
  limited: number;
  colorway?: string;
  soldOut?: boolean;
  variants?: ProductVariant[];
};

const NAME = "After Hours Zip Hoodie";
const PRICE = 80;

function localVariants(slug: string): ProductVariant[] {
  return ["XS", "S", "M", "L", "XL"].map((size) => ({
    size,
    variantId: `local:${slug}:${size}`,
    available: true,
    price: PRICE,
  }));
}

export const products: Product[] = [
  {
    slug: "after-hours-zip-hoodie-rust",
    code: "AH-ZH01/RST",
    name: NAME,
    detail: "Pigment Dyed / Faded Rust",
    price: PRICE,
    image: hoodieRust.url,
    category: "Outerwear",
    drop: "After Hours SS26",
    limited: 80,
    colorway: "Faded Rust",
    variants: localVariants("after-hours-zip-hoodie-rust"),
  },
  {
    slug: "after-hours-zip-hoodie-sage",
    code: "AH-ZH01/SGE",
    name: NAME,
    detail: "Pigment Dyed / Washed Sage",
    price: PRICE,
    image: hoodieSage.url,
    category: "Outerwear",
    drop: "After Hours SS26",
    limited: 80,
    colorway: "Washed Sage",
    variants: localVariants("after-hours-zip-hoodie-sage"),
  },
  {
    slug: "after-hours-zip-hoodie-charcoal",
    code: "AH-ZH01/CHR",
    name: NAME,
    detail: "Pigment Dyed / Aged Charcoal",
    price: PRICE,
    image: hoodieCharcoal.url,
    category: "Outerwear",
    drop: "After Hours SS26",
    limited: 80,
    colorway: "Aged Charcoal",
    soldOut: true,
    variants: localVariants("after-hours-zip-hoodie-charcoal").map((v) => ({
      ...v,
      available: false,
    })),
  },
  {
    slug: "after-hours-zip-hoodie-navy",
    code: "AH-ZH01/NVY",
    name: NAME,
    detail: "Pigment Dyed / Midnight Navy",
    price: PRICE,
    image: hoodieNavy.url,
    category: "Outerwear",
    drop: "After Hours SS26",
    limited: 80,
    colorway: "Midnight Navy",
    soldOut: true,
    variants: localVariants("after-hours-zip-hoodie-navy").map((v) => ({
      ...v,
      available: false,
    })),
  },
];

export const featuredProducts = products;
export const zipHoodieColorways = products;

export function getVariantForSize(product: Product, size: string) {
  return product.variants?.find(
    (v) => v.size.toUpperCase() === size.toUpperCase(),
  );
}
