"use server";
import "server-only";
import { CARTS_ENDPOINTS } from "@/lib/api-endpoints/carts/carts-endpoints";
import { ActionError, action } from "@/lib/safe-action";
import { CartProductType, CartSchema, CartType, CreateCartSchema, CreateCartType, UpdateCartSchema, UpdateCartType } from "@/lib/types/carts-types";
import { EmptySchema, StringValueSchema } from "@/lib/types/shared-types";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { getDomain } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

export const createOrUpdateCart = async (userId: number, products: CartProductType[]): Promise<CartType> => {
  const createCart: CreateCartType = {
    userId,
    products,
  };

  const updateCart: UpdateCartType = {
    merge: true,
    products,
  };

  // First try to create a new cart
  try {
    const { data: newCart } = await usingCreateCartMutation(createCart);
    return newCart as CartType;
  } catch (error) {
    console.error("Failed to create cart, trying to update", error);
    // If create fails, try to update
    const { data: updatedCart } = await usingUpdateCartMutation(updateCart);
    return updatedCart as CartType;
  }
};

export const createCheckoutSession = action(CartSchema, async ({ products }) => {
  const domain = getDomain();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: products.map((product) => ({
      price_data: {
        currency: "zar",
        product_data: {
          name: product.title.toString(),
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    })),
    mode: "payment",
    success_url: `${domain}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/shop/cancel`,
  });

  return session.id;
});
