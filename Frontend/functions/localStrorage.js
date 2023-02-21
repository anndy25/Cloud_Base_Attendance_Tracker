import jwt_decode from "jwt-decode";

export const setUserInfo = (data) => {
    localStorage.setItem("token", data);
    localStorage.setItem("userInfo", JSON.stringify(jwt_decode(data)));
  };

   
 export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  };

  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };