import PropTypes from "prop-types";
import React from "react";
import {
  getUniqueCategories,
  getUniqueTags,
  getUniqueColors,
  getProductsUniqueSizes
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";

const ShopSidebar = ({ products,setSearchKeyword, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getUniqueCategories(products);
  const uniqueColors = getUniqueColors(products);
  const uniqueSizes = getProductsUniqueSizes(products);
  const uniqueTags = getUniqueTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch
        setSearchKeyword={setSearchKeyword}
      />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />

      {/* filter by color */}
   {/* {   <ShopColor colors={uniqueColors} getSortParams={getSortParams} />} */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  setSearchKeyword:PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
