"use server";
import "server-only";

import { cookies } from "next/headers";

import { SessionOptions, getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SessionUserType } from "@/lib/types/shared-types";

const sessionOptions: SessionOptions = {
  cookieName: "userSession",
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getIronSessionData() {
  const session = await getIronSession<SessionUserType>(cookies(), sessionOptions);
  if (!session) redirect("/login");
  return session;
}

export async function logoutIronSession() {
  const session = await getIronSessionData();
  session.isLoggedIn = false;
  session.destroy();
  revalidatePath("/");
  redirect("/");
}
