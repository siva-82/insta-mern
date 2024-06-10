import { apiSlice } from "./apiSlice";
const USERS_URL='/api/users';

console.log('usersApiSlice');
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url: `${USERS_URL}/getUsers`, 
                method:'GET'
            })
        }),
        login: builder.mutation({
            query: (data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data,

            })
        }),
        logout:builder.mutation({
            query:()=>({
                url: `${USERS_URL}/logout`, 
                method:'POST'
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data,
            })
        })
    })
    
})

export const {useLoginMutation, useLogoutMutation,useRegisterMutation,useGetUsersQuery } = usersApiSlice;