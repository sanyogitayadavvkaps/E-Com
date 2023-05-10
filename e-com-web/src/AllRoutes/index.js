import {  Routes, Route } from "react-router-dom";
import PageNotFound from "../components/404";
import Home from "../components/Home";
import UserLogin from "../components/Login";
import RateProduct from "../components/RateProduct";
import UserSignUp from "../components/SignUp";
import ViewDetails from "../components/ViewDeatils";
const AllRoutes = () =>{
    return(
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<UserLogin />} />/
         <Route path="/sign-up" element={<UserSignUp />} />
         <Route path="/view-deatils/:id" element={<ViewDetails />} />
         <Route path="rate/product/:id"  element={<RateProduct />} />
         <Route path="*"  element={<PageNotFound />} />




        </Routes>
    )
}

export default AllRoutes