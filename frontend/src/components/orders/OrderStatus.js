import React from "react";
import "../../assets/css/OrderStatus.css";
const OrderStatus = ({id,status, deliverOption }) => {
    let method = 1;
    if (deliverOption === "Pickup") {
        method = 0;
    }
    let arr = ["step0", "step0", "step0", "step0"];
    if (status ==="PLACED") { arr[0] = "active step0" }
    else if (status === "SHIPPED" || status === "READY") { arr[1] = "active step0";arr[0] = "active step0" }
    else if (status === "ONWAY") { arr[2] = "active step0";arr[1] = "active step0";arr[0] = "active step0" }
    else {
        arr[3] = "active step0"; arr[2] = "active step0"; arr[1] = "active step0"; arr[0] = "active step0";
    }
    return (
<div className="container px-1 px-md-4 py-5 mx-auto">
    <div className="card">
        <div className="row d-flex justify-content-between px-3 top">
            <div className="d-flex">
                <h5>ORDER <span className="text-primary font-weight-bold">#{id}</span></h5>
            </div>
            <div className="d-flex flex-column text-sm-right">
                <p className="mb-0">Expected Arrival <span>01/12/19</span></p>
                {/* <p>USPS <span className="font-weight-bold">234094567242423422898</span></p> */}
            </div>
        </div> 
        <div className="row d-flex justify-content-center">
            <div className="col-12">
                <ul id="progressbar" className="text-center">
                    <li className={arr[0]}></li>
                    <li className={arr[1]}></li>
                   { method===1&&<li className={arr[2]}></li>}
                    <li className={arr[3]}></li>
                </ul>
            </div>
        </div>
        <div className="row justify-content-between top">
            <div className="row d-flex icon-content"> <img className="icon" src="https://i.imgur.com/9nnc9Et.png"/>
                <div className="d-flex flex-column">
                    <p className="font-weight-bold">Order<br/>Processed</p>
                </div>
            </div>
            <div className="row d-flex icon-content"> <img className="icon" src="https://i.imgur.com/u1AzR7w.png"/>
                <div className="d-flex flex-column">
                    {method===1&&<p className="font-weight-bold">Order<br/>Shipped</p>}
                    {method===0&&<p className="font-weight-bold">Order<br/>Ready to be picked</p>}
                </div>
            </div>
           {method===1&& <div className="row d-flex icon-content"> <img className="icon" src="https://i.imgur.com/TkPm63y.png"/>
                <div className="d-flex flex-column">
                    <p className="font-weight-bold">Order<br/>En Route</p>
                </div>
            </div>}
            <div className="row d-flex icon-content"> <img className="icon" src="https://i.imgur.com/HdsziHP.png"/>
                <div className="d-flex flex-column">
                  {method===1&&  <p className="font-weight-bold">Order<br/>Arrived</p>}
                  {method===0&&  <p className="font-weight-bold">Order<br/>Picked</p>}
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default OrderStatus;