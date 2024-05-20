import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { sliderContent } from "../../SliderImages";
import { Products } from "../../Apis";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const contentStyle = {
  width: "100%",
  height: "100%",
};

export default function Home() {

  const [productList, setProductList] = useState();

  console.log("productList1", productList );

  const products = (limit) => {
    fetch(Products.getProducts + limit)
      .then((response) => response.json())
      .then((response) => {
        setProductList(response.products);
      });
  };

  useEffect(() => {
    products(50);
  }, []);

  return (
    <>
      <div id="home_wraper">
        <div className="slider">
          <Carousel autoplay>
            {sliderContent.map((sliderImage) => {
              const { image } = sliderImage;
              return (
                <div>
                  <img src={image} className="w-100 h-100" />
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="container mx-auto">
          <div className="mt-5">        
            <div className="content-grids">
              <div className="top-3-grids">
                <div className="product-area">
                  {productList &&
                    productList?.splice(0, 8)?.map((data) => {
                      const productId = data?.id;
                     // console.log("productId", data);
                      return (
                        <div className="grid_1_of_3 images_1_of_3">
                          <Link
                            to={`/singleProductPage/${productId}`}
                          >
                            <img src={data?.images[0]} />
                            <div className="grid_1_of_3_details h-auto p-0">
                            <h3>{data?.title}</h3>
                              <h3>$  {data?.price}</h3>
                              <p className="card-desc">{data?.description}</p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="mt-5">
                <h4 className="p-0 m-0">Deals of the day</h4>
                <div className="product-area">
                  {productList &&
                    productList?.splice(8, 8)?.map((data, index) => {
                      const productId = data?.id;
                      //console.log("productId", index, data);
                      return (
                        <div className="grid_1_of_4 images_1_of_4 products-info">
                          <Link
                             to={`/singleProductPage/${productId}`}
                          >
                            <img src={data?.images[0]} />
                            <p className="card-desc">{data?.description}</p>
                            <h3>$ {data?.price}</h3>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>           
          </div>
        </div>
        <div className="clear"> </div>
      </div>
    </>
  );
}
