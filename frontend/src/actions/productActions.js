import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL ,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST ,
    PRODUCT_CREATE_SUCCESS ,
    PRODUCT_CREATE_FAIL ,
    PRODUCT_CREATE_RESET ,

    PRODUCT_UPDATE_REQUEST ,
    PRODUCT_UPDATE_SUCCESS ,
    PRODUCT_UPDATE_FAIL ,
    PRODUCT_UPDATE_RESET ,


    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
}  from '../constants/productConstants' 



export const listProducts = (keyword = '') => async (dispatch) => {

    try { 
       dispatch({ type: PRODUCT_LIST_REQUEST})

       const {data} = await axios.get(`/api/products${keyword}`) 
         
       dispatch({ 
           type: PRODUCT_LIST_SUCCESS , 
            payload:data
            })  
              
    }  catch (error) {
   
        dispatch({ 
            type: PRODUCT_LIST_FAIL , 
             payload:error.response && error.response.data.message ? error.response.data.message : error.message,
             })
    }

} 

export const listProductDetails = (id) => async (dispatch) => {
    console.log(id)
    try { 
       dispatch({ type: PRODUCT_DETAILS_REQUEST})
       console.log(`/api/products/${id}`)
       const {data} = await axios.get(`/api/products/${id}`) 
         
       dispatch({ 
           type: PRODUCT_DETAILS_SUCCESS , 
            payload:data
            })  
              
    }  catch (error) {
   
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL , 
             payload:error.response && error.response.data.message ? error.response.data.message : error.message,
             })
    }

}



export const productDeleter = (id) => async (dispatch, getState) => {
    console.log(id)
    try { 

       dispatch({ type: PRODUCT_DELETE_REQUEST , loading:true}) 
       
       const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }


      
    const { data } = await axios.delete(
        `/api/products/delete/${id}/`,
        config
    )
         
       dispatch({ 
           type: PRODUCT_DELETE_SUCCESS , 
            payload:data
            })  
              
    }  catch (error) {
   
        dispatch({ 
            type: PRODUCT_DELETE_FAIL , 
             payload:error.response && error.response.data.message ? error.response.data.message : error.message,
             })
    }

}



export const createProduct = (id) => async (dispatch, getState) => {
    console.log(id)
    try { 

       dispatch({ type: PRODUCT_CREATE_REQUEST , loading:true}) 
       
       const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }


      
    const { data } = await axios.post(
        `/api/products/create/`, {} ,
        config
    )
         
       dispatch({ 
           type: PRODUCT_CREATE_SUCCESS , 
           payload:data ,
            })  
              
    }  catch (error) {
   
        dispatch({ 
            type: PRODUCT_CREATE_FAIL , 
             payload:error.response && error.response.data.message ? error.response.data.message : error.message,
             })
    }

}



export const updateProduct = (product) => async (dispatch, getState) => {
    
    try { 

       dispatch({ type: PRODUCT_UPDATE_REQUEST , loading:true}) 
       
       const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }


      
    const { data } = await axios.put(
        `/api/products/update/${product._id}/`, product ,
        config
    )
         
       dispatch({ 
           type: PRODUCT_UPDATE_SUCCESS , 
           payload:data ,
            })  

        dispatch({type:PRODUCT_DETAILS_SUCCESS , payload:data})
              
    }  catch (error) {
   
        dispatch({ 
            type: PRODUCT_UPDATE_FAIL , 
             payload:error.response && error.response.data.message ? error.response.data.message : error.message,
             })
    }

}


export const createProductReview = (productId,review) => async (dispatch, getState) => {
    
    try { 

       dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST, loading:true}) 
       
       const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }


      
    const { data } = await axios.post(
        `/api/products/${productId}/reviews/`, review,
        config
    )
         
       dispatch({ 
           type: PRODUCT_CREATE_REVIEW_SUCCESS, 
           payload:data ,
            })  

        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST, payload:data})
              
    }  catch (error) {
   
        dispatch({ 
            type: PRODUCT_CREATE_REVIEW_REQUEST, 
             payload:error.response && error.response.data.message ? error.response.data.message : error.message,
             })
    }

}