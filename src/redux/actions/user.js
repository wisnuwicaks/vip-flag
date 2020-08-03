import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
import userTypes from "../types/user";
import swal from "sweetalert";

const {
  ON_LOGIN_FAIL,
  ON_LOGIN_SUCCESS,
  ON_REGISTER_SUCCESS,
  ON_REGISTER_FAIL,
  ON_LOGOUT_SUCCESS,
} = userTypes;

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
  // alert("masuk")
  return (dispatch) => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users/login`, {
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          console.log("data login");
          console.log(res.data);
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data,
          });
        } else {
          swal("Login Failed", "Username or password was wrong", "error");
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username or password was wrong",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const userKeepLogin = (userData) => {

  console.log(userData.id);
  
  return (dispatch) => {
    const {userId} = userData
    console.log(userId);
    
    Axios.get(`${API_URL}/users/${userId}`)
      .then((res) => {
        console.log("ini then : ");
        console.log(res.data);
        
        if (res.data !== null) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username or password was wrong",
          });
        }
      })
      .catch((err) => {
        alert("err")
        console.log(err);
      });
  };
};

export const logoutHandler = (userId) => {

  // alert("logout")
  Axios.post(`${API_URL}/users/logout/${userId}`)
  .then(res=>{
      console.log(res);
      
  })
  .catch(err=>{
    console.log(err);
    
  })

  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};

export const registerHandler = (userData) => {
 
  return (dispatch) => {
    Axios.get(`${API_URL}/users/username/${userData.username}`)
      .then((res) => {
        if (res.data !=="") {
          swal("Regitration Failed", "Username already used", "success");

          dispatch({
            type: ON_REGISTER_FAIL,
            payload: "Username already used",
          });
        } else {
          Axios.post(`${API_URL}/users/add/role/${userData.role}`, userData)
            .then((res) => {
              swal("Regitration Success", "New User has been added", "success");
              console.log(userData);
              // dispatch({
              //   type: ON_REGISTER_SUCCESS,
              //   payload: userData,
              // });
            })
            .catch((err) => {
              console.log("ini err register");
              
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};
