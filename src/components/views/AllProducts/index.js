import React, { useEffect, useState } from "react";
import { Products } from "../../Apis";
import { Link } from "react-router-dom";
import { ProductCategory } from "../../Apis";
import AllCategory from "../../Category";
import { Select } from "antd";

export default function AllProducts() {
  const [productList, setProductList] = useState();
  console.log("product List", ProductCategory);


  const handleChange = (value) => {
    const tempArray = [...productList];
    
    if (value === "a-to-z") {
      tempArray.sort((element1, element2) => element1.title.localeCompare(element2.title));
      setProductList(tempArray);
    } else if (value === "z-to-a") {
      tempArray.sort((element1, element2) => element1.title.localeCompare(element2.title));
      tempArray.reverse();
      setProductList(tempArray);
    }
    else if (value === "low-to-high"){
        tempArray.sort((element1, element2) => element1.price - element2.price);
        setProductList(tempArray);
    }
    else {
        tempArray.sort((element1, element2) => element2.price - element1.price);
        setProductList(tempArray);
    }
  };

  const products = (limit) => {
    fetch(Products.getProducts + limit)
      .then((response) => response.json())
      .then((json) => {
        setProductList(json.products);
      });
  };

  useEffect(() => {
    products([0]);
  }, []);

  return (
    <>
      <div className="banner h-52 bg-gray-200 flex items-center justify-center">
        <p className="text-2xl font-medium m-0" style={{ color: "#474747" }}>
          All Products
        </p>
      </div>

      <div className="container mx-auto">
        <div className="flex my-10">
          <div className="content-sidebar w-2/12">
            <h4>Categories</h4>
            <AllCategory />
          </div>

          <div className="w-10/12">
            <div className="Sorting mb-5">
              <div className="flex">
                <div className="d-flex">
                  <span className="mr-2">Price</span>
                  <span>
                    <Select
                      style={{ width: 120 }}
                      placeholder="Select Price"
                      onChange={handleChange}
                      allowClear
                      options={[
                        { value: "low-to-high", label: "Low To High" },
                        { value: "high-to-low", label: "High To Low" },
                      ]}
                    />
                  </span>
                </div>

                <div className="d-flex">
                  <span className="mr-2">Sorting</span>
                  <span>
                    <Select
                      style={{ width: 120 }}
                      placeholder="Select Alphabetical"
                      onChange={handleChange}
                      allowClear
                      options={[
                        { value: "a-to-z", label: "A - Z" },
                        { value: "z-to-a", label: "Z - A" },
                      ]}
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="product-area">
              {productList &&
                productList?.map((index) => {
                  const productId = index?.id;
                  console.log("productId", index);
                  return (
                    <div className="grid_1_of_3 images_1_of_3">
                      <Link to={`/singleProductPage/${productId}`}>
                        <img src={index?.images[0]} />
                        <div className="grid_1_of_3_details h-auto p-0">
                          <h2 className="mt-3">$ {index.price}</h2>
                          <h4>{index?.title}</h4>
                          <p className="card-desc">{index?.description}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
