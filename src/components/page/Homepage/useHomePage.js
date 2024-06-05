import { useState } from "react";
import useQuery from "../../../hook/useQuery";
import { pageService } from "../../../services/pageServices";
import { productService } from "../../../services/productService";
import useMutation from "../../../hook/useMutation";
import { subscribeService } from "../../../services/subscribeService";
import { message } from "antd";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../../constants/message";

const useHomePage = () => {
  const { data: productsData } = useQuery(productService.getProducts);
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );
  const { data: categoriesData } = useQuery(productService.getCategories);
  const { execute: dealExecute } = useMutation(subscribeService.subscribeDeal);

  const products = productsData?.products || [];

  const featuredProducts =
    products?.filter((product) => product.featured) || [];

  const onSaleProducts = products?.filter((product) => product.onSale) || [];

  const topRatedProducts =
    products?.filter((product) => product.topRated) || [];

  const dealProducts = onSaleProducts?.filter(
    (product) => product.discount > 0
  );

  const introProducts = featuredProducts?.slice(0, 3);

  const brands = homeData?.data?.brands || [];

  const services = homeData?.data?.information || {};

  // CATEGORY
  const categories = categoriesData?.products || [];

  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const featureProducts =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );

  // SUBSCRIBE
  const handleSubscribeDeal = (email, callback) => {
    if (email) {
      dealExecute(email, {
        onSuccess: (data) => {
          message.success(HOME_MESSAGE.dealSuccess);
          callback?.();
        },
        onFail: (error) => {
          console.log("🚀error---->", error);
          message.error(GENERAL_MESSAGE.error);
        },
      });
    }
  };
  //   PROPS
  const introProps = {
    introProducts,
  };
  const hotProductProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
  };

  const brandProps = {
    brands,
  };

  const serviceProps = {
    services,
  };

  const dealProps = {
    dealProducts,
  };

  const getDealProps = {
    handleSubscribeDeal,
  };

  const featuredProps = {
    categories: [{ name: "All", slug: "all" }, ...categories],
    featureProducts,
    selectedCateSlug,
    handleSelectCate: (slug) => setSelectedCateSlug(slug),
  };

  return {
    introProps,
    hotProductProps,
    brandProps,
    serviceProps,
    dealProps,
    featuredProps,
    getDealProps,
  };
};
export default useHomePage;
