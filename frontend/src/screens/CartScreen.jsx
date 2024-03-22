import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useContext } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { CartContext } from "../context/CartState";
// import { addToCart, removeFromCart } from '../slices/cartSlice';


const CartScreen = () => {
  const { cartItems } = useContext(CartContext);
  const { addItem,removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  
  
  
  console.log(cartItems);
  const addToCartHandler = async (product) => {
    addItem(product)
    
  };

  const removeFromCartHandler = (id) => {
    removeItem(id)
  };


const navigateHandler = () => {
       
  // navigate('/login?redirect=/shipping/${userId}');
  navigate('/');
};

const checkoutHandler = () => {
       
    // navigate('/login?redirect=/shipping/${userId}');
    navigate('/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price * item.qty}</Col>
                  <Col md={2}>{item.measurement}</Col>
                  {/* <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col> */}
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Row>
        <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={navigateHandler}
              >
                Add another Snack Item
              </Button>
        </Row>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal   </h2>
                ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
