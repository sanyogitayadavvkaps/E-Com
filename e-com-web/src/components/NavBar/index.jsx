// import { Button } from "@mui/material"

// const NavBar = ()=>{
//     return(<nav className="navbar navbar-expand-lg navbar-light" style={{background:'#9fb4ab'}}>
 
//     <div className="container-fluid">
    
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-mdb-toggle="collapse"
//         data-mdb-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <i className="fas fa-bars"></i>
//       </button>
    
    
//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
//         <a className="navbar-brand mt-2 mt-lg-0" href="#">
//           <img
//             src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
//             height="15"
//             alt="MDB Logo"
//             loading="lazy"
//           />
//         </a>
    
//         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className="nav-item">
//             <a className="nav-link" href="#">Dashboard</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">Team</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">Projects</a>
//           </li>
//         </ul>
    
//       </div>
    
    
    
//       <div className="d-flex align-items-center">
    
//         <Button className="text-reset me-3" style={{backgroundColor:"green"}} >
//        Sign In
//         </Button>
//         <Button className="text-reset me-3" style={{backgroundColor:"green"}}>
//        Sign Up
//         </Button>
//         <Button className="text-reset me-3"style={{backgroundColor:"green"}} >
//        Logout
//         </Button>
    
    
//         <div className="dropdown">
//           <a
//             className="dropdown-toggle d-flex align-items-center hidden-arrow"
//             href="#"
//             id="navbarDropdownMenuAvatar"
//             role="button"
//             data-mdb-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <img
//               src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
//               className="rounded-circle"
//               height="25"
//               alt="Black and White Portrait of a Man"
//               loading="lazy"
//             />
//           </a>
//           <ul
//             className="dropdown-menu dropdown-menu-end"
//             aria-labelledby="navbarDropdownMenuAvatar"
//           >
//             <li>
//               <a className="dropdown-item" href="#">My profile</a>
//             </li>
//             <li>
//               <a className="dropdown-item" href="#">Settings</a>
//             </li>
//             <li>
//               <a className="dropdown-item" href="#">Logout</a>
//             </li>
//           </ul>
//         </div>
//       </div>
    
//     </div>
    
//     </nav>

//     )
// }

// export default NavBar

import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const history = useNavigate()
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    // remove the token from local storage and update the state
    localStorage.removeItem("token");
    setToken(null);
  };

  // check if token exists in local storage
  const storedToken = localStorage.getItem("token");
  if (storedToken && !token) {
    // set the token from local storage
    setToken(storedToken);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#9fb4ab" }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy" />
          </a>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Projects
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {token ? (
            <>
              <Button className="text-reset me-3" style={{ backgroundColor: "green" }} onClick={handleLogout}>
                Logout
              </Button>
              <div className="dropdown">
                <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height="25" alt="Black and White Portrait of a Man" loading="lazy" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                  <li>
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Button className="text-reset me-3" style={{ backgroundColor: "green" }} onClick={()=>history('/login')}>
                Sign In
              </Button>
              <Button className="text-reset me-3" style={{ backgroundColor: "green" }} onClick={()=>history('/sign-up')}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar