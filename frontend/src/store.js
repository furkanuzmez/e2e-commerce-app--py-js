import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers ,  productDetailsReducers, productDeleteReducers , productCreateReducers , productUpdateReducers ,productReviewCreateReducers  }  from './reducers/productReducers'
import { cartReducer  }  from './reducers/cartReducers'
import {
      userLoginReducer,
      userRegisterReducer,
      userDetailsReducer,
      userUpdateProfileReducer,
      userListReducer,
      userDeleteReducer,
      userUpdateReducer,
  } from './reducers/userReducers'

import { orderCreateReducer, orderDetailsReducer , orderPayReducer , orderListMyReducer , orderListReducer , orderDeliverReducer} from './reducers/orderReducers'


const reducer = combineReducers({

    productList : productListReducers ,
    productDetails : productDetailsReducers,
    productDelete : productDeleteReducers ,
    productCreate : productCreateReducers ,
    productUpdate : productUpdateReducers ,
    productReviewCreate : productReviewCreateReducers ,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails  : userDetailsReducer,
    userUpdateProfie : userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    orderCreate : orderCreateReducer, 
    orderDetails : orderDetailsReducer, 
    orderPay : orderPayReducer,
    orderListMy :orderListMyReducer ,
    orderList :orderListReducer ,
    orderDeliver: orderDeliverReducer,
}) 

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
      JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
      JSON.parse(localStorage.getItem('userInfo')) : null 

const shippingAdressFromStorage = localStorage.getItem('shippingAddress') ? 
      JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? 
      JSON.parse(localStorage.getItem('paymentMethod')) : null
console.log(shippingAdressFromStorage)

const initialState = { 

  cart: {
      shippingAdress: shippingAdressFromStorage,
      cartItems: cartItemsFromStorage,
      paymentMethod: paymentMethodFromStorage,
      
  },
  userLogin:{userInfo: userInfoFromStorage},
  

} 

const middleware = [thunk]

const store = createStore( reducer, initialState ,
     composeWithDevTools(applyMiddleware(...middleware)))


export default store