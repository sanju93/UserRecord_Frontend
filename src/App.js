import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBAr from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile";
import UserPage from "./pages/User";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <NavBAr />,
      children: [
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path : "profile",
          element : <Profile/>
        },{
          path : "UserPage/:id",
          element : <UserPage/>
        }
      ],
    },
  ]);
  return <div className="App">
    <ToastContainer/>
    <RouterProvider router={routes}/>
  </div>;
}

export default App;
