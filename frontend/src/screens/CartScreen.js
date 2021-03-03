import React , { useEffect} from 'react'
import { Link } from 'react-router-dom' 
import { Row , Col , Image , ListGroup , Button , Card, Form , ListGroupItem }  from "react-bootstrap"
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {addToCart,removeFromCart}  from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps"
function CartScreen( { match , location , history}) { 

     const productId = match.params.id 
     const qty = location.search  ? Number(location.search.split('=')[1]) : 1 
     console.log(qty)

     const dispatch = useDispatch() 
     const cart = useSelector(state => state.cart)
     const { cartItems } = cart 
     console.log('cartItems:', cartItems) 

     useEffect ( () =>  { 
        
         if(productId) 
         { 
             dispatch(addToCart(productId,qty))
         }
     }, [dispatch,productId,qty])
          
     const removeFromCartHandler = (id) => { 
               dispatch(removeFromCart(id))
     }
     const checkoutHandler = () => { 
             history.push('/login?redirect=shipping')
}
    return (

      
       <Row> 
           <Col md={8} > 
             <h1> Neseli Kutu</h1> 
             { cartItems.length === 0 ? ( 

                 <Message variant="info"> Your Box is Empty <Link to='/'>  Go Back </Link> </Message>
              ) : (

                <ListGroup variant="flush">
                    
                    { cartItems.map(item => ( 
                          
                         <ListGroupItem key={item.product}>
                             <Row> 
                                  <Col md={2}> 
                                     <Image src={item.image}  alt={item.name} fluid rounded></Image>
                                  </Col>     
                                  <Col md={3}> 

                                 
                                     <Link Link to={`/product/${item.product}`}>  {item.product}  {item.name} </Link> 
                                  </Col>  

                                  <Col md={2}> 
                                    {item.price} 
                                  </Col>  

                                  <Col md={3}> 
                                  <Form.Control 
                                            as="select" 
                                            value={item.qty} 
                                            onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}> 
                                            {
                                                
                                            [...Array(item.countInStock).keys()].map((f) => (
                                                <option key = {f+1} value={f+ 1} >
                                                        {f+1}   
                                                </option>
                                            ))
                                             }</Form.Control>
                                  </Col>  

                                  <Col md={1}> 
                                    < Button 
                                       type='button'
                                       variant='light'
                                       onClick={() => removeFromCartHandler(item.product)}
                                    > <i className="fas fa-trash"> </i> </Button>
                                  </Col> 
                            </Row> 

                         </ListGroupItem>


                    ))}



                </ListGroup>
              ) 
                 
              } 
           </Col>

           <Col md={4} > 
           <Card> 

                <ListGroup variant="flush"> 
                <ListGroupItem> 
                <h2> Subtotal ( { cartItems.reduce((acc,item) => acc + item.qty, 0 )})  items </h2>
                   ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0 ).toFixed(2)}  
                </ListGroupItem> 

                <Button 
                    type="button"
                    className="btn=block"
                    disabled= { cartItems.length === 0 }

                onClick= {() => checkoutHandler()}
                > Proceed to Checkout  </Button>

                   <ListGroupItem> 
                    
                </ListGroupItem> 
                </ListGroup>

           </Card>
           </Col>

       </Row>
        )
}

export default CartScreen
