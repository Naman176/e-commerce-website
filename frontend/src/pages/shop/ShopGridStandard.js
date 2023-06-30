import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect, useSelector } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';

const ShopGridStandard = ({location,Products,isLogin,SetUserLogin}) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [products, setProducts] = useState([]);
    const pageLimit = 15;
    // const {pathname} = location;
    const ProductData = useSelector(state => {  return state.productData.products });
    useEffect(() => {
        setProducts(ProductData);
    }, [ProductData])
   
    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }
    const searchResults = (products, key) => {
        let regex = new RegExp(key,"i");
        let Searchedarray = products.filter(product => regex.test(product.productName));
        return Searchedarray;
      }
    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        let searchedProducts = searchResults(filterSortedProducts, searchKeyword);
        sortedProducts = searchedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue,searchKeyword]);

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem> */}

            <LayoutOne headerTop="visible" isLogin={isLogin} SetUserLogin={SetUserLogin}> 
                {/* breadcrumb */}
                {/* <Breadcrumb /> */}

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row d-flex flex-row flex-wrap-reverse">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar
                                 setSearchKeyword={setSearchKeyword}    products={products} getSortParams={getSortParams} sideSpaceClass="mr-30" />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array
}

const mapStateToProps = state => {
 
    return{
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(ShopGridStandard);