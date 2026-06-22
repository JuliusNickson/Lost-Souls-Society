import hoodieRust from "@/assets/hoodie-rust.png.asset.json";
import hoodieSage from "@/assets/hoodie-sage.png.asset.json";
import hoodieCharcoal from "@/assets/hoodie-charcoal.png.asset.json";
import hoodieNavy from "@/assets/hoodie-navy.png.asset.json";

export type Product = {
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
};

const NAME = "After Hours Zip Hoodie";
const PRICE = 80;

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
  },
];

export const featuredProducts = products;
export const zipHoodieColorways = products;
