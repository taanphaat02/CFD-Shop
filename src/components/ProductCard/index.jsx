import { Empty, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import styled from "styled-components";
import { PATHS } from "../../constants/path";
import { useSelector } from "react-redux";
import useProductDetailPage from "../page/ProductDetailPage/useProductDetailPage";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const { productDetailTopProps } = useProductDetailPage();
  const {
    handleAddToWishList,
    handleRemoveFromWishList,
    handleAddCartDefault,
  } = {
    ...productDetailTopProps,
  };
  const { id, slug, color, title, price, rating, images, discount, stock } =
    product || {};
  const productPath = PATHS.PRODUCTS + `/${slug}`;
  const { profile } = useSelector((state) => state.auth);
  const wishList = profile?.whiteList || [];
  const isProductInWishlist = wishList.some((item) => item.id === id);

  return (
    <div className="product product-2">
      <figure className="product-media">
        {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
        <Link to={productPath} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images?.[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty
                description="Không có hình ảnh"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </ImageWrapper>
          )}
        </Link>
        {isProductInWishlist ? (
          <div className="product-action-vertical">
            <a
              className="btn-product-icon btn-wishlist btn-expandable wishlisted"
              onClick={() => handleRemoveFromWishList(id)}
            >
              <span>remove from wishlist</span>
            </a>
          </div>
        ) : (
          <div className="product-action-vertical">
            <a
              className="btn-product-icon btn-wishlist btn-expandable"
              onClick={() => handleAddToWishList(id)}
            >
              <span>add to wishlist</span>
            </a>
          </div>
        )}

        <div className="product-action product-action-dark">
          <a
            // href="#"
            title="Add to cart"
            className="btn-product btn-cart"
            onClick={() =>
              handleAddCartDefault(id, color?.[0], price, discount)
            }
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productPath}>{title || ""}</Link>{" "}
        </h3>
        <div className="product-price">
          {discount ? (
            <>
              {" "}
              <span className="new-price">
                ${formatCurrency(price - discount)}
              </span>
              <span className="old-price">Was ${formatCurrency(price)}</span>{" "}
            </>
          ) : (
            <> ${formatCurrency(price || 0)} </>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating || 0) * 20}%` }}
            />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
