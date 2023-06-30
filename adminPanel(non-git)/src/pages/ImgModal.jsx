import React from 'react'
import { useState,useRef } from "react";
export default function ImgModal({closeModal,data}) {
    // let url="https://infinite-sands-08332.herokuapp.com";
    let url="http://localhost:9000";
     const images = useRef();
     const submitHandler=(e)=>{
        e.preventDefault();
        const image=images.current.files[0];
        const Data = new FormData();
        console.log(data);
        Data.append("productID", data.productID);
        Data.append("productName", data.productName);
        Data.append("productType", data.productType);
        Data.append("stock", data.stock);
        Data.append("price", data.price);
        Data.append("discountedPrice", data.discountedPrice);
        Data.append("category", data.category);
        Data.append("image", image);
        fetch(`${url}/modifyImage`, {
            method: "POST",
            body:Data
            }).then((res) => {
                console.log(res);
                alert("added")
                closeModal(false)
            }).catch(err => {
                console.log(err);
                alert("unsuccessful");
            })
     }
  return (
     <div>
        <div className='addproductpage modal' >
            <form onSubmit={submitHandler}>
                 <div className="row">
                    <input type="file" id="image" ref={images} />
                </div>
                <div className="row">
                    <button>Add</button>
                    <button onClick={()=>{closeModal(false)}}>close</button>
                </div>
            </form>
        </div>
    </div>
  )
}
