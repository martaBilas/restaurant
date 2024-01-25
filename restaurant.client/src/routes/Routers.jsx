import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "../User/Pages/SignIn.jsx";
import SignUp from "../User/Pages/SingUp.jsx";
import MealCatalog from "../MealCatalog/Pages/MealCatalog.jsx";

const Routers = () => {
    
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/menu" element={<MealCatalog />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;
