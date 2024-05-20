import React, { useEffect, useState } from "react";
import { ProductCategory } from "../Apis";


export default function AllCategory () {

    const[productCategory, setProductCategory] = useState ();
    const productsCategory = () => {
        fetch(ProductCategory.getProductsCategory)
        .then((response) => response.json())
        .then((json) => {
            setProductCategory(json);
        });
    };

  useEffect (() => {
    productsCategory();
  },[]);
    return (
        <>
        <ul>
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
            </ul>
        </>
    )
};