export const SET_USER = "SET_USER";

//user actions creator

export const userAction = (user) => {
  return {
    type: SET_USER,
    user: user,
  };
};
