import React , { useState , useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row , Col ,Button, Carousel } from "react-bootstrap";
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import axios from 'axios'
import { listProducts } from "../actions/productActions";
import { productListReducers } from '../reducers/productReducers';


function HomeScreen(history) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products , page ,pages} = productList

    let keyword = history.location.search

    useEffect(() =>  { 
            
        dispatch(listProducts(keyword))
        
    },[dispatch,keyword])
  


    return (
        <div>  
            
    
            
            { loading ? <Loader /> : error ? <Message variant='danger'> {error}</Message>
             :
             <div>
             <Row>
                 {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product = {product} /> 
                    </Col>
                
                 ))}
            </Row> 
            <Paginate page={page} pages={pages} keyword={keyword} />
            </div>
}

        </div>
    )
}

export default HomeScreen
