import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { sliderContent } from "../../SliderImages";
import { Products } from "../../Apis";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import AllCategory from "../../Category";

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
      .then((json) => {
        setProductList(json.products);
      });
  };

  useEffect(() => {
    products(30);
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


            {/* <ProductSlider images={[]} /> */}


            <div className="content-grids">
              <div className="top-3-grids">
                <div className="product-area">
                  {productList &&
                    productList?.splice(0, 6)?.map((data) => {
                      const productId = data?.id;
                      console.log("productId", data);
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
                    productList?.splice(6, 6)?.map((data, index) => {
                      const productId = data?.id;
                      //console.log("productId", index, data);
                      return (
                        <div className="grid_1_of_4 images_1_of_4 products-info">
                          <Link
                            to={{
                              pathname: "/singleProductPage",
                              state: {
                                productId: productId,
                              },
                            }}
                          >
                            <img src={data?.images[0]} />
                            <p className="card-desc">{data?.description}</p>
                            <h3>$ {data?.price}</h3>
                            <ul>
                              <li>
                                <a className="cart">
                                  <AiOutlineShoppingCart style={contentStyle} />
                                </a>
                              </li>
                              <li>
                                <a className="i">
                                  <AiFillHeart style={contentStyle} />
                                </a>
                              </li>
                            </ul>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="content-sidebar">
              <h4>Categories</h4>
              <AllCategory />
              {/* <ul>
                {productCategory?.length &&
                  productCategory.sort().map((categories) => {
                    return (
                      <li key={categories}>
                        <a
                          href="#"
                          className="capitalize font-medium tracking-wide"
                        >
                          {categories}
                        </a>
                      </li>
                    );
                  })}
              </ul> */}
            </div>
          </div>
        </div>
        <div className="clear"> </div>
      </div>
    </>
  );
}
