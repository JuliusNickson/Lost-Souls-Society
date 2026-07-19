import { createServerFn } from "@tanstack/react-start";

import { products as fallbackProducts } from "../products";
import { adaptShopifyProducts } from "../shopify/adapter";
import {
  isShopifyConfigured,
  shopifyFetch,
} from "../shopify/client.server";
import { PRODUCTS_QUERY } from "../shopify/queries";
import type { ProductsQueryResult } from "../shopify/types";

export const getProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    if (!isShopifyConfigured()) {
      return {
        source: "fallback" as const,
        products: fallbackProducts,
      };
    }

    try {
      const data = await shopifyFetch<ProductsQueryResult>({
        query: PRODUCTS_QUERY,
        variables: { first: 50 },
      });

      const products = adaptShopifyProducts(data.products.nodes);
      if (products.length === 0) {
        return {
          source: "fallback" as const,
          products: fallbackProducts,
        };
      }

      return {
        source: "shopify" as const,
        products,
      };
    } catch (error) {
      console.error("[getProducts] Shopify fetch failed:", error);
      return {
        source: "fallback" as const,
        products: fallbackProducts,
      };
    }
  },
);
