"use server";
import "server-only";

import { ActionError, action } from "@/lib/safe-action";
import { EmptySchema, StringValueSchema } from "@/lib/types/shared-types";
import { PRODUCTS_ENDPOINTS } from "@/lib/api-endpoints/products/products-endpoints";
import { ProductType } from "@/lib/types/products-types";

export const usingGetAllProductsQuery = action(EmptySchema, async () => {
  const endpoint = `${PRODUCTS_ENDPOINTS.GET.GET_ALL_PRODUCTS}`;

  try {
    // we fetch the products and set the tags with which to invalidate the cache/tags:
    const response = await fetch(endpoint, {
      next: { tags: ["products"] },
    });

    // we check if the response is ok, if not we throw an error:
    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    // we parse the response:
    const data = await response.json();

    // we return the typed data:
    return data as ProductType;
  } catch (error) {
    console.error("Failed to fetch products.", error);
    throw error;
  }
});

export const usingGetProductByIdQuery = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${PRODUCTS_ENDPOINTS.GET.GET_PRODUCT_BY_ID.replace(":id", value)}`;

  try {
    const response = await fetch(endpoint, {
      next: { tags: ["products"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as ProductType;
  } catch (error) {
    console.error("Failed to fetch product.", error);
    throw error;
  }
});

export const usingSearchProductsQuery = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${PRODUCTS_ENDPOINTS.GET.SEARCH_PRODUCTS.replace(":query", value)}`;

  try {
    const response = await fetch(endpoint, {
      next: { tags: ["products"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as ProductType;
  } catch (error) {
    console.error("Failed to search products.", error);
    throw error;
  }
});

export const usingGetAllProductsCategoriesQuery = action(EmptySchema, async () => {
  const endpoint = `${PRODUCTS_ENDPOINTS.GET.GET_ALL_PRODUCTS_CATEGORIES}`;

  try {
    const response = await fetch(endpoint, {
      next: { tags: ["products-categories"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as string[];
  } catch (error) {
    console.error("Failed to fetch products categories.", error);
    throw error;
  }
});

export const usingGetProductsOfACategoryQuery = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${PRODUCTS_ENDPOINTS.GET.GET_PRODUCTS_BY_CATEGORY.replace(":category", value)}`;

  try {
    const response = await fetch(endpoint, {
      next: { tags: ["products"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as ProductType;
  } catch (error) {
    console.error("Failed to fetch products of a category.", error);
    throw error;
  }
});
