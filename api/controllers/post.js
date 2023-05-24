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
        const q = "SELECT username,email FROM users WHERE id = ?";

        db.query(q, [userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);

          notifyCtrl.createNotify(
            "New Post is posted by " + data[0].username,
            userInfo.id
          );
          var subject = "Post is Under Verification | WCE Achievement Portal";
          var body = `<p>Dear ${req.body.name},</p>
<p>Thank you for posting your achievement on the WCE Achievement Portal. We would like to inform you that your post is currently under verification.</p>
<p>Our team will review your submission to ensure it meets the necessary guidelines and standards. Once the verification process is complete, you will be notified of the status of your post.</p>
<p>We appreciate your patience and understanding during this process.</p>
<p>If you have any questions or need further assistance, please feel free to contact us.</p>
<p>Best regards,</p>
<p>The WCE Achievement Portal Team</p>
<p><a class="button" href="https://www.example.com">Visit WCE Achievement Portal</a></p>`;
          mailCtrl.createMail(data[0].email, subject, body);
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

export const verify = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  console.log(req.body);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE posts SET verified = 1, status = ?, admres= ? WHERE id = ?";

    db.query(
      q,
      [req.body.data.status, req.body.data.content, req.body.data.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
          // var email = "sanket.mote@walchandsangli.ac.in";
          var subject =
            req.body.data.status == 1
              ? "Post Verified - WCE Achievement Portal"
              : "Post Rejected - WCE Achievement Portal";
          var body =
            req.body.data.status == 1
              ? `<p>Dear ${req.body.data.name},</p> <p>Welcome to the WCE Achievement Portal! We are delighted to have you as a registered user. The portal offers you a comprehensive platform to track, organize, and showcase your achievements to enhance your professional and academic pursuits.</p>
               <p>Best regards,</p>
              <p>The WCE Achievement Portal Team</p>`
              : ` <p>Dear ${req.body.data.name},</p>
              <p>Thank you for posting your achievement on the WCE Achievement Portal.We regret to inform you that the achievement you submitted to the WCE Achievement Portal has been rejected. Our team carefully reviewed the information provided, and unfortunately, it did not meet the required criteria or standards for inclusion in the portal.</p>
              <p>Our team will review your submission to ensure it meets the necessary guidelines and standards. Once the verification process is complete, you will be notified of the status of your post.</p>
              <p>We appreciate your patience and understanding during this process.</p>
              <p>Rejection Reason: ${req.body.data.content}</p>
              <p>We understand that this may be disappointing, but we encourage you to review the requirements and guidelines for achievement submission and consider resubmitting your achievement after addressing the identified issues.</p>
              <p>Best regards,</p>
              <p>The WCE Achievement Portal Team</p>
              `;
          mailCtrl.createMail(req.body.data.email, subject, body);
          return res.status(200).json("Post has been verified.");
        }
        return res.status(403).json("Internal Error ");
      }
    );
  });
};

// status  - 0  rejectd
// status - 1 Accepted
// status - 2 under review
