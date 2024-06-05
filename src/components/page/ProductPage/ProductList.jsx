import { Empty, Skeleton } from "antd";
import React from "react";
import styled from "styled-components";
import ProductCard from "../../ProductCard";

const ProductSkeletonStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
`;

const ProductList = ({ products, isLoading, isError }) => {
  if ((products?.length < 1 && !isLoading) || isError) {
    return <Empty description="There is no products to display" />;
  }

  if (isLoading) {
    return (
      <div className="products mb-3">
        <div className="row justify-content-center">
          {new Array(9).fill("").map((_, index) => {
            return (
              <ProductSkeletonStyle
                key={index}
                className="col-6 col-md-4 col-lg-4"
              >
                <Skeleton.Image active style={{ width: "100%", height: 275 }} />
                <Skeleton.Input />
                <Skeleton.Input block />
              </ProductSkeletonStyle>
            );
          })}
        </div>
      </div>
    );
  }

  if (!isLoading && products?.length > 0)
    return (
      <div className="products mb-3">
        <div className="row justify-content-center">
          {products.map((product, index) => {
            return (
              <div
                key={product?.id || index}
                className="col-6 col-md-4 col-lg-4"
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default ProductList;
