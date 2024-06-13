import { apiSlice } from "./apiSlice";
const POSTS_URL='/api/posts'
const CREATE_POST_URL='/api/upload';



export const postApiSlice = apiSlice.injectEndpoints({
    
    endpoints:(builder)=>({
        getPosts: builder.query({
            query: ()=>({
                url:`${process.env.REACT_APP_BACKEND_URL}${POSTS_URL}`,
                method:'GET',
            }),
            providesTags:['Posts']
        }),
        getSinglePost: builder.query({
            query: (id)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}${POSTS_URL}/${id}`,
                method:'GET',
            })
        
        }),

        addPost:builder.mutation({
            query:(data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}${CREATE_POST_URL}`,
                method:'POST',
                body:data,
                formData:true                                 
            }),
            invalidatesTags:['Posts']

        }),

        editPost:builder.mutation({
            query:({id,data})=>({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`, 
                method:'PUT',
                body:data,              

            }),
            invalidatesTags:['Posts']

        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Posts']

        }),
        sendComment:builder.mutation({
            query:(data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}${POSTS_URL}/${data.postId}/comments`,
                method:'POST',
                body:data,
                credentials: "include",
                mode: 'cors',
            }),
            invalidatesTags:['Posts']
        })
    })
    
})

export const {useGetPostsQuery,useGetSinglePostQuery,useAddPostMutation, useEditPostMutation,useDeletePostMutation,useSendCommentMutation}=postApiSlice