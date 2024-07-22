import {ERROR, LOADING, LOGIN_USER, REGISTER_USER} from "../action/Types.jsx";

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isSuccessful: false,
  isError: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
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
    default:
      return state
  }
}

export default reducer