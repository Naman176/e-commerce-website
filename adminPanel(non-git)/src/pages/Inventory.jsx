import "../styles/Inventory.css";
import { useState,useEffect } from "react";
import Modal from "./Modifyingmodal";
import editicon from "../assets/editicon.png";
import ImgModal from "./ImgModal";
const Inventory = () => {
    const [Data, setData] = useState([]);
    const [modal,setModal]=useState(false);
    const [imgmodal,setimgModal]=useState(false);
    const [modaldata,setModalData]=useState({});
    const fetchData = async () => {
        // const url = "https://infinite-sands-08332.herokuapp.com/getProducts";
        const url = "http://localhost:9000/getProducts";
        const response =await fetch(url);
        await response.json().then((data) => {
            setData(data); console.log(data);
        } );
        
    }
    // {
    //     "_id": "61f149cb5c925a39ebcde2c3",
    //     "productID": 4,
    //     "productName": "product 5",
    //     "stock": 10,
    //     "category": [
    //         "strategy"
    //     ],
    //     "productType": "image",
    //     "price": 2000,
    //     "discountedPrice": 1500,
    //     "image": "1643203019134-881877155final logo.png",
    //     "__v": 0
    // }
    useEffect(fetchData, [modal,imgmodal]);
    const modalHandler=(event)=>{
        let idx=event.target.getAttribute("data-idx");
        console.log(Data[idx]);
        setModal(true);
        setModalData(Data[idx]);
    }
    const imageModalHandler=(event)=>{
        let idx=event.target.getAttribute("data-idx");
        console.log(Data[idx]);
        setimgModal(true);
        setModalData(Data[idx]);
    }
    return (
        <div>
        {modal&&<Modal data={modaldata} closeModal={setModal}></Modal>}
        {imgmodal&&<ImgModal data={modaldata} closeModal={setimgModal}></ImgModal>}
        <div className="inventorypage">
            <h1>Inventory</h1>
            {Data.length !== 0 &&
                <table>
                    <thead>
                    <tr>
                                <th>
                                    Image
                                </th>
                                <th>Product Name </th>
                                <th>category</th>
                                <th>Product Type</th>
                                <th>Price</th>
                                <th>Discounted Price</th>
                                <th>Stock</th>
                                <th></th>
                            </tr>
                    </thead>
                    <tbody>

                    {Data.map((data,index) => {
                        const url = "https://infinite-sands-08332.herokuapp.com/static/" +  data.image ;
                        return (
                            <tr key={data.id}> 
                                <td key={data.id}>
                                    <img src={url} alt="product" />
                                    <img data-idx={index} className="editicon" onClick={imageModalHandler} src={editicon}></img>
                                </td>
                                <td key={data.id}>{data.productName }</td>
                                <td key={data.id}>{data.category.map((cat)=>{return <span>{cat} </span>}) }</td>
                                <td key={data.id}>{data.productType }</td>
                                <td key={data.id}>{data.price }</td>
                                <td key={data.id}>{data.discountedPrice }</td>
                                <td key={data.id}>{data.stock }</td>
                                <td><button data-idx={index} onClick={modalHandler}>Edit</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
           }
        </div>
        </div>
    );
}

export default Inventory;