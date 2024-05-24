import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SingleProduct } from "../../Apis";
import { ProductSlider } from "../../ProductSlider";

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
  },[]);

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
                <span>★★★★</span>★
              </div>
              <p className="mb-2">
                Price: <span id="price">₹ {singleProduct?.price}</span>
              </p>
            </div>

            <div className="select-items">
              <div className="change-size">
                <label className="mr-3">
                  <b>Category: {singleProduct?.category?.toUpperCase()}</b>
                </label>
                <label>
                  <b>Brand: {singleProduct?.brand?.toUpperCase()}</b>
                </label>
              </div>

              <div className="description mt-3">
                <p className="card-desc p-0">{singleProduct?.description}</p>
              </div>
            </div>

            <div className="product-info border-2 border-dark ">

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
