import { SET_FILTERS } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";
const initialState = {
  state: VISIBILITY_FILTERS.ALL,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS: {
      return {
        state: action.payload.filter,
      };
    }
    default: {
      return state;
    }
  }
}
