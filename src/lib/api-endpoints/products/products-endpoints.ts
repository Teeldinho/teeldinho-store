const PATH = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

export const PRODUCTS_ENDPOINTS = {
  GET: {
    GET_ALL_PRODUCTS: `${PATH}`,
    GET_PRODUCT_BY_ID: `${PATH}/:id`,
    SEARCH_PRODUCTS: `${PATH}/search?q=:query`,
    GET_ALL_PRODUCTS_CATEGORIES: `${PATH}/categories`,
    GET_PRODUCTS_BY_CATEGORY: `${PATH}/categories/:category`,
  },
};
