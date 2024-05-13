"use server";

import { cookies } from "next/headers";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SessionUserType } from "@/lib/types/shared-types";

export async function getIronSessionData() {
  const session = await getIronSession<SessionUserType>(cookies(), {
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
