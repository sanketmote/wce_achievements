import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";
  console.log(q)
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getCount = (req, res) => {
  const q = "SELECT count(*) as cnt FROM users";
  const q1 = "SELECT count(*) as cnt FROM users where status = 0";
  const q2 = "SELECT count(*) as cnt FROM users where status = 2";
  const q3 = "SELECT count(*) as cnt FROM users where status = 1";
  db.query(q, (err, total) => {
    if (err) return res.status(500).json(err);
    db.query(q1, (err, tst) => {
      if (err) return res.status(500).json(err);
      db.query(q2, (err, tst1) => {
        if (err) return res.status(500).json(err);
        // return res.json(data);
        db.query(q3, (err, tst2) => {
          if (err) return res.status(500).json(err);
          return res.json({total:total.data[0].cnt,rej:tst.data[0].cnt,pend:tst1.data[0].cnt,acc:tst2.data[0].cnt});
        });
      });
      // return res.json(data);
    });
    // return res.json(data);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};
