const PRODUCTS_PATH = "/products";
const PROFILE_PATH = "/profile";
const PROFILE_ORDER = "/profile/order";
const PROFILE_ADDRESS = "/profile/address";
const PROFILE_WISHLIST = "/profile/wishlist";
const PROFILE_CHANGEPASS = "/profile/change-password";
const BLOG_PATH = "/blog";
export const PATHS = {
  HOME: "/",
  PRODUCTS: PRODUCTS_PATH,
  PRODUCT_DETAIL: PRODUCTS_PATH + "/:slug",
  CART: "/cart",
  BLOG: BLOG_PATH,
  BLOG_DETAIL: BLOG_PATH + "/:slug",
  CONTACT: "/contact",
  ABOUT: "/about",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout_success",
  DASHBOARD: "/dashboard",
  FAQ: "/FQA",
  PAYMENT_METHOD: "/payment_method",
  PRIVATE_POLICY: "/private_policy",
  RETURN: "/return",
  SHIPPING: "shipping",
  PROFILE: {
    INDEX: PROFILE_PATH,
    PROFILE_ORDER: PROFILE_ORDER,
    PROFILE_WISHLIST: PROFILE_WISHLIST,
    PROFILE_ADDRESS: PROFILE_ADDRESS,
    PROFILE_CHANGEPASS: PROFILE_CHANGEPASS,
    PROFILE_ORDER_DETAIL: PROFILE_ORDER + "/:id",
  },
};
