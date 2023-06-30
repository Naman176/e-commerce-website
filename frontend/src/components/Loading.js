import icon from "../assets/images/cart-icon-28356.png";
import React from "react";
import "../assets/css/extras.css"
const Loading = () => {
    return (
        <div className="backdrop">
            <div className="loader">
                <img  src={icon}></img>
            </div>
        </div>
    )
}
export default Loading;