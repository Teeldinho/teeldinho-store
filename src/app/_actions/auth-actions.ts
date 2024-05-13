"use server";
import "server-only";

import { AUTH_ENDPOINTS } from "@/lib/api-endpoints/auth/auth-endpoints";
import { ActionError, action } from "@/lib/safe-action";
import { LoginSchema, UserType } from "@/lib/types/auth-types";
import { getIronSessionData } from "@/lib/sessions/iron-session";
import { EmptySchema } from "@/lib/types/shared-types";

export const usingLoginMutation = action(LoginSchema, async ({ username, password }) => {
  const endpoint = `${AUTH_ENDPOINTS.POST.LOGIN}`;

  try {
    // we fetch the user and set the tags with which to invalidate the cache:
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      next: { tags: ["user"] },
    });

    // we check if the response is ok, if not we throw an error:
    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    // we parse the response:
    const data = await response.json();
    const user = data as UserType;

    // console.log("User logged in:", user);

    // save the session to server-only cookies:
    const session = await getIronSessionData();
    session.id = user.id;
    session.token = user.token;
    await session.save();

    // we return the typed data:
    return user;
  } catch (error) {
    console.error("Failed to login.", error);
    throw error;
  }
});

export const usingGetCurrentUserQuery = action(EmptySchema, async () => {
  const endpoint = `${AUTH_ENDPOINTS.GET.GET_CURRENT_AUTH_USER}`;

  try {
    const session = await getIronSessionData();
    if (!session) {
      throw new ActionError("No session found");
    }

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      next: { tags: ["user"] },
    });

    if (!response.ok) {
      return null;
      //   throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as UserType;
  } catch (error) {
    console.error("Failed to fetch current user.", error);
    throw error;
  }
});

export const usingRefreshTokenMutation = action(EmptySchema, async () => {
  const endpoint = `${AUTH_ENDPOINTS.POST.REFRESH_TOKEN}`;

  try {
    const session = await getIronSessionData();
    if (!session) {
      throw new ActionError("No session found");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      next: { tags: ["user"] },
    });

    if (!response.ok) {
      throw new ActionError(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data as UserType;
  } catch (error) {
    console.error("Failed to refresh token.", error);
    throw error;
  }
});
