import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate("/");
        }, 4000); // 4 seconds

        return () => clearTimeout(timer);

    }, [navigate]);

    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>Redirecting to Login Page in 4 seconds...</p>
        </div>
    );
}