import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  });
};

export const getCount = (req, res) => {
  const userId = req.query.userId;
  var q = ""
  if(userId == undefined || userId == NULL || userId == ""){
      q = "SELECT count(*) as cnt FROM posts"
  } else {
      q = "SELECT count(p.*) as cnt , u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u WHERE p.userId = ?"
  }
  

  db.query(q, userId, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  console.log(req.body);
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const q =
        "INSERT INTO posts(`teammate`, `desc`, `createdAt`, `area`,`startDate`,`endDate`,`images`,`userid`) VALUES (?)";
      const values = [
        req.body.name,
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.area,
        req.body.startDate,
        req.body.endDate,
        JSON.stringify(req.body.images),
        userInfo.id,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
