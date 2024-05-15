import * as z from "zod";

export const StringValueSchema = z.object({
  value: z.string(),
});
export type StringValueType = z.infer<typeof StringValueSchema>;

export const EmptySchema = z.object({});
export type EmptySchemaType = z.infer<typeof EmptySchema>;

const SessionUserSchema = z.object({
  id: z.number().nullable(),
  token: z.string().nullable(),
  isLoggedIn: z.boolean().default(false),
});

export type SessionUserType = z.infer<typeof SessionUserSchema>;
