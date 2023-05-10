// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar"

const MainLayout = ({ children }) => {
  // const history = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     history("/login");
  //   }
  // }, []);
    return (
      <div>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    );
  };

  export default MainLayout