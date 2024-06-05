import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { message } from "antd";
import { sumArrayNumber } from "../../utils/calculate";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });

    // ADD TO CART
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.fulfilled, (state, action) => {
      state.cartLoading = false;
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });

    // REMOVE TO CART
    builder.addCase(handleRemoveFromCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleRemoveFromCart.fulfilled, (state, action) => {
      state.cartLoading = false;
    });
    builder.addCase(handleRemoveFromCart.rejected, (state) => {
      state.cartLoading = false;
    });

    // UPDATE CART
    builder.addCase(handleUpdateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleUpdateCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleUpdateCart.rejected, (state) => {
      state.cartLoading = false;
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: cartReducer } = cartSlice;
// Extract and export each action creator by name
export const { updateCacheCart, clearCart } = actions;
// Export the reducer, either as a default or named export
export default cartReducer;

// GET
export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, thunkApi) => {
    try {
      const cartRes = await cartService.getCart();

      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
// ADD
export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {
    try {
      const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;
      const { cartInfo } = thunkApi.getState()?.cart || {};

      let addPayload = {};

      if (cartInfo.id) {
        const matchIndex = cartInfo.product?.findIndex(
          (product, index) =>
            product.id === addedId && cartInfo?.variant[index] === addedColor
        );

        const newProduct =
          cartInfo.product?.map((product) => {
            return product.id;
          }) || [];

        const newQuantity = [...(cartInfo.quantity ?? [])];
        const newVariant = [...(cartInfo.variant ?? [])];
        const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

        // if (
        //   matchIndex > -1 &&
        //   (newVariant[matchIndex] === addedColor ||
        //     newVariant.includes(addedColor))
        // )
        if (matchIndex > -1) {
          newQuantity[matchIndex] += Number(addedQuantity);
          newTotalProduct[matchIndex] += addedPrice * addedQuantity;
        } else {
          newProduct.push(addedId);
          newQuantity.push(addedQuantity);
          newVariant.push(addedColor);
          newTotalProduct.push(addedPrice * addedQuantity);
        }

        const newSubtotal =
          newTotalProduct.reduce(
            (current, next) => Number(current) + Number(next),
            0
          ) || 0;

        const newTotal = newSubtotal - (cartInfo.discount || 0);

        addPayload = {
          ...cartInfo,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          totalProduct: newTotalProduct,
          subTotal: newSubtotal,
          total: newTotal,
        };
      } else {
        addPayload = {
          product: [addedId],
          quantity: [addedQuantity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuantity],
          subTotal: addedPrice * addedQuantity,
          total: addedPrice * addedQuantity,
          discount: 0,
          paymentMethod: "",
        };
      }

      console.log("addPayload---->", addPayload);

      const cartRes = await cartService.updateCart(addPayload);

      if (cartRes?.data?.data) {
        thunkApi.dispatch(handleGetCart());
      }
      message.success("Add to cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(errorInfo);
      message.error("Add to cart failed");
    }
  }
);
// REMOVE
export const handleRemoveFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (actionPayload, thunkApi) => {
    const { removeIndex } = actionPayload || {};
    const { getState, dispatch, rejectWithValue } = thunkApi;
    const { cartInfo } = getState()?.cart || {};

    if (removeIndex < 0) return false;
    try {
      const newProduct = cartInfo.product
        ?.filter((_, index) => index !== removeIndex)
        .map((item) => item.id);

      const newQuantity = cartInfo.quantity?.filter(
        (_, index) => index !== removeIndex
      );

      const newVariant = cartInfo.variant?.filter(
        (_, index) => index !== removeIndex
      );

      const newTotalProduct = cartInfo.totalProduct?.filter(
        (_, index) => index !== removeIndex
      );

      const newSubtotal = sumArrayNumber(newTotalProduct);

      const newTotal =
        newSubtotal -
        (cartInfo.discount ?? 0) +
        (cartInfo.shipping?.price ?? 0);

      const updatePayload = {
        ...cartInfo,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
        discount: newProduct?.length > 0 ? cartInfo.discount : 0,
        shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
      };
      const cartRes = await cartService.updateCart(updatePayload);

      dispatch(handleGetCart());
      message.success("Remove product from cart successfully");

      return cartRes?.data?.data;
    } catch (error) {
      rejectWithValue(error);
      message.error("Remove product failed");
      console.log("error", error);
    }
  }
);
// UPDATE
export const handleUpdateCart = createAsyncThunk(
  "cart/update",
  async (actionPayload, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      const cartRes = await cartService.updateCart(actionPayload);
      dispatch(handleGetCart());
      message.success("Update cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      rejectWithValue(error);
      message.error("Update cart error");
      console.log("erorr", error);
      throw error;
    }
  }
);

// REMOVE ALL

// export const handleRemoveAllFromCart = createAsyncThunk(
//   "cart/removeAllProducts",
//   async (_, thunkApi) => {
//     const { getState, dispatch, rejectWithValue } = thunkApi;
//     const { cartInfo } = getState()?.cart || {};

//     try {
//       const updatedCartInfo = {
//         product: [],
//         quantity: [],
//         variant: [],
//         totalProduct: [],
//         subTotal: 0,
//         total: 0,
//         discount: 0,
//         shipping: {},
//       };

//       const removeAllRes = await cartService.updateCart(updatedCartInfo);

//       dispatch(handleGetCart());
//       message.success("Remove all products from cart successfully");

//       return removeAllRes?.data?.data;
//     } catch (error) {
//       rejectWithValue(error);
//       message.error("Remove all products failed");
//       console.log("error", error);
//     }
//   }
// );
