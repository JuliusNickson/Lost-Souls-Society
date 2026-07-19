import process from "node:process";

type ShopifyConfig = {
  storeDomain: string;
  privateToken?: string;
  publicToken?: string;
};

export function getShopifyConfig(): ShopifyConfig {
  const storeDomain = (
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.VITE_SHOPIFY_STORE_DOMAIN ||
    ""
  )
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  const privateToken =
    process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim() || undefined;
  const publicToken =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim() || undefined;

  return { storeDomain, privateToken, publicToken };
}

export function isShopifyConfigured() {
  const { storeDomain, privateToken, publicToken } = getShopifyConfig();
  return Boolean(storeDomain && (privateToken || publicToken));
}

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const { storeDomain, privateToken, publicToken } = getShopifyConfig();

  if (!storeDomain) {
    throw new Error("SHOPIFY_STORE_DOMAIN is not set");
  }
  if (!privateToken && !publicToken) {
    throw new Error(
      "Set SHOPIFY_STOREFRONT_PRIVATE_TOKEN or SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }

  const endpoint = `https://${storeDomain}/api/2025-01/graphql.json`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Private token is preferred for server contexts.
  if (privateToken) {
    headers["Shopify-Storefront-Private-Token"] = privateToken;
  } else if (publicToken) {
    headers["X-Shopify-Storefront-Access-Token"] = publicToken;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Shopify Storefront API ${response.status}: ${body}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data");
  }

  return json.data;
}
