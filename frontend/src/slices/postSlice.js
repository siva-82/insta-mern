import { apiSlice } from "./apiSlice";
const POSTS_URL='/api/posts'
const CREATE_POST_URL='/api/upload';


console.log('usersApiSlice');
export const postApiSlice = apiSlice.injectEndpoints({
    
    endpoints:(builder)=>({
        getPosts: builder.query({
            query: ()=>({
                url:`${POSTS_URL}`,
                method:'GET',
            }),
            providesTags:['Posts']
        }),
        getSinglePost: builder.query({
            query: (id)=>({
                url:`${POSTS_URL}/${id}`,
                method:'GET',
            })
        
        }),

        addPost:builder.mutation({
            query:(data)=>({
                url:`${CREATE_POST_URL}`,
                method:'POST',
                body:data,
                formData:true                                 
            }),
            invalidatesTags:['Posts']

        }),

        editPost:builder.mutation({
            query:({id,data})=>({
                url: `/api/upload/${id}`, 
                method:'PUT',
                body:data,              

            }),
            invalidatesTags:['Posts']

        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:`/api/upload/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Posts']

        }),
        sendComment:builder.mutation({
            query:(data)=>({
                url:`${POSTS_URL}/${data.postId}/comments`,
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