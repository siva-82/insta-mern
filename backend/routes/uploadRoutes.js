import path from "path";

import express from "express";
import multer from "multer";
const router = express.Router();
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const storage = multer.diskStorage({
  // destination(req,file,cb){
  //     cb(null,'uploads')
  // },
  // filename(req,file,cb){
  //     console.log('uploadRoutes from Storage req.file '+req);
  //     cb(
  //         null,
  //         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
  //     );
  // },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", async (req, res) => {
  console.log("upload/ ");
  uploadSingleImage(req, res, async function (err) {
    // res.status(200).send({
    //   message: "Image uploaded sucessfully",
    //   image: `/${req.file.path}`,
    //   file: req.file,
    // });
    try {
      console.log("try");
      
      const result = await cloudinary.uploader.upload(req.file.path);
    
      const post = new Post({
        name: req.body.userName,
        user: req.body.userId,
        email: req.body.email,
        title: req.body.title,
        description: req.body.description,

        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await post.save();

     res.json(post);
    } catch (error) {
      console.log("catch");
      console.log(error);
      
    }
  });
});

router.put("/:id", async (req, res) => {
 
  uploadSingleImage(req, res, async function (err) {
     

  //  if(req.file){
  //   res.status(200).send({
  //     message: "Image uploaded sucessfully",
  //     image: `/${req.file.path}`,
  //     file: req.file,
  //   });
  //  }
    try {
      

      let post = await Post.findById(req.params.id);
      
let result
      if (post) {
        if(req.file){
          await cloudinary.uploader.destroy(post.cloudinary_id);

        result = await cloudinary.uploader.upload(req.file.path);
        post.image = result.secure_url 
        post.cloudinary_id = result.public_id 
        }

        post.name = req.body.userName || post.name;
        post.user = req.body.userId || post.user;
        post.email = req.body.email || post.email;
        post.title = req.body.title || post.title;
        post.description = req.body.description || post.description;

       if(!result){
        post.image =  post.image;
        post.cloudinary_id = post.cloudinary_id;
       }

        const updatePost = await post.save();

        res.json(updatePost);
      }else {
        res.status(404);
        throw new Error('Post not found');
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
    }
  });
});

router.delete("/:id", async (req, res) => {
  console.log("upload/:id ");

  console.log(req.params.id);
 
    try {
    
      let post = await Post.findById(req.params.id);
      console.log("post");
      console.log(post);

      if (post) {
        await cloudinary.uploader.destroy(post.cloudinary_id);

        await post.deleteOne({ _id: post._id });
      res.json({ message: 'Post Deleted' });

        
      }else {
        res.status(404);
        throw new Error('Post not found');
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
    }

});

export default router;
