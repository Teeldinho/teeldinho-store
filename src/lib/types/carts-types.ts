import * as z from "zod";

export const ProductOfACartSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedPrice: z.number(),
  thumbnail: z.string(),
});

export type ProductOfACartType = z.infer<typeof ProductOfACartSchema>;

export const CartSchema = z.object({
  id: z.number(),
  products: z.array(ProductOfACartSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
});

export type CartType = z.infer<typeof CartSchema>;

export const CartsOfAUserSchema = z.object({
  carts: z.array(CartSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type CartsOfAUserType = z.infer<typeof CartsOfAUserSchema>;

export const CartProductSchema = z.object({
  id: z.number(),
  quantity: z.number().default(1),
});

export type CartProductType = z.infer<typeof CartProductSchema>;

export const CreateCartSchema = z.object({
  userId: z.number(),
  products: z.array(CartProductSchema),
});

export type CreateCartType = z.infer<typeof CreateCartSchema>;

export const UpdateCartSchema = z.object({
  merge: z.boolean().optional().default(true),
  products: z.array(CartProductSchema),
});

export type UpdateCartType = z.infer<typeof UpdateCartSchema>;
