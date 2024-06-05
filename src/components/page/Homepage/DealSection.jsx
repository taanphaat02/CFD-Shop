import moment from "moment";
import React from "react";
import CountDown from "../../CountDown";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { formatCurrency } from "../../../utils/format";
import ProductCard from "../../ProductCard";

const DealSection = ({ dealProducts }) => {
  const targetTime = moment()
    .add(1, "day")
    .set({ hours: 17, minute: 0, second: 0, millisecond: 0 });

  const dealOfTheDayProduct = dealProducts[0] || {};

  return (
    <div className="bg-light deal-container pt-7 pb-7 mb-5">
      <div className="container">
        <div className="heading text-center mb-4">
          <h2 className="title">Deals &amp; Outlet</h2>
          <p className="title-desc">Today’s deal and more</p>
        </div>
        <div className="row">
          <div className="col-lg-6 deal-col">
            <div
              className="deal"
              style={{
                backgroundImage:
                  'url("assets/images/demos/demo-3/deal/bg-1.jpg")',
              }}
            >
              <div className="deal-top">
                <h2>Deal of the Day.</h2>
                <h4>Limited quantities. </h4>
              </div>
              <div className="deal-content">
                <h3 className="product-title">
                  <Link to={PATHS.PRODUCTS + `/${dealOfTheDayProduct.slug}`}>
                    {dealOfTheDayProduct.name}
                  </Link>
                </h3>
                <div className="product-price">
                  <span className="new-price">
                    $
                    {formatCurrency(
                      dealOfTheDayProduct.price - dealOfTheDayProduct.discount
                    )}
                  </span>
                  <span className="old-price">
                    Was ${formatCurrency(dealOfTheDayProduct.price)}
                  </span>
                </div>
                <Link
                  to={PATHS.PRODUCTS + `/${dealOfTheDayProduct.slugs}`}
                  className="btn btn-link"
                >
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
              {/* COUNT DOW */}
              <div className="deal-bottom">
                <CountDown targerTime={targetTime} />
                {/* <div className="deal-countdown" data-until="+10h" /> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="products">
              <div className="row">
                <div className="col-6">
                  {dealProducts?.[1] && (
                    <ProductCard product={dealProducts[1]} />
                  )}
                </div>
                <div className="col-6">
                  {dealProducts?.[2] && (
                    <ProductCard product={dealProducts[2]} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more-container text-center mt-3 mb-0">
          <Link
            to={PATHS.PRODUCTS}
            className="btn btn-outline-dark-2 btn-round btn-more"
          >
            <span>Shop more</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealSection;
