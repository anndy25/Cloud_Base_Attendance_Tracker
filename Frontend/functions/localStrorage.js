import jwt_decode from "jwt-decode";
import { destroyCookie } from 'nookies';

export const setUserInfo = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(jwt_decode(data)));
  };

  
  export const logout = () => {
    destroyCookie(null, 'auth');
    localStorage.removeItem("userInfo");
  };