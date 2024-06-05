import React from "react";
import useQuery from "../../../hook/useQuery";
import { orderServices } from "../../../services/orderServices";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";

const CheckoutSuccessPage = () => {
  const { data: orderData } = useQuery(orderServices.getOrders);

  const ordersList = orderData?.orders || [];
  const orderEndList = ordersList?.[ordersList?.length - 1];
  console.log("🚀orderEndList---->", orderEndList);
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order <strong>{orderEndList?.id}</strong> has been completed.
            Your order details are shown for your personal accont.{" "}
          </p>
          <Link
            to={PATHS.PROFILE.PROFILE_ORDER}
            className="btn btn-outline-primary-2 btn-minwidth-lg"
          >
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
