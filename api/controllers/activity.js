import { db } from "../connect.js";
const notifyCtrl = {
  createNotify: async (title, userid) => {
    try {
      const q = "INSERT INTO `activitis` ( `title`, `userid`) VALUES(?)";

      const values = [title, userid];

      db.query(q, [values], (err, data) => {
        console.log(err, data);
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default notifyCtrl;
