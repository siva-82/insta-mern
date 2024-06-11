import { apiSlice } from "./apiSlice";
const USERS_URL='/api/users';

console.log('usersApiSlice');
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url: `https://insta-world-web.onrender.com/${USERS_URL}/getUsers`, 
                method:'GET',
                credentials: "include", 
                mode: 'cors',
            })
        }),
        login: builder.mutation({
            query: (data)=>({
                url:`https://insta-world-web.onrender.com/${USERS_URL}/auth`,
                method:'POST',
                body:data,
                credentials: "include", 
                mode: 'cors',

            })
        }),
        logout:builder.mutation({
            query:()=>({
                url: `${process.env.REACT_APP_BACKEND_URL}${USERS_URL}/logout`, 
                method:'POST',
                credentials: "include", 
                mode: 'cors',
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}${USERS_URL}`,
                method:'POST',
                body:data,
                credentials: "include", 
                mode: 'cors',
            })
        })
    })
    
})

export const {useLoginMutation, useLogoutMutation,useRegisterMutation,useGetUsersQuery } = usersApiSlice;
