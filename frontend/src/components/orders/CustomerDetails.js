import React from "react";
// {
//     "_id": "6219c6377032a4ce1d027664",
//     "userID": "62123147d291463517807d3d",
//     "name": "Rishi Gupta",
//     "phone": 8770856060,
//     "products": [
//         {
//             "_id": "61f149cb5c925a39ebcde2c3",
//             "productID": 4,
//             "productName": "product 5",
//             "stock": 6,
//             "category": [
//                 "strategy"
//             ],
//             "productType": "image",
//             "price": 2000,
//             "discountedPrice": 1500,
//             "image": "1643203019134-881877155final logo.png",
//             "__v": 0,
//             "quantity": 1,
//             "selectedProductColor": null,
//             "selectedProductSize": null,
//             "cartItemId": "37551b1b-01e8-4622-bbd9-038f61ffb26d"
//         }
//     ],
//     "address": "pardeshipura indore",
//     "deliverOption": "Pickup",
//     "note": "",
//     "email": "grishi634@gmail.com",
//     "status": "PLACED",
//     "__v": 0
// }
const CustomerDetail = ({orderDetail}) => {
    return (<div className="container px-1 px-md-4 py-5 mx-auto">
        <h3>Details</h3>
       
        <div className="card p-5 d-flex flex-column justify-content-center align-items-baseline">
            <div>
            <h4>{orderDetail.name}</h4>
            <p className="m-0">{orderDetail.address}</p>
           
        Phone Number :
                {orderDetail.phone}
               {orderDetail.note&& <div>Note:
                    {orderDetail.note}</div>}
                <div>email: { orderDetail.email}</div>
            
        </div>
      
        </div>
        </div>);
}


export default CustomerDetail;