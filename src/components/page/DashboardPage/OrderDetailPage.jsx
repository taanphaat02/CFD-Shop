import React from "react";
import useQuery from "../../../hook/useQuery";
import { orderServices } from "../../../services/orderServices";
import { Link, useParams } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../utils/format";
import { PATHS } from "../../../constants/path";

const OrderDetailPage = () => {
  const { id } = useParams();

  const { data: detailData } = useQuery(
    () => orderServices.getOrderById(id),
    [id]
  );
  console.log("🚀detailData---->", detailData);
  const {
    createdAt,
    discountCoupon = detailData?.discount,
    idOrder = id,
    note,
    paymentMethod,
    subTotal,
    total,
  } = detailData || {};
  const { firstName } = detailData?.customer || {};
  const { phone, street } = detailData?.address || {};
  const { priceShip = detailData?.shipping?.price, typeShip } =
    detailData?.shipping || {};

  const listProduct = detailData?.product || [];

  const totalItems =
    detailData?.quantity?.reduce((total, quantity) => total + quantity) ||
    detailData?.quantity;

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="tab-orders"
        role="tabpanel"
        aria-labelledby="tab-orders-link"
      >
        <h3
          className="page-title text-center"
          style={{ color: "#fcb941", fontWeight: 500 }}
        >
          ORDER DETAIL
        </h3>
        <div className="row">
          <div className="col-lg-6">
            <div className="card card-dashboard">
              <div className="card-body">
                <h3 className="card-title">Order Overview</h3>
                <p>
                  <strong>Order ID: </strong> {idOrder} <br />
                </p>
                <p>
                  <strong>Order Date: </strong>
                  {formatDate(createdAt)}
                  <br />
                </p>
                <p>
                  <strong>Payment Method: </strong>
                  {paymentMethod} <br />
                </p>
                <p>
                  <strong>Total: </strong>${total} <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card card-dashboard">
              <div className="card-body">
                <h3 className="card-title">Order Shipping</h3>
                <p>
                  <strong>Customer: </strong> {firstName} <br />
                </p>
                <p>
                  <strong>Phone: </strong>
                  {phone}
                  <br />
                </p>
                <p>
                  <strong>Address: </strong>
                  {street} <br />
                </p>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-cart table-mobile customTable">
          <thead>
            <tr>
              <th className="text-center">Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Color</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {listProduct?.map((pro, proIndex) => {
              const { name, price, slug, discount } = pro || {};
              const pathProduct = PATHS.PRODUCTS + `/${slug}`;
              return (
                <tr key={detailData?.id}>
                  <td className="product-col">
                    <div
                      className="product text-center"
                      style={{ justifyContent: "center" }}
                    >
                      <h3 className="product-title">
                        <a href={pathProduct}> {name} </a>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    {discount > 0 ? (
                      <>
                        <span className="new-price">
                          $
                          {formatCurrency(
                            price - detailData?.product?.[proIndex]?.discount
                          )}
                        </span>
                        <span className="old-price">
                          <del>${formatCurrency(price)}</del>
                        </span>
                      </>
                    ) : (
                      <>${formatCurrency(price)}</>
                    )}
                  </td>
                  <td className="total-col text-center">
                    <div
                      className="customDotColor"
                      style={{
                        background: `${detailData?.variant?.[proIndex]}`,
                      }}
                    ></div>
                  </td>
                  <td className="quantity-col text-center ">
                    <div className="">x{detailData?.quantity?.[proIndex]}</div>
                  </td>
                  <td className="total-col text-center">
                    ${formatCurrency(detailData?.totalProduct?.[proIndex])}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            <tr>
              <td></td>
              <td scope="row" colSpan={3} className="customColText text-center">
                Total items:
              </td>
              <td className=" customColText text-center">{totalItems} items</td>
            </tr>
            <tr>
              <td></td>
              <td scope="row" colSpan={3} className="customColText text-center">
                Subtotal:
              </td>

              <td className=" customColText text-center"> ${subTotal}</td>
            </tr>
            {discountCoupon > 0 && (
              <tr>
                <td></td>
                <td
                  scope="row"
                  colSpan={3}
                  className="customColText text-center"
                >
                  Coupon:
                </td>

                <td className=" customColText text-center">
                  - ${discountCoupon}
                </td>
              </tr>
            )}
            <tr>
              <td></td>
              <td scope="row" colSpan={3} className="customColText text-center">
                Shipping:
              </td>
              <td className=" customColText text-center"> ${priceShip}</td>
            </tr>
            <tr>
              <td></td>
              <td
                scope="row"
                colSpan={3}
                className="customColText text-center total-col"
              >
                <strong>Total:</strong>
              </td>
              <td className=" customColText text-center total-col">
                <strong>${total}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetailPage;
