import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";

const AdminMiddleware = () => {
  const token = localStorage.getItem("tokenAdmin");
  const role = localStorage.getItem("roleAdmin");
  const [redirect, setRedirect] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      // const expiredTime = expired ? new Date(expired) : null;

      if (!token || role !== "admin") {
        // if (!token || role !== 'admin' || (expiredTime && now > expiredTime)) {
        // Token kosong, role bukan admin, atau token kadaluarsa
        localStorage.clear();
        setIsValid(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [token, role]);

  if (!isValid) {
    return <Navigate to="/v1" replace />;
  }

  return <Outlet />;
};

export default AdminMiddleware;

// useEffect(() => {
//   if (role !== "admin") {
//     setRedirect(true);
//   }
// }, [role]);
