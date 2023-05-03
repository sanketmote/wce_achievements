import "./Main.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
// import Chart from "../charts/Chart";

import { makeRequest } from "../../../axios";

const Main = () => {
  const { currentUser, logOut, isAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [admin, setadmin] = useState({
    total_users: 0,
    total_posts: 0,
    total_comments: 0,
    total_likes: 0,
    total_active_users: 0,
  });

  const getTotalUsers = async () => {
    try {
      setLoading(true);
      // get user count
      var data = await makeRequest.get("/users/count/").then((res) => {
        return res.data[0];
      });
      console.log(data);
      setadmin((prev) => ({ ...prev,total_users: data.cnt }));
      // get posts couint
      data = await makeRequest.get("/posts/count/").then((res) => {
        return res.data[0];
      });
      console.log("posts", data);
      setadmin((prev) => ({ ...prev, total_posts: data.cnt }));
      // get comments count
      data = await makeRequest.get("/comments/count/").then((res) => {
        return res.data;
      });
      console.log("comments", data);
      setadmin((prev) => ({ ...prev, total_comments: data }));
      // get likes count
      data = await makeRequest.get("/likes/count/").then((res) => {
        return res.data;
      });
      console.log("likes", data);
      setadmin((prev) => ({ ...prev,total_likes: data }));
      // console.log(admin)
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalUsers();
    // setadmin(admin);
  }, []);
  return (
    <>
      {loading ? (
        <span>wait loading</span>
      ) : (
        <div className="main_admin">
          <div className="main__container">
            {/* <!-- MAIN TITLE STARTS HERE --> */}

            <div className="main__title">
              <div className="main__greeting">
                <h1>Hello </h1>
                <p>Welcome to your Admin Dashboard</p>
              </div>
            </div>

            {/* <!-- MAIN TITLE ENDS HERE --> */}

            {/* <!-- MAIN CARDS STARTS HERE --> */}
            <div className="main__cards">
              <div className="card_admin">
                <i
                  className="fa fa-users fa-2x text-lightblue"
                  aria-hidden="true"
                ></i>
                <div className="card_inner_admin">
                  <p className="text-primary-p">Total Users</p>
                  <span className="font-bold text-title">
                    {admin.total_users}
                  </span>
                </div>
              </div>

              <div className="card_admin">
                <i
                  className="fa fa-comments fa-2x text-red"
                  aria-hidden="true"
                ></i>
                <div className="card_inner_admin">
                  <p className="text-primary-p">Total Comments</p>
                  <span className="font-bold text-title">
                    {admin.total_comments}
                  </span>
                </div>
              </div>

              <div className="card_admin">
                <i
                  className="fa fa-camera fa-2x text-yellow"
                  aria-hidden="true"
                ></i>
                <div className="card_inner_admin">
                  <p className="text-primary-p">Total Posts</p>
                  <span className="font-bold text-title">
                    {admin.total_posts}
                  </span>
                </div>
              </div>

              <div className="card_admin">
                <i className="fa fa-ban fa-2x text-red" aria-hidden="true"></i>
                <div className="card_inner_admin">
                  <p className="text-primary-p">Reported Posts</p>
                  <span className="font-bold text-title">
                    {admin.total_likes}
                  </span>
                </div>
              </div>

              <div className="card_admin">
                <i
                  className="fa fa-thumbs-up fa-2x text-green"
                  aria-hidden="true"
                ></i>
                <div className="card_inner_admin">
                  <p className="text-primary-p">Total Likes</p>
                  <span className="font-bold text-title">
                    {admin.total_likes}
                  </span>
                </div>
              </div>

              <div className="card_admin">
                <i
                  className="fa fa-check-circle fa-2x  text-green"
                  aria-hidden="true"
                ></i>
                <div className="card_inner_admin">
                  <p className="text-primary-p">Total Active Users</p>
                  <span className="font-bold text-title">
                    {admin.total_active_users}
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- MAIN CARDS ENDS HERE --> */}

            {/* <!-- CHARTS STARTS HERE 
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Income</h1>
                <p>$75,300</p>
              </div>

              <div className="card2">
                <h1>Sales</h1>
                <p>$124,200</p>
              </div>

              <div className="card3">
                <h1>Users</h1>
                <p>3900</p>
              </div>

              <div className="card4">
                <h1>Orders</h1>
                <p>1881</p>
              </div>
            </div>
          </div>
        </div>
        CHARTS ENDS HERE --> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
