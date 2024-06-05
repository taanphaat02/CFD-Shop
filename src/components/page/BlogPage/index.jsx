import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import Breadcrumb from "../../Breadcrumb";
import useQuery from "../../../hook/useQuery";
import { blogService } from "../../../services/blogService";
import { formatDate } from "../../../utils/format";
import Aside from "./Aside";

const BlogPage = () => {
  const { data: blogsData } = useQuery(blogService.getBlogs);
  const { data: caterogyData } = useQuery(blogService.getCategories);

  const blogs = blogsData?.blogs || [];
  const categories = caterogyData?.blogs || [];
  
  const blogPopular = blogs?.filter((blog) => blog.isPopular) || [];
  const blogPopularTop5 = blogPopular.slice(0, 5);

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
              {/* <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a
                      className="page-link page-link-prev"
                      href="#"
                      aria-label="Previous"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-left" />
                      </span>
                      Prev{" "}
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link page-link-next"
                      href="#"
                      aria-label="Next"
                    >
                      {" "}
                      Next{" "}
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-right" />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
            <Aside blogPopularTop5={blogPopularTop5} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
