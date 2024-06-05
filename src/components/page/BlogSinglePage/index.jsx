import React from "react";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import useQuery from "../../../hook/useQuery";
import { blogService } from "../../../services/blogService";
import Breadcrumb from "../../Breadcrumb";
import { formatDate } from "../../../utils/format";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Aside from "../BlogPage/Aside";

const BlogSinglePage = () => {
  const { slug } = useParams();
  const urlBlog = window.location.href;
  const { data: blogDetailData } = useQuery(
    () => blogService.getBlogBySlug(slug),
    [slug]
  );
  const { data: blogsData } = useQuery(blogService.getBlogs);
  const blogs = blogsData?.blogs || [];
  const blogPopular = blogs?.filter((blog) => blog.isPopular) || [];
  const blogPopularTop5 = blogPopular.slice(0, 5);
  const {
    author,
    category,
    createdAt,
    createdUser,
    description,
    image,
    name,
    tags,
  } = blogDetailData || {};

  const handleClick = (e) => {
    e?.preventDefault();
  };

  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.BLOG}>Blog</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <article className="entry single-entry">
                <div className="entry-body">
                  <figure className="entry-media">
                    <img src={image || ""} alt={name || ""} />
                  </figure>
                  <h1 className="entry-title entry-title-big">{name || ""}</h1>
                  <div className="entry-meta">
                    <span>{formatDate(createdAt)}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author">
                      {" "}
                      by{" "}
                      <a href="#" onClick={handleClick}>
                        {author}
                      </a>
                    </span>
                  </div>
                  <div
                    className="entry-content editor-content"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  <div className="entry-footer row no-gutters flex-column flex-md-row">
                    <div className="col-md">
                      <div className="entry-tags">
                        <span>Tags:</span>
                        <a href="#" onClick={handleClick}>
                          photography
                        </a>
                        <a href="#" onClick={handleClick}>
                          style
                        </a>
                      </div>
                    </div>
                    <div className="col-md-auto mt-2 mt-md-0">
                      <div className="social-icons social-icons-color">
                        <span className="social-label">Share this post:</span>
                        <div className="wrapButton">
                          <FacebookShareButton url={urlBlog} quote="share">
                            <FacebookIcon round size={30} />
                          </FacebookShareButton>
                          <TwitterShareButton url={urlBlog} quote="share">
                            <TwitterIcon round size={30} />
                          </TwitterShareButton>
                          <PinterestShareButton url={urlBlog} quote="share">
                            <PinterestIcon round size={30} />
                          </PinterestShareButton>
                          <LinkedinShareButton url={urlBlog} quote="share">
                            <LinkedinIcon round size={30} />
                          </LinkedinShareButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <nav className="pager-nav" aria-label="Page navigation">
                <a
                  className="pager-link pager-link-prev"
                  href="#"
                  aria-label="Previous"
                  tabIndex={-1}
                  onClick={handleClick}
                >
                  {" "}
                  Previous Post{" "}
                  <span className="pager-link-title">
                    Cras iaculis ultricies nulla
                  </span>
                </a>
                <a
                  className="pager-link pager-link-next"
                  href="#"
                  aria-label="Next"
                  tabIndex={-1}
                  onClick={handleClick}
                >
                  {" "}
                  Next Post{" "}
                  <span className="pager-link-title">
                    Praesent placerat risus
                  </span>
                </a>
              </nav>
              {/* <div className="related-posts">
                <h3 className="title">Related Posts</h3>
                <div
                  className="owl-carousel owl-simple"
                  data-toggle="owl"
                  data-owl-options='{
                              "nav": false, 
                              "dots": true,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":1
                                  },
                                  "480": {
                                      "items":2
                                  },
                                  "768": {
                                      "items":3
                                  }
                              }
                          }'
                >
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="blog-single.html">
                        <img
                          src="/assets/images/blog/grid/3cols/post-1.jpg"
                          alt="image desc"
                        />
                      </a>
                    </figure>
                    <div className="entry-body">
                      <div className="entry-meta">
                        <span>Nov 22, 2018</span>
                        <span className="meta-separator">|</span>
                        <span className="entry-author">
                          {" "}
                          by <a href="#" onClick={handleClick}></a>
                        </span>
                      </div>
                      <h2 className="entry-title">
                        <a href="blog-single.html">
                          Cras ornare tristique elit.
                        </a>
                      </h2>
                    </div>
                  </article>
                  
                </div>
              </div> */}
              <div className="comments">
                <h3 className="title">3 Comments</h3>
                <ul>
                  <li>
                    <div className="comment">
                      <figure className="comment-media">
                        <a href="#" onClick={handleClick}>
                          <img
                            src="/assets/images/blog/comments/1.jpg"
                            alt="User name"
                          />
                        </a>
                      </figure>
                      <div className="comment-body">
                        <a
                          href="#"
                          className="comment-reply"
                          onClick={handleClick}
                        >
                          Reply
                        </a>
                        <div className="comment-user">
                          <h4>
                            <a href="#" onClick={handleClick}>
                              Jimmy Pearson
                            </a>
                          </h4>
                          <span className="comment-date">
                            November 9, 2018 at 2:19 pm
                          </span>
                        </div>
                        <div className="comment-content">
                          <p>
                            Sed pretium, ligula sollicitudin laoreet viverra,
                            tortor libero sodales leo, eget blandit nunc tortor
                            eu nibh. Nullam mollis. Ut justo. Suspendisse
                            potenti.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div className="comment">
                          <figure className="comment-media">
                            <a href="#" onClick={handleClick}>
                              <img
                                src="/assets/images/blog/comments/2.jpg"
                                alt="User name"
                              />
                            </a>
                          </figure>
                          <div className="comment-body">
                            <a
                              href="#"
                              className="comment-reply"
                              onClick={handleClick}
                            >
                              Reply
                            </a>
                            <div className="comment-user">
                              <h4>
                                <a href="#" onClick={handleClick}>
                                  Lena Knight
                                </a>
                              </h4>
                              <span className="comment-date">
                                November 9, 2018 at 2:19 pm
                              </span>
                            </div>
                            <div className="comment-content">
                              <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="comment">
                      <figure className="comment-media">
                        <a href="#" onClick={handleClick}>
                          <img
                            src="/assets/images/blog/comments/3.jpg"
                            alt="User name"
                          />
                        </a>
                      </figure>
                      <div className="comment-body">
                        <a
                          href="#"
                          className="comment-reply"
                          onClick={handleClick}
                        >
                          Reply
                        </a>
                        <div className="comment-user">
                          <h4>
                            <a href="#" onClick={handleClick}>
                              Johnathan Castillo
                            </a>
                          </h4>
                          <span className="comment-date">
                            November 9, 2018 at 2:19 pm
                          </span>
                        </div>
                        <div className="comment-content">
                          <p>
                            Vestibulum volutpat, lacus a ultrices sagittis, mi
                            neque euismod dui, eu pulvinar nunc sapien ornare
                            nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                            dapibus sed, urna.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="reply">
                <div className="heading">
                  <h3 className="title">Leave A Reply</h3>
                  <p className="title-desc">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                </div>
                <form action="#">
                  <label htmlFor="reply-message" className="sr-only">
                    Comment
                  </label>
                  <textarea
                    name="reply-message"
                    id="reply-message"
                    cols={30}
                    rows={4}
                    className="form-control"
                    required
                    placeholder="Comment *"
                    defaultValue={""}
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="reply-name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reply-name"
                        name="reply-name"
                        required
                        placeholder="Name *"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="reply-email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="reply-email"
                        name="reply-email"
                        required
                        placeholder="Email *"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-outline-primary-2">
                    <span>POST COMMENT</span>
                    <i className="icon-long-arrow-right" />
                  </button>
                </form>
              </div>
            </div>
            <Aside blogPopularTop5={blogPopularTop5} currentAuthor={author} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogSinglePage;
