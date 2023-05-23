import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.css";

//TODO : Its a Completed Code
const formvalid = () => {
  var vaildpass = document.getElementById("pass").value;

  if (vaildpass.length <= 8 || vaildpass.length >= 20) {
    document.getElementById("vaild-pass").innerHTML = "Minimum 8 characters";
    return false;
  } else {
    document.getElementById("vaild-pass").innerHTML = "";
  }
};

const show = () => {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
    document.getElementById("showimg").src =
      "https://static.thenounproject.com/png/777494-200.png";
  } else {
    x.type = "password";
    document.getElementById("showimg").src =
      "https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png";
  }
};

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login, isAdmin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      if (!isAdmin) navigate("/");
      else navigate("/admin");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form " target="_blank">
          <div class="imgcontainer">
            <img src="/wce.png" alt="colleg logo" class="avatar" />
            <h2>WCE ACHIEVEMENTS</h2>
            <bold>Log in to continue</bold>
          </div>

          <input
            type="text"
            required
            placeholder="Enter your email"
            id="user"
            autocomplete="off"
            onChange={handleChange}
          />
          <input
            oninput={formvalid}
            type="password"
            required
            placeholder="Enter Password"
            id="pass"
            autocomplete="off"
            onChange={handleChange}
          />
          {err && err}
          <span id="vaild-pass"></span>
          <button type="submit" onClick={handleLogin}>Log in</button>


          <p class="message">
            <a href="/register"> Can't log in? • Create an account</a>
          </p>
        </form>
      </div>
    </div>
    // <div className="login">
    //   <div className="card">
    //     <div className="left">
    //       <h1>Welcome to WCE Achievements.</h1>

    //     </div>
    //     <div className="right">
    //       <h1>Login</h1>
    //       <form>
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           name="username"
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           name="password"
    //           onChange={handleChange}
    //         />
    //         {err && err}
    //         <button onClick={handleLogin}>Login</button>
    //       </form>

    //       <span>Don't you have an account?</span>
    //       <Link to="/register">
    //         <button>Register</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
