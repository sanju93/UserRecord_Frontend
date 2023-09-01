import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile() {
  let [AllUsers, setAllUsers] = useState([]);
  let [store, setStore] = useState([]);
  let [edit, setEdit] = useState({id : null,edit : false});
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchUsers() {
      try {
        let res = await axios({
          method: "GET",
          url: "/users/AllUsers",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        let data = res.data;

        setAllUsers(data);
        setStore(data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          toast.info("Token has expired please Re-login yourself");
          navigate("/signin");
        } else {
          toast.error("Internal server error fetching Records");
        }
      }
    }
    fetchUsers();
  }, []);

  function handleAllUser() {
    setAllUsers(store);
  }

  function handleActive() {
    setAllUsers(store.filter((item) => item.IsActive === true));
  }

  function handleUnActive() {
    setAllUsers(store.filter((item) => item.IsActive === false));
  }

  async function handleDelete(id) {
    console.log(id);

    try {
      let res = await axios({
        method: "DELETE",
        url: `/users/delete/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        toast.success("User deleted Successfully");

        setAllUsers(AllUsers.filter((item) => item._id === id));
        setStore(store.filter((item) => item._id === id));
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/signIn");
        toast.info("Token expired Re-login again");
      } else {
        toast.error("Internal server Error");
      }
    }
  }

  async function handleEdit(id) {
    setEdit({ id, edit : !edit.edit });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let id = edit.id;
    try {
      let res = await axios({
        method: "PUT",
        url: `/users/edit/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ name, desc }),
      });

      if (res.status === 200) {
        toast.success("Information Updated");
        setEdit({ id: null, edit: false });
        setName("");
        setDesc("");
        setAllUsers(
          AllUsers.map((item) => {
            if (item._id === id) {
              item.name = name;
            }
            return item;
          })
        );
        setStore(
          store.map((item) => {
            if (item._id === id) {
              item.name = name;
            }
            return item;
          })
        );
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/signIn");
        toast.info("Token has expired Relogin again");
      } else {
        toast.error("Internal server error");
      }
    }
  }

  function handleUser(id){
    navigate(`/UserPage/${id}`);
  }

  return (
    <div className="mt-3">
      {edit.edit ? (
        <>
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
                  <label className="fw-medium fs-3">Description</label>
                </div>
                <div className="col-6">
                  <textarea
                    type="text"
                    value={desc}
                    required
                    onChange={(e) => setDesc(e.target.value)}
                    className="form form-control fw-medium"
                  ></textarea>
                </div>
              </div>

              <div className="row my-5 mx-5 ">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-success btn-lg" type={"submit"}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        ""
      )}
      <button className="btn btn-primary mx-4" onClick={handleAllUser}>
        For All Users
      </button>
      <button className="btn btn-info mx-4" onClick={handleActive}>
        For ALL Active{" "}
      </button>
      <button className="btn btn-dark mx-4" onClick={handleUnActive}>
        For ALL UnActive
      </button>
      <div className="d-flex flex-row justify-content-around flex-wrap my-3">
        {AllUsers.map((item, index) => (
          <div
            className="child border p-5"
            key={index}
            style={{ height: "300px", width: "400px" }}
           >
            <p className="my-3">Name : {item.name}</p>
            <p className="my-3">Email : {item.email}</p>
            <p className="my-3">Gender : {item.gender}</p>
            <p className="my-3">
              IsActive : {item.IsActive ? "Active" : "UnActive"}
            </p>
            <button
              className="btn btn-primary my-3 ms-3"
              onClick={() => handleEdit(item._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger ms-3"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
            <button className="btn btn-info ms-3" onClick={() => handleUser(item._id)}>
               More Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
