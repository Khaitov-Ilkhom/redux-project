import {combineReducers} from "redux";
import authReducer from "./authReducer.js";
import cartReducer from "./cartReducer.js";


const rootReducer = combineReducers({
  authReducer: authReducer,
  cartReducer: cartReducer,
})

export default rootReducer