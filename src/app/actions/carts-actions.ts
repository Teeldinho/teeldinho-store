"use server";
import { CARTS_ENDPOINTS } from "@/lib/api-endpoints/carts/carts-endpoints";
import { ActionError, action } from "@/lib/safe-action";
import { CartType } from "@/lib/types/carts-types";
import { EmptySchema, StringValueSchema } from "@/lib/types/shared-types";
import "server-only";

export const useGetAllCartsQuery = action(EmptySchema, async () => {
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

export const useGetCartByIdQuery = action(StringValueSchema, async ({ value }) => {
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

export const useGetCartOfAUserQuery = action(StringValueSchema, async ({ value }) => {
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

export const useCreateCartMutation = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${CARTS_ENDPOINTS.POST.CREATE_CART}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as CartType;
  } catch (error) {
    console.error("Failed to create cart.", error);
    throw error;
  }
});

export const useUpdateCartMutation = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${CARTS_ENDPOINTS.PUT.UPDATE_CART}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as CartType;
  } catch (error) {
    console.error("Failed to update cart.", error);
    throw error;
  }
});

export const useDeleteCartMutation = action(StringValueSchema, async ({ value }) => {
  const endpoint = `${CARTS_ENDPOINTS.DELETE.DELETE_CART.replace(":id", value)}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      next: { tags: ["carts"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to delete cart.", error);
    throw error;
  }
});
