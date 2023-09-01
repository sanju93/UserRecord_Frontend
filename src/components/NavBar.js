import { Outlet, NavLink ,useNavigate} from "react-router-dom";

function NavBAr() {

   let navigate = useNavigate();

   function handleLogout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/signIn');
   
   }
  return (
    <>
      <div className="fluid-container bg-success">
        <div className="d-flex flex-start justify-content-around p-3">
          <NavLink
            to={"/signIN"}
            style={{ textDecoration: "none", color: "white" }}
            className="fw-bold"
          >
            {" "}
            SignIn
          </NavLink>
          <NavLink
            to={"/signup"}
            style={{ textDecoration: "none", color: "white" }}
            className={"fw-bold"}
          >
            {" "}
            SignUp
          </NavLink>
          <span
            style={{ cursor: "pointer", color: "white", fontWeight: "bold" }}
            onClick={handleLogout}
          >
            {" "}
            Logout{" "}
          </span>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBAr;
