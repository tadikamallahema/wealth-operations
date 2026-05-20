import { Role } from "./role.js";


export interface User{
    id?:string,
    full_name:string,
    email:string,
    password_hash:string,
    role:Role,
    is_active:boolean
}