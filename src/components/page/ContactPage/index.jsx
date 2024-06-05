import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { subscribeService } from "../../../services/subscribeService";
import useMutation from "../../../hook/useMutation";
import { useForm } from "react-hook-form";
import { MESSAGE, REGEX } from "../../../constants/validate";
import { message } from "antd";
import useQuery from "../../../hook/useQuery";
import { pageService } from "../../../services/pageServices";

const ContactPage = () => {
  const { execute } = useMutation(subscribeService.subsubscribe);
  const { data: serviceData } = useQuery(() =>
    pageService.getPageDataByName("service")
  );

  const service = serviceData?.data || {};
  console.log("🚀service---->", service);
  const { banner, description, address, title, working, workingSunday } =
    service || {};

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const _onSubmitForm = (value) => {
    handleSubscribe?.(value, reset);
  };

  const handleSubscribe = (formData, reset) => {
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.subject || "",
      description: formData?.message || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        message.success("Submit your question success");
        reset();
      },
      onFail: (error) => {
        console.log("Error subcribe", error);
      },
    });
  };

  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={PATHS.HOME}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact us
            </li>
          </ol>
        </div>
      </nav>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${banner || ""})`,
          }}
        >
          <h1 className="page-title text-white">
            Contact us <span className="text-white">keep in touch with us</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">{title || "Contact Information"}</h2>
              <p className="mb-3">{description || "description"}</p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker" /> {address || "USA"}
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <a href="tel:#">{service?.phone || ""}</a>
                      </li>
                      <li>
                        <i className="icon-envelope" />
                        <a href="mailto:#">{service?.email || ""}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o" />
                        <span className="text-dark">{working || ""}</span>
                        <br />
                      </li>
                      <li>
                        <i className="icon-calendar" />
                        <span className="text-dark">{workingSunday || ""}</span>
                        <br />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Got Any Questions?</h2>
              <p className="mb-2">
                Use the form below to get in touch with the sales team
              </p>
              <form
                className="contact-form mb-3"
                onSubmit={handleSubmit(_onSubmitForm)}
              >
                <div className="row">
                  <div className="col-sm-6">
                    {/* <label htmlFor="cname" className="sr-only">
                      Name
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Name *"
                      {...register("name", {
                        required: MESSAGE.required,
                      })}
                    />
                    <p className="form-error"> {errors?.name?.message || ""}</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      {...register("email", {
                        required: MESSAGE.required,
                        pattern: {
                          value: REGEX.email,
                          message: MESSAGE.emailSimple,
                        },
                      })}
                    />
                    <p className="form-error">{errors?.email?.message || ""}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Phone"
                      {...register("phone", {
                        pattern: {
                          value: REGEX.phone,
                          message: MESSAGE.phone,
                        },
                      })}
                    />
                    <p className="form-error">{errors?.phone?.message || ""}</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Subject"
                      {...register("subject")}
                    />
                  </div>
                </div>
                {/* <label htmlFor="cmessage" className="sr-only">
                  Message
                </label> */}
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Message *"
                  defaultValue={""}
                  {...register("message", {
                    required: MESSAGE.required,
                  })}
                ></textarea>
                <p className="form-error rowCustom ">
                  {errors?.message?.message || ""}
                </p>

                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>SUBMIT</span>
                  <i className="icon-long-arrow-right" />
                </button>
              </form>
            </div>
          </div>
          <hr className="mt-4 mb-5" />
          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="/assets/images/stores/img-1.jpg"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Wall Street Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Saturday 11am to 7pm</div>
                        <div>Sunday 11am to 6pm</div>
                        <a
                          href="https://www.google.com/maps"
                          className="btn btn-link"
                          target="_blank"
                        >
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="/assets/images/stores/img-2.jpg"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">One New York Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Friday 9am to 8pm</div>
                        <div>Saturday - 9am to 2pm</div>
                        <div>Sunday - Closed</div>
                        <a
                          href="https://www.google.com/maps"
                          className="btn btn-link"
                          target="_blank"
                        >
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.671652456593!2d106.6603257!3d10.7792694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752940e76e8ccb%3A0x9ed4e323c103e3d1!2sCFD%20Circle!5e0!3m2!1svi!2s!4v1685171988555!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
