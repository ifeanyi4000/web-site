import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }: any) => {
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);

    // Render children only if user is authenticated
    return user && <Navigate to="/" /> ;
};

export default PrivateRoutes;
