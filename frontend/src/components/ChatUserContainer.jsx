import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { setChatId,setNewUsers } from '../slices/authSlice';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from "../slices/usersApiSlice";


const ChatUserContainer = () => {
  const { data: users, isError:usersErr, isLoading:usersLoading } = useGetUsersQuery() || {};
  const {userInfo,isLoadingUser} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
    

    const handleSelectUser=async (item)=>{
        
if(userInfo){
  


  let newUser=item._id
  let loggedUser=userInfo._id

  const myArrchat = [newUser];
  const myArrcurren = [loggedUser];
  const filtered1 = myArrchat[0].replace(/\D+/g, '').split('').map(e => parseInt(e));
  const filtered2 = myArrcurren[0].replace(/\D+/g, '').split('').map(e => parseInt(e));

    

  const reduced1=filtered1.reduce((partialSum, am) => partialSum + am, 0)
  const reduced2=filtered2.reduce((partialSum, am) => partialSum + am, 0)
  
   const combinedId =
  reduced1 > reduced2
  ? loggedUser + newUser
  : newUser + loggedUser
    



    dispatch(setChatId({combinedId,item}))
    
  
    
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
  
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });    
      }
    } catch (err) {}
}
        
          }
    
  return (
<>
<div style={{position: "static"}} >Users</div>
<div style={{height:'250px',overflowY:'scroll',scrollbarWidth:'none'}}>
 
{users?.map((u)=>{
        return ( 
         <> <div className='d-flex  justify-content-start align-items-center' style={{cursor:"pointer"}}> 
         <img className='me-2'src='./logo192.png' alt="" style={{height: "20px",    width: "20px" }} />

    <div  style={{margin:'15px 0  ',height:'20px',}} 
    //width:'300px'
    onClick={()=>handleSelectUser(u)}>{u.name}</div> 

     </div>
     <div style={{borderBottom:'1px solid lightgray'}}></div>
         {/* <hr style={{height: "2px",    }}/>   */}
        </>
   )}
    )}
</div>
</>

  )
}

export default ChatUserContainer