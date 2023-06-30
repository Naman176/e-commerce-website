import React from 'react'
import {useState} from 'react';

function Modal({data,closeModal}) {
    
    const [productName, setproductName] = useState(data.productName);
    const [productType, setproductType] = useState(data.productType);
    const [category, setCategory] = useState(data.category);
    const [price, setPrice] = useState(data.price);
    const [discountedPrice, setDiscountedPrice] = useState(data.discountedPrice);
    const [stock, setStock] = useState(data.stock);
    //   let url="https://infinite-sands-08332.herokuapp.com";
    let url="http://localhost:9000";
    const submitHandler=(e)=>{
        e.preventDefault();
        fetch(`${url}/modifyProduct`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productID:data.productID,
                productName,
                productType,
                category,
                price,
                discountedPrice,
                stock,
                image:data.image
            }) 
        }).then(res=>{
            res.json().then(result=>{
                alert(result);
                closeModal(false);
            })
        }).catch(err=>{
            alert(err);
        })
    }
    const deleteone=()=>{
        fetch(`${url}/deleteProduct`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productID:data.productID,
                productName,
                productType,
                category,
                price,
                discountedPrice,
                stock,
                image:data.image
            }) 
        }).then(res=>{
            res.json().then(result=>{
                alert(result);
                closeModal(false);
            })
        }).catch(err=>{
            alert(err);
        })
    }
  return (
    <div>
        <div className='addproductpage modal' >
        
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
                    <button type='submit'>Add</button>
                    <button onClick={deleteone}>remove</button>
                    <button onClick={()=>{closeModal(false);}}>close</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Modal