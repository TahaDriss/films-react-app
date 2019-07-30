import { combineReducers } from "redux";
import FilmReducer from "./FilmReducer";

export default combineReducers({
  film: FilmReducer
});
