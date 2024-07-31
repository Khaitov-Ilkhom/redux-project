import {ERROR, LOADING, LOGIN_USER, REGISTER_USER, SIGN_OUT} from "../action/Types.jsx";
import {saveToLocalStorage} from "../../helpers/Index.jsx";

const initialState = {
  token: localStorage.getItem("Token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isSuccessful: false,
  isError: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
      saveToLocalStorage("Token", action.token)
      saveToLocalStorage("user", JSON.stringify(action.user))
      return {
        ...state,
        token: action.token,
        user: action.user,
        loading: false,
        isSuccessful: true
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case ERROR:
      return {
        token: null,
        user: null,
        isSuccessful: false,
        loading: false,
        isError: true,
        error: action.message
      }
    case SIGN_OUT:
      localStorage.removeItem("Token")
      return {
        ...state,
        token: null,
        user: null
      }
    default:
      return state
  }
}

export default authReducer