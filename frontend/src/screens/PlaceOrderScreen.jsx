// import React, { useEffect } from 'react';
import { useContext} from 'react';
import { Link, useNavigate  } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { GlobalContext } from "../context/GlobalState";
import { isValidElement, createElement } from 'react';
import { CartContext } from "../context/CartState";
import { ShippingContext } from "../context/ShippingState";

const PlaceOrderScreen = () => {
  
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  const id = user._id;
  
  const { cartItems } = useContext(CartContext);
  const [orderItems, setOrderItems] = useState([]);
  const { shippingAddress } = useContext(ShippingContext);
  console.log(shippingAddress);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  const shippingPrice = addDecimals(itemsPrice < 201 ? 50 : itemsPrice > 200 && itemsPrice < 501 ? 30 : itemsPrice > 500 && itemsPrice < 1001 ?20:0);
  const taxPrice = 0;

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  console.log(cartItems);
  console.log(itemsPrice);
 
  

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {

      const newOrder = {
        userId: id,
        orderItems: cartItems,
        
        shippingAddress:shippingAddress,
        
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
   }
     
  const res = await createOrder({
    newOrder
    // userId: id,
    // // orderItems: cartItems,
    
    // // shippingAddress:shippingAddress,
    
    // itemsPrice: itemsPrice,
    // shippingPrice: shippingPrice,
    // taxPrice: taxPrice,
    // totalPrice: totalPrice,
  }).unwrap();
  dispatch(clearCartItems());
  navigate(`/order/${res._id}`);
} catch (err) {
  toast.error(err);
}
};


  
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode},{" "}
                {shippingAddress.phoneNumber}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        {/* <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col> */}
                        <Col>
                          {/* <Link to={`/product/₹{item.product}`}> */}
                            ({item.name})
                          {/* </Link> */}
                        </Col>
                        <Col md={2}>({item.measurement})</Col>
                        <Col md={2}>({item.price * item.qty})</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
  
};

export default PlaceOrderScreen;
