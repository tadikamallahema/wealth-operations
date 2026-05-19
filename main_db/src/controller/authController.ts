import { Request,Response } from "express";
import { createUser, findUserByEmail } from "../services/authServicer.js";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export async function registerUser(req:Request,res:Response){
    try{
        
        const {full_name,email,password,role}=req.body;
        if(!full_name||!email||!password|| !role){
            return res.status(400).json({success:false,message:"Few details are missing"});
        } 
        const existingUser=await findUserByEmail(email);
        if(existingUser){
            return res.status(409).json({success:false,message:"User already exists"});
        }
        const hashed:string=await bcrypt.hash(password,10);
        const user=await createUser({full_name,email,password_hash:hashed,role,is_active:true})
        delete user.password_hash;
        return res.status(201).json({success:true,message:"User Signedup successfully",user})

    }catch(err:any){
        console.log(err);
        return res.status(500).json({err});
    }
}
export async function login(req:Request,res:Response){
    try{
        const {email,password}=req.body;
    if(!email|| !password){
         return res.status(400).json({success:false,message:"Few details are missing"});
    }
    const existingUser=await findUserByEmail(email);
     if (!existingUser) {
        return res.status(404).json({success: false,message: "User not found"});
    }
    const isMatched = await bcrypt.compare(password,existingUser.password_hash);
    if(!isMatched){
        return res.status(401).json({success:false,message:"Password is incorrect "})
    }
    console.log(process.env.SECRET!);
    const token=jwt.sign({id:existingUser.id,role:existingUser.role},process.env.SECRET!,{expiresIn:'10m'}); 
     res.cookie("token",token,{
            httpOnly:true, // cant access via js
            secure:false,
            sameSite:'lax',
            maxAge: 10*60 * 1000});
        return res.status(200).json({success:true,message:"User Logged in successfully"})

    }catch(err:any){
        return res.status(500).json({err});
    }
}