import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sumArrayNumber } from "../../../utils/calculate";
import {
  handleRemoveFromCart,
  handleUpdateCart,
} from "../../../store/reducer/cartReducer";
import { SHIPPING_OPTIONS } from "../../../constants/general";

export const useCartPage = () => {
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const quantityRef = useRef([]);
  const {
    product,
    quantity,
    totalProduct,
    shipping,
    discount,
    total,
    subTotal,
    variant,
  } = cartInfo || {};

  const updateQuantityTimeout = useRef();

  const handleUpdateQuantity = (updatedQuantity, updatedIndex) => {
    const getPayload = () => {
      const newQuantity = quantity.map((item, index) =>
        index === updatedIndex ? updatedQuantity : item
      );

      const newTotalProduct = totalProduct.map((item, index) =>
        index === updatedIndex
          ? product[updatedIndex].price * updatedQuantity
          : item
      );

      const newSubtotal = sumArrayNumber(newTotalProduct);
      const newTotal = newSubtotal - (discount ?? 0) + (shipping?.price ?? 0);

      return {
        ...cartInfo,
        product: product.map((item) => item.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
      };
    };

    if (updateQuantityTimeout.current) {
      clearTimeout(updateQuantityTimeout.current);
    }

    updateQuantityTimeout.current = setTimeout(async () => {
      if (
        !cartLoading &&
        updatedQuantity !== "" &&
        quantity[updatedIndex] !== updatedQuantity
      ) {
        try {
          const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
        } catch (error) {
          quantityRef.current[updatedIndex]?.reset?.();
        }
      }
    }, 300);
  };

  const handleRemoveProduct = (removeIndex) => {
    if (cartLoading || removeIndex < 0) return;
    dispatch(handleRemoveFromCart({ removeIndex }));
  };

  const handleUpdateShipping = (selectedTypeShip) => {
    const selectedShipping = SHIPPING_OPTIONS.find(
      (option) => option.value === selectedTypeShip
    );
    // console.log('🚀option.value---->', option.value);
    // console.log('🚀selectedTypeShip---->', selectedTypeShip);

    if (selectedShipping) {
      const updatePayload = {
        ...cartInfo,
        product: product?.map((item) => item.id),
        shipping: {
          typeShip: selectedShipping.value,
          price: selectedShipping.price,
        },
        total: total - (shipping?.price || 0) + selectedShipping.price,
      };

      dispatch(handleUpdateCart(updatePayload));
    }
  };

  const cartTableProps = {
    products:
      product?.map((item, index) => {
        return {
          ...item,
          quantity: quantity?.[index],
          totalProduct: totalProduct?.[index],
          variant: variant?.[index],
        };
      }) || [],
    quantityRef,
    handleUpdateQuantity,
    handleRemoveProduct,
  };

  const cartSumaryProps = {
    total,
    subTotal,
    typeShip: shipping?.typeShip,
    handleUpdateShipping,
  };

  return {
    cartTableProps,
    cartSumaryProps,
  };
};
