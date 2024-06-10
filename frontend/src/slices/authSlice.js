import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    
   
    chatId:'',
   newUser:{}
 
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action) => {        
          
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));        
            
        },
        logoutCredentials:(state,action)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
        },
        setChatId:(state,action) => {        
          
            state.chatId = action.payload.combinedId;
            state.newUser = action.payload.item; 
            console.log( "action.payload.newUser;", action.payload.item)
               
        },
        
        
    }
});

export const {setCredentials,logoutCredentials,setChatId} = authSlice.actions;

export default authSlice.reducer;