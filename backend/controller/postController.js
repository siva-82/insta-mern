import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import { response } from 'express';
// import {uploadSingleImage} from '../routes/uploadRoutes.js' 



// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async(req,res)=>{
    const post= await Post.find({})
    console.log("getposts")
    res.status(200).json(post)
})

const getSinglePost = asyncHandler(async(req,res)=>{
    const post= await Post.findById(req.params.id)
    console.log("getsingleposts" )
    console.log("paramid"+req.params.id )
    res.status(200).json(post)
})


// @desc    Create new comment
// @route   POST /api/posts/:post_id/comment
// @access  Private
const createComment=asyncHandler(async (req,res)=>{
    console.log("createcomment")
    const {comment}=req.body;
    console.log(req.body.userName)
    console.log(comment)
    
    const post=await Post.findById(req.params.post_id)
console.log(post)
    if(post){
               
        const userComment={
            postId:req.params.post_id,
            comment_By:req.body.userId,
            comment,
            name:req.body.userName
        }
        post.comments.push(userComment)

        await post.save()
        res.status(201).json({post,message:'Comment added'})
    }else{
        res.status(404)
        throw new Error('Post Not Found')
       
    }
})


// @desc    Create new reply
// @route   POST /api/posts/post_id/:comment_id/reply
// @access  Private
const createReply=asyncHandler(async (req,res)=>{
    const {reply}=req.body;
    const post=await Post.findById(req.params.post_id)

    if(post){
        const commentId=await Post.comments.findById(req.params.comment_id)
        if(commentId){
            const userReply={
                postId:req.params.post_id,
                commentId:req.params.comment_id,
                replied_By:req.user.user_id,
                name:req.user.name,
                reply
            }

            post.replies.push(userReply)

            await post.save()
            res.status(201).json('reply added')
        }else{
            res.status(404)
            throw new Error('Comment not found')
        }

  
    }
    
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost= asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    if (post) {

      await post.deleteOne({ _id: post._id });
      res.json({ message: 'Post Deleted' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  });

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req,res)=>{
    const {name,image,description}=req.body
    console.log("updatePost")
    console.log(name,image,description)
    
    

    const post=await Post.findById(req.param.id);
    
    
    if(post){
        
        post.user=userId;
        post.name=name;
        post.image=image;
        post.description=description;          
    
      
       const updatedPost=await post.save();
        res.json(updatedPost)
        
    }else{
        res.status(404);
        throw new Error('Post Not Found')
    }

}

)

export {
 
    createComment,
    createReply,
    getPosts,
    getSinglePost,
    updatePost,
    deletePost,
}