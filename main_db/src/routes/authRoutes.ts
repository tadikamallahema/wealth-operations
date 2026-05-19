import express from 'express';
import { login, registerUser } from '../controller/authController.js';
const authRoutes=express.Router();
/*  import rateLimit from 'express-rate-limit';

 const limiter=rateLimit({
    windowMs:60*1000,
    max:2,
    message:{
        error:'Too many requests'
    },
    standardHeaders:true,
}); */

authRoutes.post('/register',registerUser);
authRoutes.post('/login',login);

export default authRoutes;