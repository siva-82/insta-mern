import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';



const authUser = asyncHandler(async(req,res)=>{
console.log("authUser");
console.log(req.body);
    const {email,password}=req.body;
console.log(email,password)
    const user= await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            userName:user.userName,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
    //  res.status(200).json({message:'Auth User'})
})

const registerUser = asyncHandler(async(req,res)=>{
    
    const {name, userName,email, password} =req.body;
    console.log(req.body)
    // const userExist = await User.findOne({$or: [ { email: email },{ userName: userName }]})
     const userExist = await User.findOne({email})
    //  console.log(userExist)

    if(userExist){
        res.status(400);
        throw new Error('User already exists' );
        
    }

    const user= await User.create({
        name,userName:name,email,password
    })

    if(user){
      generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            userName:user.userName,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }




    // res.status(200).json({message:'Register User'})
})
const getUsers = asyncHandler(async(req,res)=>{
    const users= await User.find({}).sort({createdAt: 1})
    
    res.status(200).json(users)
})
const getUserProfile = asyncHandler(async(req,res)=>{
    const user= {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json({message:'User Profile'})
})


const updateUserProfile = asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id)

    if(user) {
         user.name= req.body.name || user.name;
         user.email= req.body.email || user.email

        if(req.body.password){
          user.password=req.body.password
         }
        const updatedUser= await user.save()

        res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,    
        })
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','', {
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'User logged out'})
})

export {
    authUser,
    getUsers,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser
}
