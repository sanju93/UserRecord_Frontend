import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
function UserPage() {
  let { id } = useParams();
  let [data, setData] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {

        try{
            let res = await axios({
                method: "GET",
                url : `/users/user/${id}`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
        
              if (res.status === 200){
                setData(res.data);
              }
        }catch(err){
  if (err.response.status === 401){
    navigate('/signIn');
    toast.info("Token Has expired");
  }else{
  toast.error("Internal server Error");
  }
        }
      

     
    }

    fetchUser();
  }, []);

  async function handleDelete(id){

    try{

        let res = await axios({
            method : "DELETE",
            url : `/users/delete/${id}`,
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (res.status === 200){
            navigate('/profile');
            toast.success("User Deleted Successfully");
        }

    }catch(err){
        if (err.response.status === 401){
            navigate('/signIn');
        }else{
            toast.error("Internal server error");
        }
    }

  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <label>Name</label>
          </div>
          <div className="col-5">{data.name}</div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Email :</label>
          </div>
          <div className="col-5">{data.email}</div>
        </div>

        <div className="row">
            <div className="col-4">
                <label>Gender </label>
            </div>
            <div className="col-5">
                {data.gender}

            </div>

        </div>


        <div className="row">
            <div className="col-4">
                <label>IsActive</label>
            </div>
            <div className="col-5">
                {data.IsActive}

            </div>

        </div>
        <div className="row">
            <div className="col-4">
                <label>Description</label>
            </div>
            <div className="col-5">
                {data.description}

            </div>

        </div>

        <div className="row">
            <div className="col-4">
                <button className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>
            </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
