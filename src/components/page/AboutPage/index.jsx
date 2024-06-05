import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { pageService } from "../../../services/pageServices";
import useQuery from "../../../hook/useQuery";
import Breadcrumb from "../../Breadcrumb";

const AboutPage = () => {
  const { data: aboutData } = useQuery(() =>
    pageService.getPageDataByName("about us")
  );
  const info = aboutData?.data || {};

  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );
  const brands = homeData?.data?.brands || [];

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>About us</Breadcrumb.Item>
      </Breadcrumb>

      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${info?.banner})`,
          }}
        >
          <h1 className="page-title text-white">
            About us <span className="text-white">Who we are</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h2 className="title">{info?.title1}</h2>
              <p>{info?.description1}</p>
            </div>
            <div className="col-lg-6">
              <h2 className="title">{info?.title2}</h2>
              <p>{info?.description2}</p>
            </div>
          </div>
          <div className="mb-5" />
        </div>
        <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">{info?.title3}</h2>
                <p className="lead text-primary mb-3">{info?.description3}</p>
                <p className="mb-2">{info?.descriptionBrand}</p>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="about-images">
                  <img src={info?.image1} alt className="about-img-front" />
                  <img src={info?.image2} alt className="about-img-back" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="brands-text">
                <h2 className="title">{info?.titleBrand}</h2>
                <p>{info?.descriptionBrand}</p>
              </div>
            </div>
            <div className="col-lg-7">
              {brands?.length > 0 && (
                <div className="brands-display">
                  <div className="row justify-content-center">
                    {brands?.map((item, index) => {
                      return (
                        <div key={index} className="col-6 col-sm-4">
                          <a href="#" className="brand" onClick={handleClick}>
                            <img src={item} alt="Brand Name" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-2" />
      </div>
    </main>
  );
};

export default AboutPage;
