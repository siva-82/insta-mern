import { apiSlice } from "./apiSlice";
const USERS_URL='/api/users';


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url: `${REACT_APP_BACKEND_URL}${USERS_URL}/getUsers`, 
                method:'GET'
            })
        }),
        login: builder.mutation({
            query: (data)=>({
                url:`${REACT_APP_BACKEND_URL}${USERS_URL}/auth`,
                method:'POST',
                body:data,

            })
        }),
        logout:builder.mutation({
            query:()=>({
                url: `${REACT_APP_BACKEND_URL}${USERS_URL}/logout`, 
                method:'POST'
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${REACT_APP_BACKEND_URL}/api/upload/register`,
                method:'POST',
                body:data,
            })
        }),
        registerUser:builder.mutation({
            query:(data)=>({
                url:`${REACT_APP_BACKEND_URL}${USERS_URL}/`,
                method:'POST',
                body:data,
            })
        })
    })
    
})

export const {useLoginMutation, useLogoutMutation,useRegisterUserMutation,useRegisterMutation,useGetUsersQuery } = usersApiSlice;