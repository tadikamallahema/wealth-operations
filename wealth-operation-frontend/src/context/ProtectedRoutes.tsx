/* import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
interface ProtectedProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoutes = ({ children, allowedRoles }: ProtectedProps) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setAuth } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4004/api/auth/me",
          { withCredentials: true }
        );

        const userData = res.data;

        setAuth(userData); 

        if (allowedRoles.includes(userData.role)) {
          setIsAuthenticated(true);
        } else {
           alert("Only admin is authorized to access this page");
          setIsAuthenticated(false);
        }

      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoutes; */
import axios from "axios";
import {
    useEffect,
    useState,
    type ReactNode
} from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedProps {
    children: ReactNode;
    allowedRoles: string[];
}

const ProtectedRoutes = ({
    children,
    allowedRoles
}: ProtectedProps) => {

    const [loading, setLoading] =
        useState(true);

    const [authorized, setAuthorized] =
        useState(false);

    const { setAuth } = useAuth();

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:4004/api/auth/me",
                    {
                        withCredentials: true
                    }
                );

                const userData = res.data;

                setAuth(userData);

                if (
                    allowedRoles.includes(
                        userData.role
                    )
                ) {

                    setAuthorized(true);

                } else {

                    setAuthorized(false);

                }

            } catch (error) {

                setAuthorized(false);

            } finally {

                setLoading(false);

            }
        };

        checkAuth();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;