import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form , Row , Col , Button } from "react-bootstrap"
import { useDispatch, useSelector} from 'react-redux'
import Loader  from '../components/Loader'
import Message from '../components/Message'
import { login , register } from "../actions/userActions"  
import FormContainer from "../components/FormContainer"
import CheckoutSteps  from "../components/CheckoutSteps"
import { saveShippingAddress} from '../actions/cartActions'
import { savePaymentMethod} from '../actions/cartActions'

function PaymentScreen({history}) {  

    const cart = useSelector(state => state.cart)
    console.log('buradayim')

    const [paymentMethod,setPaymentMethod] = useState('Paypal')

    if(!Object.values(cart)[0].address) {
        history.push('/shipping')
    }


    console.log(Object.values(cart)[0].address)
    //const  shippingAddress   = cart.shippingAddress

    const dispatch = useDispatch()
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer> 
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                <Form.Label as='legend'> Select Method</Form.Label>    
                <Col>
                 <Form.Check 
                   type='radio'
                   label='Paypal or Credit Card'
                   id='paypal'
                   name="paymentMethod"
                   checked
                   onChange={(e) => setPaymentMethod(e.target.value)
                   }
                 > 

                 </Form.Check>
                
                </Col>
                
                </Form.Group>
                <Button type="submit" variant="primary"> Continue </Button> 
                
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
