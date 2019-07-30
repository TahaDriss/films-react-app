import { GET_FILMS, DELETE_FILM, ADD_FILM } from "../actions/types";

const initialState = {
  Films: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILMS:
      return {
        ...state,
        Films: action.payload
      };
    case DELETE_FILM:
      return {
        ...state,
        Films: state.Films.filter(film => film.id !== action.payload)
      };
    // case ADD_FILM:
    //   return {
    //     ...state,
    //     contacts: [action.payload, ...state.contacts]
    //   };
    default:
      return state;
  }
}
