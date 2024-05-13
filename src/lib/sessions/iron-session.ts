"use server";

import { cookies } from "next/headers";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SessionUserSchema = z.object({
  id: z.number(),
  token: z.string(),
});

export async function getIronSessionData() {
  const session = await getIronSession<z.infer<typeof SessionUserSchema>>(cookies(), {
    password: process.env.SESSION_PASSWORD as string,
    cookieName: "userSession",
  });
  if (!session) redirect("/login");
  return session;
}

export async function logout() {
  const session = await getIronSessionData();
  session.destroy();
  revalidatePath("/");
}
