import * as z from "zod";

export const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.coerce.date(),
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});

export const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

export const MetaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.coerce.date(),
  barcode: z.string(),
  qrCode: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  sku: z.string(),
  weight: z.number(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: MetaSchema,
  thumbnail: z.string(),
  images: z.array(z.string()),
});

export type ProductType = z.infer<typeof ProductSchema>;
