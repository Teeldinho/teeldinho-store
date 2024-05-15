import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { getIronSessionData } from "./sessions/iron-session";

export class ActionError extends Error {}

const handleReturnedServerError = (e: Error) => {
  // If the error is an instance of `ActionError`, unmask the message.
  if (e instanceof ActionError) {
    return e.message;
  }

  // Otherwise return default error message.
  return DEFAULT_SERVER_ERROR;
};

export const action = createSafeActionClient({
  // You can provide a custom log Promise, otherwise the lib will use `console.error`
  // as the default logging system. If you want to disable server errors logging,
  // just pass an empty Promise.
  handleServerErrorLog: (e) => {
    console.error("CUSTOM ERROR LOG FUNCTION, server error message:", e.message);
  },
  handleReturnedServerError,
});

export const authAction = createSafeActionClient({
  async middleware() {
    const session = cookies().get("userSession")?.value;
    if (!session) {
      throw new Error("Session not found!");
    }

    // if a session is found, we retrive our user id:
    const sessionData = await getIronSessionData();

    if (!sessionData) {
      throw new Error("Session is not valid!");
    }

    // we can now use this userId in all our auth actions,
    // for instance, if we want to know which user made a specific action or request.
    return { userId: sessionData.id };
  },
});
