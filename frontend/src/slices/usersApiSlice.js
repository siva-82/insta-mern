import { apiSlice } from "./apiSlice";
const USERS_URL='/api/users';


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/users/getUsers`, 
                method:'GET',
               
                
            })
        }),
        login: builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/users/auth`,
                method:'POST',
                body:data,
                 
                

            })
        }),
        logout:builder.mutation({
            query:()=>({
                url: `${process.env.REACT_APP_BACKEND_URL}${USERS_URL}/logout`, 
                method:'POST',
              
            })
        }),
        register:builder.mutation({
            query:(data)=>({
<<<<<<< HEAD
                url:`/api/upload/register`,
                method:'POST',
                body:data,
            })
        }),
        registerUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/`,
=======
                url:`${process.env.REACT_APP_BACKEND_URL}${USERS_URL}`,
>>>>>>> fc388c1f44f0f702710782711080a814ef38d07d
                method:'POST',
                body:data,
                
            })
        })
    })
    
})

<<<<<<< HEAD
export const {useLoginMutation, useLogoutMutation,useRegisterUserMutation,useRegisterMutation,useGetUsersQuery } = usersApiSlice;
=======
export const {useLoginMutation, useLogoutMutation,useRegisterMutation,useGetUsersQuery } = usersApiSlice;
>>>>>>> fc388c1f44f0f702710782711080a814ef38d07d
