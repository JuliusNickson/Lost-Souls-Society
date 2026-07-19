import type { Product, ProductVariant } from "../products";
import type { ShopifyProduct } from "./types";

function metafieldValue(
  product: ShopifyProduct,
  key: string,
): string | undefined {
  const hit = product.metafields?.find((m) => m?.key === key);
  return hit?.value;
}

function inferCategory(
  productType: string,
): Product["category"] {
  const t = productType.toLowerCase();
  if (t.includes("top")) return "Tops";
  if (t.includes("bottom") || t.includes("pant")) return "Bottoms";
  if (t.includes("object") || t.includes("accessory")) return "Objects";
  return "Outerwear";
}

function mapVariants(product: ShopifyProduct): ProductVariant[] {
  return product.variants.nodes.map((v) => {
    const sizeOption =
      v.selectedOptions.find((o) => /size/i.test(o.name))?.value ??
      v.title;
    return {
      size: sizeOption,
      variantId: v.id,
      available: v.availableForSale,
      price: Number.parseFloat(v.price.amount),
    };
  });
}

export function adaptShopifyProduct(product: ShopifyProduct): Product {
  const variants = mapVariants(product);
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount);
  const colorway =
    metafieldValue(product, "colorway") ||
    product.tags.find((t) => !t.toLowerCase().includes("ss")) ||
    product.title.replace(/after hours zip hoodie/i, "").trim() ||
    undefined;

  const limitedRaw = metafieldValue(product, "limited");
  const limited = limitedRaw ? Number.parseInt(limitedRaw, 10) : 80;

  return {
    id: product.id,
    slug: product.handle,
    code: metafieldValue(product, "product_code") || product.handle.toUpperCase(),
    name: product.title,
    detail:
      metafieldValue(product, "detail") ||
      product.description?.split("\n")[0]?.trim() ||
      product.title,
    price: Number.isFinite(price) ? price : 0,
    image: product.featuredImage?.url || "",
    category: inferCategory(product.productType),
    drop: metafieldValue(product, "drop") || "After Hours SS26",
    limited: Number.isFinite(limited) ? limited : 80,
    colorway,
    soldOut: !product.availableForSale || variants.every((v) => !v.available),
    variants,
  };
}

export function adaptShopifyProducts(products: ShopifyProduct[]): Product[] {
  return products.map(adaptShopifyProduct);
}
