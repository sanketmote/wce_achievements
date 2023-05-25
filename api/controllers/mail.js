import axios from "axios";

const mailCtrl = {
  createMail: async (email, subject, body) => {
    try {
      // "Dear User,\nThank you for your time in adding your new Achievement in WCE ACHIEVEMENT. \n" +
      // "\nHowever We have found some problem in your Achievement Post.Please Take a look on it and try again" +
      // (content != ""
      //   ? "\n This is Comment From Admin Take a look:\n" + content
      //   : "") +
      // "\nThanks and Regards, WCE ACHIEVEMENT Team\n" +
      // "\n\nPlease do not reply to this e-mail," +
      // "\n\nthis is a system generated email sent from an unattended mail box.";
      var URI =
        "https://script.google.com/macros/s/AKfycbzew5mkEryjZTkLhqQDFgCWQ1uNkPmwG-5_gK5sgzn6B6IJkAdVCeJaREftveaiVCyt/exec" +
        "?recipient=" +
        email +
        "&subject=" +
        subject +
        "&body=" +
        body +
        "&status=0";

      fetch(encodeURI(URI), {
        method: "GET",
        payload: JSON.stringify({recipient:email,subject:subject, body:body}),
      })
        .then((data) => {
          console.log(data);
          
        })
        .catch((err) => {
          console.log(err);
        });
      // axios
      //   .get(encodeURI(URI),)
      //   .then((data) => {
      //     console.log(data.data)
      //     console.log("Email sent");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } catch (err) {
      console.log(err);
    }
  },
};

export default mailCtrl;
