import client from "../config/pgManager.js";
import { User } from "../interface/user.js";

export async function createUser(data:User){
    const {full_name,email,password_hash,role,is_active}=data;
    const result=await client.query(
        ` 
        insert into platform_users(full_name,email,password_hash,role,is_active)
        values ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [full_name,email,password_hash,role,is_active]
    );
    return result.rows[0];
}
export async function findUserByEmail(email:string){
    const res=await client.query(
        ` select * from platform_users where email=$1 and is_active=true`,[email]
    )
    return res.rows.length?res.rows[0]:null;
}