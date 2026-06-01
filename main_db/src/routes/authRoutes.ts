import express, { Request, Response } from 'express';
import { getUsers, login, logout, registerUser } from '../controller/authController.js';
import { refreshAccessToken, verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
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
authRoutes.get('/get',verifyToken,authorize("Compliance_officer"),getUsers);
authRoutes.post('/refresh',refreshAccessToken);
authRoutes.post('/logout',logout);
authRoutes.get('/me', verifyToken, (req: Request, res: Response) => {
  const user=(req as any).user;
  return res.status(200).json({success: true,
    id: user?.id,
    role: user?.role,
    email:user?.email
  });
});
export default authRoutes;