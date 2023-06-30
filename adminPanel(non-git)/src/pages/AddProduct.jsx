import "../styles/addProductForm.css";
import { useState,useRef } from "react";
const AddProduct = () => {
    //   let url="https://infinite-sands-08332.herokuapp.com";
    let url="http://localhost:9000";
    const [productName, setproductName] = useState("");
    const [productType, setproductType] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [stock, setStock] = useState("");
    const images = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const image = images.current.files[0];
        const data = new FormData();
        data.append("productName", productName);
        data.append("productType", productType);
        data.append("stock", stock);
        data.append("price", price);
        data.append("discountedPrice", discountedPrice);
        data.append("category", category);
        data.append("image", image);
        console.log(data);
        fetch(`${url}/sone/addProduct`, {
            method: "POST",
            body:data
            }).then((res) => {
                console.log(res);
                alert("added")
            }).catch(err => {
                console.log(err);
                alert("unsuccessful");
            })
    }
    return (
        <div className="addproductpage">
            <h1>Add a Product</h1>
            <form onSubmit={submitHandler}>
                <div className="row">
                    <label htmlFor="productName">Product Name :</label>
                    <input value={productName} onChange={(e)=>{setproductName(e.target.value)}}  type="text" id="productName"/>
                </div>
                <div className="row">
                    <label htmlFor="productName">Category :</label>
                    <input value={category} onChange={(e)=>{setCategory(e.target.value)}}  type="text" id="category"/>
                </div>
                <div className="row">
                    <label htmlFor="productType">Product Type:</label>
                    <input  value={productType} onChange={(e)=>{setproductType(e.target.value)}} type="text" id="productType"/>
                </div>
                <div className="row">
                    <label htmlFor="price">Price:</label>
                    <input value={price} onChange={(e)=>{setPrice(e.target.value)}}  type="number" id="price"/>
                </div>
                <div className="row">
                    <label htmlFor="discountedPrice">Discounted Price:</label>
                    <input  value={discountedPrice} onChange={(e)=>{setDiscountedPrice(e.target.value)}} type="number" id="discountedPrice"/>
                </div>
                <div className="row">
                    <label htmlFor="stock">Stock:</label>
                    <input  value={stock} onChange={(e)=>{setStock(e.target.value)}} type="number" id="stock"/>
                </div>
                <div className="row">
                    <input type="file" id="image" ref={images} />
                </div>
                <div className="row">
                    <button>Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;