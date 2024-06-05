import { useParams } from "react-router-dom";
import useQuery from "../../../hook/useQuery";
import { productService } from "../../../services/productService";
import { useRef } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../../../store/reducer/cartReducer";
import tokenMethod from "../../../utils/token";
import {
  handleGetProfile,
  handleShowModal,
} from "../../../store/reducer/authReducer";
import { MODAL_TYPES } from "../../../constants/general";
import { authService } from "../../../services/authService";

const useProductDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();

  const { data: productDetailData } = useQuery(
    () => productService?.getProductBySlug(slug),
    [slug]
  );

  const { profile } = useSelector((state) => state.auth);
  const wishList = profile?.whiteList || [];

  const { id, name, description, shippingReturn, price, discount } =
    productDetailData || {};

  const { data: productDetailReview } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );

  // ADD TO CART
  const handleAddToCart = async () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};

    if (!tokenMethod.get()) {
      message.error("Please login before ordering");
      dispatch(handleShowModal(MODAL_TYPES.login));
    } else {
      // VALIDATE
      if (!color) {
        message.error("Please select color");
        return;
      } else if (isNaN(quantity) && quantity < 1) {
        message.error("Quantity must be greater than 1");
        return;
      }

      // ADD CART
      const addPayload = {
        addedId: id,
        addedColor: color,
        addedQuantity: quantity,
        addedPrice: price - discount,
      };

      try {
        const res = dispatch(handleAddCart(addPayload)).unwrap();
        if (res) {
          colorReset?.();
          quantityReset?.();
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  //   ADD TO WISH LIST
  const handleAddToWishList = async (id) => {
    if (!tokenMethod.get()) {
      message.error("Please login to continue");
      dispatch(handleShowModal(MODAL_TYPES.login));
    } else {
      const payload = {
        product: id,
      };
      if (wishList?.some((item) => item.id === id)) {
        message.info("This product is already in your wishlist");
        return;
      }
      {
        try {
          // console.log("🚀payload---->", payload);
          const res = await authService.addWishlist(payload);
          message.success("Add product to wishlist success!");
          dispatch(handleGetProfile());
        } catch (error) {
          console.log("error add wishlist", error);
        }
      }
    }
  };

  // REMOVE FROM WISH LIST
  const handleRemoveFromWishList = async (id) => {
    if (!tokenMethod.get()) {
      message.error("Please login before ordering");
      dispatch(handleShowModal(MODAL_TYPES.login));
    } else {
      const payload = {
        product: id,
      };
      if (id)
        try {
          // console.log("🚀payload---->", payload);
          const res = await authService.deleteWishlist(payload);
          message.success("Remove product from wishlist success!");
          dispatch(handleGetProfile());
        } catch (error) {
          console.log("error remove wishlist", error);
        }
    }
  };

  // ADD CART DEFAULT
  const handleAddCartDefault = async (id, color, price, discount) => {
    if (!tokenMethod.get()) {
      message.error("Please login before ordering");
      dispatch(handleShowModal(MODAL_TYPES.login));
    } else {
      // ADD CART
      const addPayload = {
        addedId: id,
        addedColor: color,
        addedQuantity: 1,
        addedPrice: price - discount,
      };

      try {
        // console.log("🚀addPayload---->", addPayload);
        const res = dispatch(handleAddCart(addPayload)).unwrap();
        // console.log("🚀res---->", res);
      } catch (error) {
        console.log("error add cart default", error);
      }
    }
  };

  // PROPS
  const productDetailTopProps = {
    ...productDetailData,
    colorRef,
    quantityRef,
    reviews: productDetailReview,
    handleAddToCart,
    handleAddToWishList,
    handleRemoveFromWishList,
    handleAddCartDefault,
  };

  const productDetailTapProps = {
    description,
    shippingReturn,
    reviews: productDetailReview,
  };

  return { productDetailTopProps, productDetailTapProps, productName: name };
};

export default useProductDetailPage;
