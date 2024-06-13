import express from 'express';


import { protect } from '../middleware/authMiddleware.js'    
import { createComment, createReply, deletePost, getPosts,getSinglePost, updatePost } from '../controller/postController.js';


const router=express.Router()

router.route('/').get(getPosts)
router.route('/:id').get(getSinglePost).put(protect,updatePost).delete(protect,deletePost);
router.route('/:post_id/comments').post(protect,createComment);
router.route('/:comment_id/replies').post(protect,createReply);

export default router;