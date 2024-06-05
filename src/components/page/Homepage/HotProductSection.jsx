import React, { useEffect, useState } from "react";
import owlCarousels from "../../../utils/owlCarousels";
import cn from "../../../utils/cn";
import ProductCard from "../../ProductCard";

const TABS = {
  featured: "Featured",
  on_sale: "On Sale",
  top_rated: "Top Rated",
};

const HotProductSection = ({
  featuredProducts,
  onSaleProducts,
  topRatedProducts,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS.featured);

  const _onTabChange = (e, tab) => {
    e.preventDefault();
    setSelectedTab("");
    setTimeout(() => {
      setSelectedTab(tab);
    }, 200);
  };

  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.featured:
        return featuredProducts;

      case TABS.on_sale:
        return onSaleProducts;

      case TABS.top_rated:
        return topRatedProducts;

      default:
        return [];
    }
  };

  const renderProducts = _getSelectedProducts(selectedTab);

  useEffect(() => {
    owlCarousels();
  }, [selectedTab, featuredProducts, onSaleProducts, topRatedProducts]);

  return (
    <div className="container featured" style={{ height: 550 }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.featured,
            })}
            href="#products-featured-tab"
            onClick={(e) => _onTabChange(e, TABS.featured)}
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.on_sale,
            })}
            href="#products-sale-tab"
            onClick={(e) => _onTabChange(e, TABS.on_sale)}
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.top_rated,
            })}
            href="#products-top-tab"
            onClick={(e) => _onTabChange(e, TABS.top_rated)}
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          className={cn("tab-pane p-0 fade", {
            "show active": renderProducts?.length > 0,
          })}
          // className="tab-pane p-0 fade show active"
        >
          {renderProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                     "nav": true, 
                                                     "dots": true,
                                                     "margin": 20,
                                                     "loop": false,
                                                     "responsive": {
                                                         "0": {
                                                             "items":2
                                                         },
                                                         "600": {
                                                             "items":2
                                                         },
                                                         "992": {
                                                             "items":3
                                                         },
                                                         "1200": {
                                                             "items":4
                                                         }
                                                     }
                                                 }'
            >
              {renderProducts?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotProductSection;
