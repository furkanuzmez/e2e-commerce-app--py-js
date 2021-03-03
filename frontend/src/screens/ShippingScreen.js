import React,{ useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form , Row , Col , Button } from "react-bootstrap"
import { useDispatch, useSelector} from 'react-redux'
import Loader  from '../components/Loader'
import Message from '../components/Message'
import { login , register } from "../actions/userActions"  
import FormContainer from "../components/FormContainer"
import CheckoutSteps  from "../components/CheckoutSteps"
import { saveShippingAddress} from '../actions/cartActions'

function ShippingScreen({ history }) {
    
    

    const cart = useSelector(state => state.cart)
    console.log('buradayim ShipSCrees')
    
    console.log(cart.shippingAddress)
    //const  shippingAddress   = cart.shippingAddress

    const dispatch = useDispatch()
    const [address,setAddress] = useState( Object.values(cart)[0].address )
    const [city,setCity] = useState(Object.values(cart)[0].city)
    const [postalCode,setPostalCode] = useState(Object.values(cart)[0].postalCode)
    const [country,setCountry] = useState(Object.values(cart)[0].country)
    

    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))  
        history.push('/payment')
        }


    return (
       <FormContainer> 
          <CheckoutSteps step1 step2/>
              <h1> Shipping</h1>
            <Form onSubmit={submitHandler}> 

           <Form.Group controlId='address'>
                     <Form.Label> Address</Form.Label>
                     <Form.Control
                            required
                            type='text'
                            placeholder='Enter address'
                            value={address ? address: ''}
                            onChange={(e) => setAddress(e.target.value)}>
                     </Form.Control>   

        </Form.Group> 

                <Form.Group controlId='city'>
                <Form.Label> City</Form.Label>
                <Form.Control
                required
                type='text'
                placeholder='Enter city'
                value={city ? city: '' }
                onChange={(e) => setCity(e.target.value)}>
                </Form.Control>   

                </Form.Group> 
                <Form.Group controlId='postalCode'>
                <Form.Label> Postal Code</Form.Label>
                <Form.Control
                required
                type='text'
                placeholder='Enter address'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>   

                </Form.Group>
                <Form.Group controlId='country'>
                <Form.Label> Country </Form.Label>
                <Form.Control
                required
                type='text'
                placeholder='Enter country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}> 
                </Form.Control>   
                </Form.Group>
                <Button type="submit" variant="primary"> Continue </Button>  

           </Form>
       </FormContainer>
    )
}

export default ShippingScreen
