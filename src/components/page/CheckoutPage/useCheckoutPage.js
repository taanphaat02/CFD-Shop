import { useDispatch, useSelector } from "react-redux";
import { orderServices } from "../../../services/orderServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { PATHS } from "../../../constants/path";
import {
  handleGetCart,
  updateCacheCart,
} from "../../../store/reducer/cartReducer";
import { COUPON } from "../../../constants/message";

export const useCheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartInfo } = useSelector((state) => state.cart);
  useEffect(() => {
    if (
      Array.isArray(cartInfo) ||
      (cartInfo?.id && cartInfo?.product?.length < 1)
    ) {
      message.config({ top: 80, duration: 3, maxCount: 1 });
      message.error(
        "There are no products in cart. Please add product to cart"
      );
      navigate(PATHS.PRODUCTS);
    }
  }, [cartInfo]);

  const handleAddCoupon = async (coupon) => {
    try {
      const couponRes = await orderServices.getVoucher(coupon);
      const couponInfo = couponRes?.data?.data;

      if (couponInfo) {
        const { subTotal, shipping } = cartInfo || {};

        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: couponInfo.value || 0,
            discountCode: couponInfo.code || "",
            total: subTotal - (couponInfo.value || 0) + (shipping?.price || 0),
          })
        );

        message.success(COUPON.couponSuccess);
      }
    } catch (error) {
      console.log("error", error);
      message.error(COUPON.couponError);
    }
  };

  const handleRemoveCoupon = () => {
    try {
      if (cartInfo.discountCode) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: 0,
            discountCode: "",
            total: subTotal + (shipping?.price || 0),
          })
        );

        message.success(COUPON.removeSuccess);
      }
    } catch (error) {
      console.log("error", error);
      message.error(COUPON.removeFail);
    }
  };

  // CHECKOUT
  const handleCheckout = async (data) => {
    if (data) {
      const { formInfo, cartInfo } = data;
      const {
        shipping,
        variant,
        subTotal,
        total,
        product,
        quantity,
        totalProduct,
        discount,
        discountCode,
      } = cartInfo || {};

      const {
        firstName,
        phone,
        email,
        province,
        district,
        ward,
        street,
        note,
        paymentMethod,
      } = formInfo || {};
      const checkoutPayload = {
        address: {
          phone,
          email,
          fulName: firstName,
          street: `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${
            province?.label || ""
          }`,
        },
        note,
        paymentMethod,
        shipping,
        variant,
        subTotal,
        total,
        product: product?.map((item) => item.id || []),
        quantity,
        totalProduct,
        discount,
        discountCode,
      };

      try {
        const res = await orderServices.checkout(checkoutPayload);
        if (res?.data?.data) {
          dispatch(handleGetCart());
          message.success("Checkout succesfully");
          navigate(PATHS.CHECKOUT_SUCCESS);
        } else {
          message.error("Checkout failed");
        }
      } catch (error) {
        message.error("Checkout failed");
      }
    }
  };

  const couponProps = {
    addedCoupon: cartInfo.discountCode,
    handleAddCoupon,
    handleRemoveCoupon,
  };

  const checkoutProps = {
    handleCheckout,
  };

  return {
    couponProps,
    checkoutProps,
  };
};
