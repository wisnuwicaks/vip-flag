import userTypes from "../types/user";

const { ON_LOGIN_FAIL, 
  ON_LOGIN_SUCCESS, 
  ON_LOGOUT_SUCCESS,
  ON_REGISTER_FAIL,
  ON_REGISTER_SUCCESS,
  ITEMS_ON_TABLE_CHANGE,
  ON_CART_UPDATE,
  ON_WISHLIST_UPDATE 
} = userTypes;

const init_state = {
  id: 0,
  username: "",
  role: "",
  errMsg: "",

};  

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username,email, fullName, role, id,password } = action.payload;
      return {
        ...state,
        username,
        password,
        role,
        id,
        cookieChecked: true,
      };
      
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload,cookieChecked:true };
    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked:true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked:true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    default:
      return { ...state, };
  }
};
