import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import notifyCtrl from "./activity.js";
import mailCtrl from "./mail.js";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId !== "undefined");

    const q =
      userId == "undefined" ||
      userId == undefined ||
      userId == NULL ||
      userId == ""
        ? `SELECT p.*, u.id AS userId, name, profilePic,email FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic,email FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      console.log(q, data);
      return res.status(200).json(data);
    });
  });
};

export const getCount = (req, res) => {
  const userId = req.query.userId;
  var q = "";
  if (userId == undefined || userId == NULL || userId == "") {
    q = "SELECT count(*) as cnt FROM posts";
  } else {
    q =
      "SELECT count(p.*) as cnt , u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u WHERE p.userId = ?";
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
        "INSERT INTO `posts` (`teammate`,`desc`, `area`, `startDate`, `endDate`, `images`, `userid`, `createdAt`, `outcome`, `obj`, `type`, `award`)  VALUES (?)";
      const values = [
        req.body.name,
        req.body.desc,
        req.body.area,
        req.body.startDate,
        req.body.endDate,
        JSON.stringify(req.body.images),
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.outcome,
        req.body.obj,
        JSON.stringify(req.body.type),
        req.body.award,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        const q = "SELECT username FROM users WHERE id = ?";

        db.query(q, [userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);

          notifyCtrl.createNotify(
            "New Post is posted by " + data[0].username,
            userInfo.id
          );
          return res.status(200).json("Post has been created.");
        });
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

var email = "sanket.mote@walchandsangli.ac.in";
var subject = "Regarding Added Achievement in WCE ACHIEVEMENT Website";
var body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* CSS Styles */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f6f6f6;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
          }
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Post Under Verification</h1>
          <p>Dear [Username],</p>
          <p>Thank you for posting your achievement on the WCE Achievement Portal. We would like to inform you that your post is currently under verification.</p>
          <p>Our team will review your submission to ensure it meets the necessary guidelines and standards. Once the verification process is complete, you will be notified of the status of your post.</p>
          <p>We appreciate your patience and understanding during this process.</p>
          <p>If you have any questions or need further assistance, please feel free to contact us.</p>
          <p>Best regards,</p>
          <p>The WCE Achievement Portal Team</p>
          <p><a class="button" href="https://www.example.com">Visit WCE Achievement Portal</a></p>
        </div>
      </body>
      </html>
      `;
export const verify = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  console.log(req.body);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE posts SET verified = 1, status = ?, admres= ? WHERE id = ?";
    // mailCtrl.createMail(email, subject, body);
    db.query(
      q,
      [req.body.data.status, req.body.data.content, req.body.data.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0)
          return res.status(200).json("Post has been verified.");
        return res.status(403).json("Internal Error ");
      }
    );
  });
};

// status  - 0  rejectd
// status - 1 Accepted
// status - 2 under review
