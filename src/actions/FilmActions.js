import { ADD_FILM, DELETE_FILM, GET_FILMS } from "./types";
import axios from "axios";
import { movies$ } from "../movies";
export const getFilms = () => async dispatch => {
  const res = await movies$;
  dispatch({
    type: GET_FILMS,
    payload: res
  });
};
export const deleteFilm = id => {
  return {
    type: DELETE_FILM,
    payload: id
  };
};
// export const addFILM = FILM => {
//   return {
//     type: ADD_FILM,
//     payload: FILM
//   };
// };
