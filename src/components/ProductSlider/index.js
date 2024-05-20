import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const ProductSlider = (props) => {
  console.log("images", props);
  return (
    <>

          {props.images && props.images.length > 0 ? (
            <Carousel showThumbs={true} showIndicators={false} infiniteLoop={true} autoPlay={true}> 
              {props.images.map((image, index) => {
                return (
                    <img className="dynamicImages" src={image} alt="img" />
                );
              })}
            </Carousel>
          ) : (
            <p className="align-items-center d-flex h-100 h-105px justify-content-center w-100">
              No Data Found
            </p>
          )}
         
      
    </>
  );
};
