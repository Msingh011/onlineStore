import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SingleProduct } from "../../Apis";
import { ProductSlider } from "../../ProductSlider";
import moment from "moment";

export default function SingleProductPage() {
  const location = useLocation();
  const pid = location.pathname.split("/")[3] || {};
  const [singleProduct, setSingleProduct] = useState();

  const singleProducts = () => {
    fetch(SingleProduct.getSingleProduct + pid)
      .then((response) => response.json())
      .then((json) => {
        setSingleProduct(json);
        console.log("ProdutDetails", json);
      });
  };

  useEffect(() => {
    singleProducts();
  }, []);

  const stars = Array(5).fill(0);

  return (
    <>
      <div className="container mx-auto">
        <section id="product-info" className="my-5">
          <div className="item-image-parent mr-10">
            <ProductSlider images={singleProduct?.images} />
          </div>
          <div className="item-info-parent">
            <div className="main-info">
              <h4>{singleProduct?.title}</h4>
              <div className="star-rating">
                {stars.map((_, index) => {
                  // Render filled stars for indices less than the rating
                  if (index < singleProduct?.rating) {
                    return <span key={index}>&#9733;</span>; // Filled star
                  }
                  return <span key={index}>&#9734;</span>; // Empty star
                })}
              </div>
              <p className="mb-2">
                Price: <span id="price">₹ {singleProduct?.price}</span>
              </p>
            </div>

            {/* <p>Rating: {renderStars(Math.round(singleProduct.rating))}</p> */}

            <div className="select-items">
              <div className="change-size">
                <label className="mr-3">
                  <b>Category: {singleProduct?.category?.toUpperCase()}</b>
                </label>
                <label>
                  {
                    singleProduct?.brand?
                  <b>Brand: {singleProduct?.brand?.toUpperCase()}</b>
                  :   null
                  }
                </label>
              </div>

              <div className="description mt-3">
                <p className="card-desc p-0">{singleProduct?.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info my-5 mx-auto" style={{ width: "95%" }}>
          <div className="tabset">
            <input
              type="radio"
              name="tabset"
              id="tab1"
              defaultChecked
              aria-controls="productinfo"
              className="input"
            />
            <label htmlFor="tab1">Product Info</label>

            <input
              type="radio"
              name="tabset"
              id="tab2"
              aria-controls="reviews"
              className="input"
            />
             <label htmlFor="tab2">Reviews</label>

            <input
              type="radio"
              name="tabset"
              id="tab3"
              aria-controls="shipping"
              className="input"
            />
             <label htmlFor="tab3">Shipping Information</label>

            <div className="tab-panels">
              <section id="productinfo" className="tab-panel">
                <p>
                  <strong>Brand :</strong> {singleProduct?.brand}
                </p>
                <p>
                <strong>Waranty :</strong> {singleProduct?.warrantyInformation}
                </p>
                <p>
                  <strong>Weight :</strong> {singleProduct?.weight}
                </p>
              </section>

              <section id="reviews" className="tab-panel">
                {singleProduct &&
                  singleProduct?.reviews?.map((reviews) => {
                    //console.log("reviewsindex", reviews);
                    return (
                      <div className="testimonial-box">
                        <div className="box-top">
                          <div className="profile">
                            <div className="profile-img">
                              <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                              </div>
                            <div className="name-user">
                              <strong>{reviews.reviewerName}</strong>
                              <span>{reviews.reviewerEmail}</span>
                            </div>
                          </div>
                          <div className="reviews">
                            {stars.map((_, index) => {
                              if (index < reviews.rating) {
                                return <span key={index}>&#9733;</span>; 
                              }
                              return <span key={index}>&#9734;</span>; 
                            })}
                          </div>
                        </div>

                        <div className="client-comment">
                          <p>{reviews.comment}.</p>
                          <p className="small-dats">
                            <span className="mr-2">
                              {moment(reviews.date).format("DD/MM/YYYY")}
                            </span>
                            |
                            <span className="ml-2">
                              {moment(reviews.date).format("hh-mm A")}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </section>
            
              <section id="shipping" className="tab-panel">
              <p>
                <strong>Dimensions :</strong>  Depth : {singleProduct?.dimensions.depth} | Height : {singleProduct?.dimensions.height} | width : {singleProduct?.dimensions.width} | Weight : {singleProduct?.weight}
              </p>
              <p>
                <strong>Shipping Time :</strong> {singleProduct?.shippingInformation}
              </p>
              <p>
                <strong>sku :</strong> {singleProduct?.sku}
              </p>
              <p>
                <strong>Return Policy :</strong>  Depth {singleProduct?.returnPolicy}
              </p>
              <p>
                <strong>qrCode :</strong> 
                <img src={singleProduct?.meta.qrCode} style={{width: "100px"}}/>
              </p>
              </section>
            
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
