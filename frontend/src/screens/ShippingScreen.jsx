import React, {  useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { useAddressMutation } from '../slices/usersApiSlice';
// import { CartContext } from "../context/CartState";
import { ShippingContext } from "../context/ShippingState";


const ShippingScreen = () => {
  const {userId } = useParams();
  const { saveShippingAddress } = useContext(ShippingContext);
  
  // const { saveShippingAddress } = useContext(CartContext);
  // const { shippingAddress } = useContext(CartContext);
  
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('') ;
  // const [shippingAddress, setShippingAddress] = useState({
  //   address: "",
  //   city: "",
  //   postalCode: "",
  //   phoneNumber: "",
  // }) ;

 
//  const [userAddress, { isLoading: loadingAddress }] =
//  useAddressMutation(userId);

const [userAddress] = useAddressMutation(userId);

//  const [address, setAddress] = useState('');
//   const [city, setCity] = useState('') ;
//   const [postalCode, setPostalCode] =useState('') ;
  // const [phoneNumber, setPhoneNumber] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  

  const fetchAddress = async (e) => {
    console.log("userAddress");
    try {
      const data = await userAddress({
        userId,     
      }).unwrap();
      setAddress(data.address);
      setCity(data.city);
      setPostalCode(data.postalCode);
      setPhoneNumber(data.phoneNumber);
      setIsDisabled(true);
     
      } catch (err) {  
    }
  }

 

  const differentAddress = async (e) => {
    console.log("userAddress");
    setAddress('');
    setCity('');
    setPostalCode('');
    setPhoneNumber('');
    setIsDisabled(false);
      
  }
 
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testAddress = (e) => {
    e.preventDefault();
   
    // setShippingAddress({
    //   address: address,
    //   city: city,
    //   postalCode: postalCode,
    //   phoneNumber: phoneNumber

    // })

    const shippingAddress = {
         address: address,
      city: city,
      postalCode: postalCode,
      phoneNumber: phoneNumber
    }
    console.log(shippingAddress);
    saveShippingAddress(shippingAddress);
   
    // navigate(`/placeorder`,{ state: { id: 7, color: 'green' } });
    // navigate(`/placeorder address={address} city={city} postalCode={postalCode} phoneNumber={phoneNumber}`);
    // navigate(`/placeorder`);
    
    // navigate('/placeorder');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingAddress = {
      address: address,
   city: city,
   postalCode: postalCode,
   phoneNumber: phoneNumber
 }
 console.log(shippingAddress);
 saveShippingAddress(shippingAddress);
   
   
   
    // navigate(`/placeorder`,{ state: { id: 7, color: 'green' } });
    // navigate(`/placeorder address={address} city={city} postalCode={postalCode} phoneNumber={phoneNumber}`);
    navigate(`/placeorder`);
    
    // navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Button className='m-2 '  onClick={fetchAddress}  variant='primary' >
          Get Shipping Address
        </Button>
        <Button className='m-2 '  onClick={differentAddress}  variant='primary'>
          Different Address?
        </Button>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2 ' controlId='address'  >
          <Form.Label>Address</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city' >
          <Form.Label>City</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='phoneNumber'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter Phone Number'
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='m-2 '  onClick={testAddress}  variant='primary' >
          Get Shipping Address
        </Button>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      
         </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
