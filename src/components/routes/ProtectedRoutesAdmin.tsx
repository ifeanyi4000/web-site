import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutesAdmin = ({ children }: any) => {
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/auth");
        }
    }, [user, navigate]);


    return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoutesAdmin;
