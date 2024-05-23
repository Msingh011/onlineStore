import React, { useEffect, useState } from "react";
import { Products } from "../../Apis";
import { Link } from "react-router-dom";
import { ProductCategory } from "../../Apis";
import ReactPaginate from "react-paginate";
import { Select } from "antd";

export default function AllProducts() {
  const [productList, setProductList] = useState();
  const [productCategory, setProductCategory] = useState();

  //console.log("product List", ProductCategory);

  const handleSelectCataegory = (categories) => {
    productsByCategory(categories);
    //console.log("Filter categories", categories)
  };

  //Sorting
  const handleChange = (value) => {
    const tempArray = [...productList];
    if (value === "a-to-z") {
      tempArray.sort((element1, element2) =>
        element1.title.localeCompare(element2.title)
      );
      setProductList(tempArray);
    } else if (value === "z-to-a") {
      tempArray.sort((element1, element2) =>
        element1.title.localeCompare(element2.title)
      );
      tempArray.reverse();
      setProductList(tempArray);
    } else if (value === "low-to-high") {
      tempArray.sort((element1, element2) => element1.price - element2.price);
      setProductList(tempArray);
    } else {
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

  const productsByCategory = (category) => {
    fetch(Products.getProductByCategory + category)
      .then((response) => response.json())
      .then((json) => {
        setProductList(json.products);
      });
  };

  const productsCategory = () => {
    fetch(ProductCategory.getProductsCategory)
      .then((response) => response.json())
      .then((json) => {
        setProductCategory(json);
      });
  };

  useEffect(() => {
    products([0]);
    productsCategory();
  }, []);

  {/*begin:: Pagination Code*/}
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12;
    useEffect(() => { 
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      
      if(productList){
        setCurrentItems(productList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(productList.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, productList]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % productList.length;
     
      setItemOffset(newOffset);
    };
  {/*end:: Pagination Code*/}

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
            <p
              className="capitalize font-medium tracking-wide cursor-pointer"
              onClick={() => products([0])}
            >
              All
            </p>
            {productCategory?.length &&
              productCategory.sort().map((categories) => {
                return (
                  <p
                    key={categories}
                    onClick={() => {
                      handleSelectCataegory(categories);
                    }}
                    className="capitalize font-medium tracking-wide cursor-pointer"
                  >
                    {categories}
                  </p>
                );
              })}
          </div>

          <div className="w-10/12">
            <div className="Sorting mb-2">
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

            <div className="product-area mb-3">

         


              {currentItems &&
                currentItems?.map((index) => {
                  const productId = index?.id;
                  //console.log("productId", index);
                  return (
                    <div className="grid_1_of_3 images_1_of_3" key={productId} >
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

            {productList?.length >= 12 && 

            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          }

          </div>
        </div>
      </div>
    </>
  );
}
