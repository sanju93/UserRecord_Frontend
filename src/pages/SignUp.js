import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink } from "react-router-dom";
function SignUp() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirm_password, setconfirm_password] = useState("");
  let [gender, setGender] = useState("Male");
  let [submit, setSubmit] = useState(false);
  let [Active, setIsActive] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password === confirm_password) {
      setSubmit(true);
      try {
        console.log(Active);
        let res = await axios({
          url: "/users/signUp",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            name,
            email,
            password,
            confirm_password,
            gender,
            Active,
          }),
        });

        console.log(res.status);
        if (res.status === 200) {
          toast.success("User has been created");
          setSubmit(false);
        }
        setconfirm_password("");
        setEmail("");
        setName("");
        setPassword("");
        setGender("");
        setIsActive(false);
      } catch (err) {
        setSubmit(false);

        if (err.response.status === 300) {
          toast.info("User already there pls Do sign IN");
        } else {
          toast.error("Something Error is getting in Sign Up");
        }
      }
    } else {
      toast.error("do Check your password and confirm password :");
      setconfirm_password("");
      setPassword("");
    }
  }
  return (
    <>
      <NavLink to={"/profile"}>
        <button className="btn btn-success mt-2">See ALL User</button>
      </NavLink>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container py-5">
          <div className="row my-4 mx-5">
            <div className="col-4">
              <label className="fw-medium fs-3">Name</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="form form-control fw-medium"
              ></input>
            </div>
          </div>
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

          <div className="row my-4 mx-5">
            <div className="col-4">
              <label className="fw-medium fs-3">Confirm Password</label>
            </div>
            <div className="col-6">
              <input
                type="password"
                value={confirm_password}
                required
                onChange={(e) => setconfirm_password(e.target.value)}
                className="form form-control"
              ></input>
            </div>
          </div>

          <div className="row my-5 mx-5">
            <div className="col-4">
              <label className="fw-medium fs-3">Gender</label>
            </div>
            <div className="col-6">
              <select
                value={gender}
                className="form-select"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </div>
          </div>

          <div className="row my-5 mx-5">
            <div className="col-4">
              <label className="fw-medium fs-3">IsActive</label>
            </div>
            <div className="col-6">
              <select
                className="form-select"
                onChange={(e) => setIsActive(e.target.value)}
                value={Active}
              >
                <option value={true}>Active</option>
                <option value={false}>UnActive</option>
              </select>
            </div>
          </div>

          <div className="row my-5 mx-5 ">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-success btn-lg" type={"submit"}>
                {!submit ? "SignUp" : "Signing Up..."}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
