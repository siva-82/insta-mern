import React from 'react'
import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import {Form,Button,Row,Col, Spinner} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { useRegisterUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useRef } from 'react'

const Register = () => {

  const  [email,setEmail]=useState('')
  const  [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [image, setImage] = useState();
  const ref = useRef();

  const imgHandle = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const {userInfo} = useSelector((state)=>state.auth);

  
  const [register, {isLoading}]=useRegisterMutation();
  const [registerUser, {isLoading:isUserLoading}]=useRegisterUserMutation();

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[navigate,userInfo])

  const submitHandler=async (e)=> {
    e.preventDefault()
    if(image){
      
    let formData = new FormData();
    formData.append("userName",name);
    formData.append("name",name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);

    if(password){
      try {
       const res = await register(formData)
       console.log(res)
      if(res)dispatch(setCredentials(res))
      ref.current.value = "";
      navigate('/home')
      } catch (error) {
        console.log(error);
      }
    }
    
    }else{

      
      
  
      if(password){
        try {
         const res = await registerUser({name,email,password}).unwrap()       
        if(res)dispatch(setCredentials(res))
        ref.current.value = "";
        window.location.assign('/home')()
        } catch (error) {
          console.log(error);
        }
      }
      
    }
  }

  return (
    <FormContainer>
      <h1>Sign up interact with world</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
        <Form.Control type='Name' placeholder='Enter Name' value={name} onChange={ (e) => setName(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='email'>
        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={ (e) => setEmail(e.target.value)}></Form.Control>
      </Form.Group>
       
      
      <Form.Group className='my-2' controlId='Password'> 
        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={ (e) => setPassword(e.target.value)}></Form.Control>
      </Form.Group>  
      <Form.Group className="my-2" controlId="image">
          <Form.Control type="file" ref={ref}placeholder="choose image" onChange={imgHandle}></Form.Control>
        </Form.Group>
     <Button type='submit'  className='mt-3 w-100 border-0' style={{backgroundColor:	"#0095F6"}}>Register{isLoading || isUserLoading &&  <Spinner className='mx-2' style={{height:'25px',width:'25px'}}animation="border" />}</Button>

   <Row className='py-3'>
    <Col>
    Have an account?  <Link to='/'>Log In</Link>
    </Col>
   </Row>
      </Form>
      </FormContainer>
  )
}

export default Register