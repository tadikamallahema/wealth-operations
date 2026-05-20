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
        client.query(
        `
        CREATE TABLE IF NOT EXISTS audit_logs (
            id SERIAL PRIMARY KEY,
            pan_number VARCHAR(10),
            service_name VARCHAR(50),
            user_id VARCHAR(100),
            role_id INTEGER,
            action_type VARCHAR(100) NOT NULL,
            entity_type VARCHAR(100),
            entity_id VARCHAR(100),
            action_status VARCHAR(30) NOT NULL,
            description TEXT,
            endpoint TEXT,
            request_method VARCHAR(10),
            ip_address VARCHAR(100),
            old_data JSONB,
            new_data JSONB,
            metadata JSONB,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        `
        )
    //console.log("Table created");
}