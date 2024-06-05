import { Empty, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { formatCurrency } from "../../../utils/format";
import useProductDetailPage from "../ProductDetailPage/useProductDetailPage";

const WishList = () => {
  const { productDetailTopProps } = useProductDetailPage();
  const { handleRemoveFromWishList, handleAddCartDefault } = {
    ...productDetailTopProps,
  };
  const { profile } = useSelector((state) => state.auth);
  const wishList = profile?.whiteList || [];

  return (
    <div
      className="tab-pane fade show active"
      id="tab-wishlist"
      role="tabpanel"
      aria-labelledby="tab-wishlist-link"
    >
      {wishList?.length > 0 ? (
        <>
          <table className="table table-wishlist table-mobile">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Stock Status</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {wishList?.map((item, index) => {
                const {
                  id,
                  slug,
                  name,
                  images,
                  price,
                  stock,
                  color,
                  discount,
                } = item || {};
                const productPath = PATHS.PRODUCTS + `/${slug}`;
                let imagePath =
                  "https://cfdshop.hn.ss.bfcplatform.vn/images/product/" +
                  images?.[0];

                let isStocking = stock > 0 ? true : false;

                return (
                  <tr key={index + id}>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-media">
                          <Link to={productPath}>
                            <img src={imagePath} alt="Product image" />
                          </Link>
                        </figure>
                        <h3 className="product-title">
                          <Link to={productPath}>{name || "Product"}</Link>
                        </h3>
                      </div>
                    </td>
                    <td className="price-col text-center">
                      ${formatCurrency(price)}
                    </td>
                    <td className="stock-col text-center">
                      <span
                        className={isStocking ? "in-stock" : "out-of-stock"}
                      >
                        {isStocking ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="action-col">
                      {isStocking ? (
                        <button
                          className="btn btn-block btn-outline-primary-2"
                          onClick={() =>
                            handleAddCartDefault(
                              id,
                              color?.[0],
                              price,
                              discount
                            )
                          }
                        >
                          <i className="icon-cart-plus" />
                          Add to Cart{" "}
                        </button>
                      ) : (
                        <button className="btn btn-block btn-outline-primary-2 disabled">
                          Out of Stock
                        </button>
                      )}
                    </td>
                    <td className="remove-col">
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveFromWishList(id)}
                      >
                        <i className="icon-close" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div>
          <Empty description="No product in wishlist yet.">
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

export default WishList;
