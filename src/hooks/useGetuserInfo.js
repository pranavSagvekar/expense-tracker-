export const useGetuserInfo = () => {
  const authInfo = JSON.parse(localStorage.getItem("auth")) || {};

  const {
    name = "",
    profilePhoto = "",
    userID = "",
    isAuth = false,
    createdAt = ""
  } = authInfo;

  return { name, profilePhoto, userID, isAuth  , createdAt};
};
