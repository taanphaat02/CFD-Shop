import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import Breadcrumb from "../../Breadcrumb";
import ProductFilter from "./ProductFilter";
import Pagination from "../../Pagination";
import ProductList from "./ProductList";
import ProductToolbox from "./ProductToolbox";
import useProductPage from "./useProductPage";

const ProductPage = () => {
  const { productsListProps, pagiProps, toolboxProps, filterProps } =
    useProductPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...toolboxProps} />
              <ProductList {...productsListProps} />
              <Pagination {...pagiProps} />
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
