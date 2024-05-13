const PATH = `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`;

export const CARTS_ENDPOINTS = {
  GET: {
    GET_ALL_CARTS: `${PATH}`,
    GET_CART_BY_ID: `${PATH}/:id`,
    GET_CARTS_BY_USER: `${PATH}/user/:userId`,
  },
  POST: {
    CREATE_CART: `${PATH}/add`,
  },
  PUT: {
    UPDATE_CART: `${PATH}/:id`,
  },
  DELETE: {
    DELETE_CART: `${PATH}/:id`,
  },
};
