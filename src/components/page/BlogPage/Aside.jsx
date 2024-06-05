import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format";
import { PATHS } from "../../../constants/path";
import useQuery from "../../../hook/useQuery";
import { blogService } from "../../../services/blogService";

const Aside = ({ blogPopularTop5, currentAuthor }) => {
  const { data: blogsData } = useQuery(blogService.getBlogs);

  const blogs = blogsData?.blogs || [];

  const handleClick = (e) => {
    e?.preventDefault();
  };

  const sameAuthorBlogs = blogs.filter((blog) => blog.author === currentAuthor);

  return (
    <aside className="col-lg-3">
      <div className="sidebar">
        <div className="widget widget-search">
          <h3 className="widget-title">Search</h3>
          <form action="#">
            <label htmlFor="ws" className="sr-only">
              Search in blog
            </label>
            <input
              type="search"
              className="form-control"
              name="ws"
              id="ws"
              placeholder="Search in blog"
              required
            />
            <button type="submit" className="btn">
              <i className="icon-search" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="widget widget-cats">
          <h3 className="widget-title">Categories</h3>
          <ul>
            <li>
              <a href="#" onClick={handleClick}>
                Lifestyle <span>3</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Shopping <span>3</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Fashion <span>1</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Travel <span>3</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Hobbies <span>2</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="widget">
          <h3 className="widget-title">Popular Posts</h3>
          <ul className="posts-list">
            {blogPopularTop5?.map((blog, index) => {
              const { slug, image, name, createdAt } = blog || {};
              const blogDetail = PATHS.BLOG + `/${slug}`;
              return (
                <li key={index}>
                  <figure>
                    <Link to={blogDetail}>
                      <img src={image} alt="post" />
                    </Link>
                  </figure>
                  <div>
                    <span>{formatDate(createdAt)}</span>
                    <h4>
                      <Link to={blogDetail} className="limited-text">
                        {name}
                      </Link>
                    </h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>{" "}
        {sameAuthorBlogs?.length > 0 && (
          <div className="widget">
            <h3 className="widget-title">
              More from{" "}
              <span className="customWidgetTitle">{currentAuthor}</span>
            </h3>
            <ul className="posts-list">
              {sameAuthorBlogs?.map((blog, index) => {
                const { slug, image, name, createdAt } = blog || {};
                const blogDetail = PATHS.BLOG + `/${slug}`;
                return (
                  <li key={index}>
                    <figure>
                      <Link to={blogDetail}>
                        <img src={image} alt="post" />
                      </Link>
                    </figure>
                    <div>
                      <span>{formatDate(createdAt)}</span>
                      <h4>
                        <Link to={blogDetail} className="limited-text">
                          {name}
                        </Link>
                      </h4>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="widget widget-banner-sidebar">
          <div className="banner-sidebar-title">ad box 280 x 280</div>
          <div className="banner-sidebar banner-overlay">
            <Link to={PATHS.PRODUCTS}>
              <img src="/assets/images/blog/sidebar/banner.jpg" alt="banner" />
            </Link>
          </div>
        </div>
        <div className="widget">
          <h3 className="widget-title">Browse Tags</h3>
          <div className="tagcloud">
            <a href="#" onClick={handleClick}>
              fashion
            </a>
            <a href="#" onClick={handleClick}>
              style
            </a>
            <a href="#" onClick={handleClick}>
              women
            </a>
            <a href="#" onClick={handleClick}>
              photography
            </a>
            <a href="#" onClick={handleClick}>
              travel
            </a>
            <a href="#" onClick={handleClick}>
              shopping
            </a>
            <a href="#" onClick={handleClick}>
              hobbies
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
