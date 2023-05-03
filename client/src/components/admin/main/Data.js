import { makeRequest } from "../../../axios";

export const ADMIN_TYPES = {
  GET_TOTAL_USERS: "GET_TOTAL_USERS",
  GET_TOTAL_POSTS: "GET_TOTAL_POSTS",
  GET_TOTAL_COMMENTS: "GET_TOTAL_COMMENTS",
  GET_TOTAL_LIKES: "GET_TOTAL_LIKES",
  GET_TOTAL_SPAM_POSTS: "GET_TOTAL_SPAM_POSTS",
  GET_TOTAL_ACTIVE_USERS: "GET_TOTAL_ACTIVE_USERS",
  GET_SPAM_POSTS: "GET_SPAM_POSTS",
  LOADING_ADMIN: "LOADING_ADMIN",
  DELETE_POST: "DELETE_POST",
};

export const getTotalUsers = () => async () => {
  try {
    return await makeRequest.get("/users/count/").then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTotalPosts = () => async () => {
  try {
    return await makeRequest.get("/users/count/").then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTotalComments = () => async () => {
  try {
    return await makeRequest.get("/users/count/").then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTotalLikes = () => async () => {
  try {
    return await makeRequest.get("/users/count/").then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTotalSpamPosts = () => async () => {
  try {
    await makeRequest.get("/users/count/").then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSpamPosts = () => async () => {
  try {
    await makeRequest.get("/users/count/").then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

// export const getTotalActiveUsers =
//   ({ auth, socket }) =>
//   async (dispatch) => {
//     try {
//       socket.emit("getActiveUsers", auth.user._id);
//     } catch (err) {
//       console.log(err);
//     }
//   };
