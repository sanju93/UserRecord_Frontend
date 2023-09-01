import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';


function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submit, setSubmit] = useState(false);
  let navigate = useNavigate();

 async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);

    try {
      let res = await axios({
        url: "/users/signIN",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        toast.success("Login successfully completed");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSubmit(false);
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Password is inCorrect");
      } else if (err.response.status === 501) {
        toast.error("User is not there");
        navigate("/signup");
      } else {
        toast.error("Something error is getting :");
      }

      setSubmit(false);
    }

    setEmail("");
    setPassword("");
  
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container py-5">
          <div className="row my-4 mx-5">
            <div className="col-4">
              <label className="fw-medium fs-3">Email</label>
            </div>
            <div className="col-6">
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="form form-control fw-medium"
              ></input>
            </div>
          </div>
          <div className="row my-4 mx-5">
            <div className="col-4">
              <label className="fw-medium fs-3">Password</label>
            </div>
            <div className="col-6">
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="form form-control"
              ></input>
            </div>
          </div>

          <div className="row my-5 mx-5 ">
            <div className="d-grid gap-2 col-6 mx-auto">
              <input type="submit" className="btn btn-success btn-lg" value={!submit ? "Login" : "Logging..."}></input>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
