import { useState } from "react";
import { Link } from "react-router-dom";
import "./man.scss";
import { makeRequest } from "../../../axios";

const AdminManagement = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      inputs.role = 1;
      await makeRequest.post("/auth/register", inputs).then((res)=>{
            window.alert("Admin Added succefully ")
            window.location.reload()
      }).catch((err)=>{
        console.log(err)
        window.alert("Error in Admin Added")
        window.location.reload()
      });
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register New Admin</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
