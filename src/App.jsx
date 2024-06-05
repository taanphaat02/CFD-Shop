import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/path";
import MainLlayout from "./layout/MainLayout";
import Homepage from "./components/page/Homepage";
import ProductPage from "./components/page/ProductPage";
import BlogPage from "./components/page/BlogPage";
import ContactPage from "./components/page/ContactPage";
import AboutPage from "./components/page/AboutPage";
import DashboardPage from "./components/page/DashboardPage";
import FaqPage from "./components/page/FaqPage";
import PaymentMethodsPage from "./components/page/PaymentMethodsPage";
import PrivacyPolicyPage from "./components/page/PrivacyPolicyPage";
import ReturnPage from "./components/page/ReturnPage";
import ShippingPage from "./components/page/ShippingPage";
import CartPage from "./components/page/CartPage";
import CheckoutPage from "./components/page/CheckoutPage";
import CheckoutSuccessPage from "./components/page/CheckoutSuccessPage";
import Page404 from "./components/page/Page404";
import ProductDetailPage from "./components/page/ProductDetailPage";
import { message } from "antd";
import "./assets/style.css";
import { handleGetProfile } from "./store/reducer/authReducer";
import tokenMethod from "./utils/token";
import { useDispatch } from "react-redux";
import { handleGetCart } from "./store/reducer/cartReducer";
import AccountDetail from "./components/page/DashboardPage/AccountDetail";
import ListOrder from "./components/page/DashboardPage/ListOrder";
import AddressAccount from "./components/page/DashboardPage/AddressAccount";
import WishList from "./components/page/DashboardPage/WishList";
import PrivateRoute from "./components/PrivateRoute";
import ChangePass from "./components/page/DashboardPage/ChangePass";
import BlogSinglePage from "./components/page/BlogSinglePage";
import OrderDetailPage from "./components/page/DashboardPage/OrderDetailPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    message.config({ top: 80, duration: 3, maxCount: 3 });
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart());
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLlayout />}>
          <Route index element={<Homepage />} />
          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailPage />} />

          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogSinglePage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />

          <Route path={PATHS.FAQ} element={<FaqPage />} />
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodsPage />} />
          <Route path={PATHS.PRIVATE_POLICY} element={<PrivacyPolicyPage />} />
          <Route path={PATHS.RETURN} element={<ReturnPage />} />
          <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />}>
              <Route index element={<AccountDetail />} />
              <Route
                path={PATHS.PROFILE.PROFILE_ORDER}
                element={<ListOrder />}
              />
              <Route
                path={PATHS.PROFILE.PROFILE_ADDRESS}
                element={<AddressAccount />}
              />
              <Route
                path={PATHS.PROFILE.PROFILE_WISHLIST}
                element={<WishList />}
              />
              <Route
                path={PATHS.PROFILE.PROFILE_CHANGEPASS}
                element={<ChangePass />}
              />
              <Route
                path={PATHS.PROFILE.PROFILE_ORDER_DETAIL}
                element={<OrderDetailPage />}
              />
            </Route>

            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route
              path={PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccessPage />}
            />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
