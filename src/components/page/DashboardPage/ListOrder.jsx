import React, { useState } from "react";
import useQuery from "../../../hook/useQuery";
import { authService } from "../../../services/authService";
import { useSelector } from "react-redux";
import { formatCurrency, formatDate } from "../../../utils/format";
import { PATHS } from "../../../constants/path";
import { orderServices } from "../../../services/orderServices";
import { Link } from "react-router-dom";
import { Empty } from "antd";

const ListOrder = () => {
  const { data: orderData } = useQuery(authService.getOrderMe);
  const myOrders = orderData?.orders;
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);

  return (
    <div className="tab-pane fade show active">
      {myOrders?.length > 0 ? (
        <>
          {myOrders?.map((order, orderIndex) => {
            const { createdAt, id } = order || {};
            const pathDetailOrder = PATHS.PROFILE.PROFILE_ORDER + `/${id}`;

            return (
              <>
                <table
                  key={orderIndex}
                  className="table table-cart table-mobile customTable"
                >
                  <thead>
                    <tr>
                      <th className="text-center">Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.product?.map((product, productIndex) => {
                      const { images, name, price, slug } = product || [];
                      console.log("🚀product---->", product);
                      let imagePath = images?.[0];
                      const pathProduct = PATHS.PRODUCTS + `/${slug}`;
                      return (
                        <tr key={productIndex}>
                          <td className="product-col">
                            <div className="product">
                              <figure className="product-media">
                                <a href={pathProduct}>
                                  <img src={imagePath} alt="Product image" />
                                </a>
                              </figure>
                              <h3 className="product-title">
                                <a href={pathProduct}>{name}</a>
                              </h3>
                            </div>
                          </td>
                          <td className="price-col text-center">{price}$</td>
                          <td className="quantity-col text-center">
                            x{order?.quantity?.[productIndex]}
                          </td>
                          <td className="total-col text-center">
                            <Link to={pathDetailOrder}>View</Link>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            );
          })}
        </>
      ) : (
        <div>
          <Empty description="No order has been made yet.">
            <Link to={PATHS.PRODUCTS} className="btn btn-outline-primary-2">
              <span>GO SHOP</span>
              <i className="icon-long-arrow-right" />
            </Link>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default ListOrder;
