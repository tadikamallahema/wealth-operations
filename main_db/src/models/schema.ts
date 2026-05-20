import client from "../config/pgManager.js"
export const createTable=()=>{
    client.query(
    `
    CREATE TABLE platform_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(30) NOT NULL CHECK (
        role IN (
            'Admin',
            'Operations_manager',
            'Compliance_officer',
            'Monitor'
        )
    ),

    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    `
    )
    //console.log("Table created");
}