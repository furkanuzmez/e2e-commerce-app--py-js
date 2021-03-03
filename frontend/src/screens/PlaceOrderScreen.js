import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form , Row , Col , Button, ListGroup ,Image ,Card } from "react-bootstrap"

import { useDispatch, useSelector} from 'react-redux'
import Loader  from '../components/Loader'
import Message from '../components/Message'
import { login , register } from "../actions/userActions"  
import FormContainer from "../components/FormContainer"
import CheckoutSteps  from "../components/CheckoutSteps"
import { saveShippingAddress} from '../actions/cartActions'
import { savePaymentMethod} from '../actions/cartActions'
import { createOrder} from '../actions/orderActions'

function PlaceOrderScreen({history}) { 

    const dispatch = useDispatch()
    const orderCreate = useSelector(state => state.orderCreate)
    const {order,error,success} = orderCreate
    const cart = useSelector(state => state.cart) 

    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0 ).toFixed(2)
    cart.shippingPrice = ( cart.itemsPrice > 100 ? 0 : 10 ) .toFixed(3)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    console.log(cart.itemsPrice)


    useEffect(() => { 
      if(success){ 

        history.push(`/orders/${order._id}/`)
      // Order Create Reset Gelicek WARNNNN!!!!
      }
    },[success])
    console.log('Order Screen')
    console.log(cart.shippingAddress)
    console.log(Object.values(cart)[0])
    console.log(Object.values(cart)[0].address) 
    const placeOrder = () => {
      dispatch(createOrder({
          orderItems: cart.cartItems,
          shippingAddress:Object.values(cart)[0],
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
      }))
  }





    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/> 
            <Row>
                 <Col md={8}> 
                 <ListGroup variant="flush">
                 <ListGroup.Item> 
                <h2>Shipping</h2>

                <p> 
                   <strong> Shipping:</strong>
                   {cart.shippingAdress.address} , {cart.shippingAdress.city} 
                   {'  '}
                   {cart.shippingAdress.postalCode} 
                   {'  '}
                   {cart.shippingAdress.country} 

                    
                </p>     
                     
                     
                </ListGroup.Item>     

                <ListGroup.Item> 
                <h2>Payment Method</h2>

                <p> 
                   <strong> Method:</strong>
                   {cart.paymentMethod}  
                    

                    
                </p>     
                     
                     
                </ListGroup.Item>

                <ListGroup.Item> 

                <h2>Order Items</h2>
                 { cart.cartItems.length === 0 ? <Message variant="info"> Your Chart is Empty </Message> : ( 
                  <ListGroup variant="flush">
                    { cart.cartItems.map((item,index) => 
                    <ListGroup.Item key={index}>
                        <Row> 
                         <Col md={1}>
                           <Image src={item.image} alt={item.name}  fluid rounded/>
                          </Col>
                          <Col>
                           <Link to={`/product/${item.product}`}> {item.name} </Link>
                           </Col>

                           <Col md={4}>
                           {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                    </ListGroup.Item>
                    
                    )}
                  </ListGroup> 

                 )}
                     
                     
                     
                </ListGroup.Item>

                </ListGroup>
                 
                
                 </Col>  

                 <Col md={4} >
                     <Card> 
                       <ListGroup variant="flush"> 
                           <ListGroup.Item> 
                               <h2> Order Summary </h2>
                           </ListGroup.Item>
                           <ListGroup.Item> 
                           <Row> 
                             
                             <Col>Item:  </Col>
                             <Col>$ {cart.itemsPrice}  </Col> 
                           </Row>
                           </ListGroup.Item> 

                           <ListGroup.Item> 
                           <Row> 
                             <Col>Ship:</Col>
                             <Col>${cart.shippingPrice}</Col> 
                           </Row>
                           </ListGroup.Item>

                           <ListGroup.Item> 
                           <Row> 
                             <Col>Tax:</Col>
                             <Col>${cart.taxPrice}</Col> 
                           </Row>
                           </ListGroup.Item>

                           <ListGroup.Item> 
                           <Row> 
                             <Col>total:</Col>
                             <Col>${cart.totalPrice}</Col> 
                           </Row>
                           </ListGroup.Item>
                           

                           <ListGroup.Item> 
                          <Button type =" button"
                          className='btn-block'
                          disabled={cart.cartItems === 0 }
                          onClick = {placeOrder}
                          > 

                             Place Order

                          </Button>
                           </ListGroup.Item>
                       </ListGroup>

                     </Card>
                     
                     
                     
                 </Col>
            </Row>

        </div>
    )
}

export default PlaceOrderScreen
