import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Flone</h1>
          <p>
          Welcome to Flone, your ultimate destination for all your online shopping needs! 
          Flone is a cutting-edge e-commerce platform that offers a wide range of products, 
          exceptional customer service, and a seamless shopping experience. Whether you're 
          looking for trendy fashion items, high-quality electronics, home decor, or health
           and beauty products, Flone has it all....
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
