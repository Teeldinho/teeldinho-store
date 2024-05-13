const PATH = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;

export const AUTH_ENDPOINTS = {
  GET: {
    GET_CURRENT_AUTH_USER: `${PATH}/me`,
  },
  POST: {
    LOGIN: `${PATH}/login`,
    REFRESH_TOKEN: `${PATH}/refresh`,
  },
};
