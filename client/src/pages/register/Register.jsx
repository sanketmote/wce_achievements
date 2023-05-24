import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { makeRequest } from "../../axios";
const formvalid = () => {
  var vaildpass = document.getElementById("pass").value;

  if (vaildpass.length <= 8 || vaildpass.length >= 20) {
    document.getElementById("vaild-pass").innerHTML = "Minimum 8 characters";
    return false;
  } else {
    document.getElementById("vaild-pass").innerHTML = "";
  }
};

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await makeRequest.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form " target="_blank">
          <div class="imgcontainer">
            {/* <img src="/wce.png" alt="colleg logo" class="avatar" /> */}
            <h2>WCE ACHIEVEMENTS</h2>
            <bold>Register Now</bold>
          </div>

          <input
            type="text"
            required
            name="email"
            placeholder="Enter your email"
            id="user"
            autocomplete="off"
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your Name"
            id="name"
            autocomplete="off"
            onChange={handleChange}
          />
          <input
            name="username"
            type="text"
            required
            placeholder="Enter your username"
            id="username"
            autocomplete="off"
            onChange={handleChange}
          />
          <input
            oninput={formvalid}
            type="password"
            required
            name="password"
            placeholder="Enter Password"
            id="pass"
            autocomplete="off"
            onChange={handleChange}
          />
          {err && err}
          <span id="vaild-pass"></span>
          <button type="submit" onClick={handleClick}>Register</button>


          <p class="message">
            <a href="/login">     Already have an Atlassian account? Log in </a>
          </p>
        </form>
      </div>
    </div>
    // <div className="register">
    //   <div className="card">
    //     <div className="">
    //       <h1>Welcome to WCE Achievements</h1>
    //       <p>

    //       </p>
    //       <span>Do you have an account?</span>
    //       <Link to="/login">
    //         <button>Login</button>
    //       </Link>
    //     </div>
    //     <div className="right">
    //       <h1>Register</h1>
    //       <form>
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           name="username"
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           name="email"
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           name="password"
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Name"
    //           name="name"
    //           onChange={handleChange}
    //         />
    //         {err && err}
    //         <button onClick={handleClick}>Register</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Register;
