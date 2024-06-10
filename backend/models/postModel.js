import mongoose from "mongoose";

const {ObjectId} =mongoose.Schema.Types


const commentSchema=mongoose.Schema(
    {
        postId:{type: String,required:true,ref:'Post'},
        comment_By: {type: String,required:true},
        comment:{type:String,required:true},
        name:{type:String,required:true},
        replies:[{
            commentId:{type: ObjectId,required:true},
            replied_By:{type: ObjectId,required:true}, 
            name:{type:String,required:true},
            reply:{type:String,required:true},
            createdAt:{type:Date,default:new Date().getTime()}
        }]
    },
    {timestamps:true,}
)

const postSchema=mongoose.Schema(
    {
        
        user:{
            type: String,
            required:true,
            
        },
        name:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        description: {
            type: String,
            required: true,
          },
        cloudinary_id:{
            type:String,
            required:true,
        },
        comments:[commentSchema],
    },
    {
        timestamps:true,
    }
);


const Post = mongoose.model('Post',postSchema);

export default Post;