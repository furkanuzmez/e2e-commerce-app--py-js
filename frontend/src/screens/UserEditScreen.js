import React,{ useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form , Row , Col , Button } from "react-bootstrap"
import { useDispatch, useSelector} from 'react-redux'
import Loader  from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails,updateUser } from "../actions/userActions"  
import FormContainer from "../components/FormContainer"
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditScreen({match,history}) { 


    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading ,user} = userDetails 

    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate, loading : loadingUpdate ,success :successUpdate} = userDetails

    const userId = match.params.id
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setAdmin] = useState(false)
    console.log(user)

    useEffect(() => {  
        
        if(successUpdate){ 
              dispatch(({type:USER_UPDATE_RESET}))
              history.push('/admin/userList')
        } else { 
               
        if (!user.name || user._id !== Number(userId) ) 
        {
            dispatch(getUserDetails(userId))
        } else { 
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
        }



          
    },[user , userId,successUpdate ,history])
    

    const submitHandler = (e) => { 

       e.preventDefault()
       dispatch(updateUser({_id:user._id,name,email,isAdmin}))
       
       
         
}





    return (
    <div> 

          <Link to='/admin/userList/'> 
           Go Back
          </Link>
                       <FormContainer>
           <h1>Edit User</h1> 
           {
              loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>  : ( 

                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label> Name</Form.Label>
                    <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                    </Form.Control>   
    
                    </Form.Group> 
                    <Form.Group controlId='email'>
                    <Form.Label> E-mail Address</Form.Label>
                    <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control> 
    
    
                    </Form.Group> 
    
                    <Form.Group controlId='isAdmin'>
                    <Form.Label> isAdmin</Form.Label>
                    <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setAdmin(e.target.checked)}>
                    </Form.Check>     
                    </Form.Group> 
    
                   
    
                    <Button type="submit" variant='warning'> Register  </Button>
                </Form>
    
              )
           } 
           
           

        </FormContainer>
            

    </div>
    
    )
}

export default UserEditScreen
