import React from "react";
import { Card, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import i1 from "../../assets/images/1642594831254-768274791i1.PNG";
import i2 from "../../assets/images/1642672514514-555806003i7.PNG";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

// const serverURL = "https://infinite-sands-08332.herokuapp.com/static/";
const serverURL = "http://localhost:9000/static/";

const Order = ({data}) => {
    let totalprice = 0;
    data.products.map((value) => {
        totalprice += value.discountedPrice * value.quantity;
    })
    const dest = `/Orderdetail/${data._id}`;
    return (<>
                <div className="row">
                  <div className="col-12">
                   
                    <Card style={{padding:"1rem"}}>
                        <Row>
                            <Col md="5">
                                <Card.Title>
                                    Order Status : {data.status}
                                </Card.Title>
                            </Col>
                            <Col md="5">
                                <Card.Title>
                                    Order Total :  {totalprice}₹
                                </Card.Title>
                            </Col>
                           
                        </Row>
                    
                    <Card.Body>
                        <ListGroup variant="flush">
                            
                            {data.products.map((product, index) => {
                                if (index >= 2) return;
                                return (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col >
                                                <Image style={{ height: "100px" }} rounded={true} fluid={true} src={serverURL+product.image}></Image>
                                            </Col>
                                            <Col >
                                                <h4>{product.productName }</h4>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                       })}
                       
                            {data.products.length>2&&<ListGroup.Item className="text-center">
                                +{data.products.length-2} Items
                            </ListGroup.Item>}     
                            <ListGroup.Item className="text-center">
                                <Button>
                                    <Link style={{ color: "white" }} to={dest}>
                                        View Details
                                </Link>
                                </Button>
                            </ListGroup.Item>
                    </ListGroup>
                    </Card.Body>    
                    </Card>
                   
                  </div>
                </div>
    </>)
}

  
export default  (Order);