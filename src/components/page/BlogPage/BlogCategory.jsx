import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import Breadcrumb from "../../Breadcrumb";
import useQuery from "../../../hook/useQuery";
import { blogService } from "../../../services/blogService";
import { formatDate } from "../../../utils/format";
import Aside from "./Aside";

const BlogCategory = () => {

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="entry-container max-col-2" data-layout="fitRows">
                {blogs?.map((blog, index) => {
                  const {
                    author,
                    description,
                    createdAt,
                    image,
                    id,
                    name,
                    slug,
                  } = blog || [];
                  // console.log("🚀blog---->", blog);
                  const blogDetailPath = PATHS.BLOG + `/${slug}`;
                  return (
                    <div key={id + index} className="entry-item col-sm-6">
                      <article className="entry entry-grid">
                        <figure className="entry-media">
                          <Link to={blogDetailPath}>
                            <img src={image} alt={name} />
                          </Link>
                        </figure>
                        <div className="entry-body">
                          <div className="entry-meta">
                            <span>{formatDate(createdAt)}</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                              {" "}
                              by <Link to={blogDetailPath}>{author}</Link>
                            </span>
                          </div>
                          <h2 className="entry-title">
                            <Link to={blogDetailPath} className="limited-text">
                              {name}
                            </Link>
                          </h2>
                          <div className="entry-content">
                            <p
                              className="entry-content-desc"
                              dangerouslySetInnerHTML={{
                                __html: description,
                              }}
                            ></p>
                            <Link to={blogDetailPath} className="read-more">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
              
            </div>
            <Aside blogPopularTop5={blogPopularTop5} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogCategory;
