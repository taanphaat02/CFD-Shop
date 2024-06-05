import React from "react";
import { PATHS } from "../../../constants/path";
import { Link } from "react-router-dom";
import { formatCurrency, transformNumberToPecent } from "../../../utils/format";
import ShareLink from "../../ShareLink";
import ProductColor from "../../ProductColor";
import ProductImageZoom from "../../ProductImageZoom";
import QuantityInput from "../../QuantityInput";
import { useSelector } from "react-redux";

const ProductDetailTop = ({
  id,
  discount,
  images,
  name,
  rating,
  reviews,
  price,
  description,
  color,
  category,
  stock,
  colorRef,
  quantityRef,
  handleAddToCart,
  handleAddToWishList,
  handleRemoveFromWishList,
}) => {
  const pathUrl = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;

  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToCart();
  };

  const { profile } = useSelector((state) => state.auth);
  const wishList = profile?.whiteList || [];
  const isProductInWishlist = wishList.some((item) => item.id === id);

  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${transformNumberToPecent(rating)}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ( {reviews?.length} Reviews)
              </a>
            </div>
            {discount > 0 ? (
              <div className="product-price">
                <span className="new-price">
                  {" "}
                  $ {formatCurrency(price - discount)}
                </span>

                <span className="old-price">Was $ {formatCurrency(price)}</span>
              </div>
            ) : (
              <div className="product-price"> $ {formatCurrency(price)} </div>
            )}
            <div
              className="product-content"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            {/* COLOR */}
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor ref={colorRef} colors={color} />
            </div>
            {/* QUANTITY */}
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <div className="product-details-quantity">
                <QuantityInput max={stock} ref={quantityRef} />
              </div>
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={_onAddToCart}
              >
                <span>add to cart</span>
              </a>
              {isProductInWishlist ? (
                <div className="details-action-wrapper">
                  <a
                    href="#"
                    className="btn-product btn-wishlist"
                    title="Wishlist"
                    onClick={(e) => {
                      e?.preventDefault();
                      handleRemoveFromWishList(id);
                    }}
                  >
                    <span>Remove from Wishlist</span>
                  </a>
                </div>
              ) : (
                <div className="details-action-wrapper">
                  <a
                    href="#"
                    className="btn-product btn-wishlist"
                    title="Wishlist"
                    onClick={(e) => {
                      e?.preventDefault();
                      handleAddToWishList(id);
                    }}
                  >
                    <span>Add to Wishlist</span>
                  </a>
                </div>
              )}
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <Link to={categoryPath}>{category?.name}</Link>
              </div>
              <div
                style={{ gap: "0 5px" }}
                className="social-icons social-icons-sm"
              >
                <span className="social-label">Share:</span>
                <ShareLink title={"Facebook"} path={pathUrl}>
                  <i className="icon-facebook-f" />
                </ShareLink>
                <ShareLink type="twitter" title={"Twitter"} path={pathUrl}>
                  <i className="icon-twitter" />
                </ShareLink>
                <ShareLink type="instagram" title={"Instagram"} path={pathUrl}>
                  <i className="icon-instagram" />
                </ShareLink>
                <ShareLink type="pinterest" title={"Pinterest"} path={pathUrl}>
                  <i className="icon-pinterest" />
                </ShareLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
