"use server";
import "server-only";
import { CARTS_ENDPOINTS } from "@/lib/api-endpoints/carts/carts-endpoints";
import { ActionError, action } from "@/lib/safe-action";
import { CartType, CreateCartSchema, UpdateCartSchema } from "@/lib/types/carts-types";
import { EmptySchema, StringValueSchema } from "@/lib/types/shared-types";
import { revalidateTag } from "next/cache";

export const usingGetAllCartsQuery = action(EmptySchema, async () => {
  const endpoint = `${CARTS_ENDPOINTS.GET.GET_ALL_CARTS}`;

  try {
    // we fetch the carts and set the tags with which to invalidate the cache/tags:
    const response = await fetch(endpoint, {
      next: { tags: ["carts"] },
    });

    // we check if the response is ok, if not we throw an error:
    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    // we parse the response:
    const data = await response.json();

    // we return the typed data:
    return data as CartType;
  } catch (error) {
    console.error("Failed to fetch carts.", error);
    throw error;
  }
});

export const usingGetCartByIdQuery = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${CARTS_ENDPOINTS.GET.GET_CART_BY_ID.replace(":id", value)}`;

  try {
    const response = await fetch(endpoint, {
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as CartType;
  } catch (error) {
    console.error("Failed to fetch cart.", error);
    throw error;
  }
});

export const usingGetCartsOfAUserQuery = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${CARTS_ENDPOINTS.GET.GET_CARTS_BY_USER.replace(":id", value)}`;

  try {
    const response = await fetch(endpoint, {
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as CartType;
  } catch (error) {
    console.error("Failed to fetch cart.", error);
    throw error;
  }
});

export const usingCreateCartMutation = action(CreateCartSchema, async (cart) => {
  const endpoint = `${CARTS_ENDPOINTS.POST.CREATE_CART}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    revalidateTag("carts");

    return data as CartType;
  } catch (error) {
    console.error("Failed to create cart.", error);
    throw error;
  }
});

export const usingUpdateCartMutation = action(UpdateCartSchema, async (card) => {
  const endpoint = `${CARTS_ENDPOINTS.PUT.UPDATE_CART}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(card),
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    revalidateTag("carts");

    return data as CartType;
  } catch (error) {
    console.error("Failed to update cart.", error);
    throw error;
  }
});

export const usingDeleteCartMutation = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${CARTS_ENDPOINTS.DELETE.DELETE_CART.replace(":id", value)}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    revalidateTag("carts");

    return true;
  } catch (error) {
    console.error("Failed to delete cart.", error);
    throw error;
  }
});
