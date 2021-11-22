import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_ALL_TODOS,
  MARK_TODOS,
  SET_FILTERS,
} from "./actionTypes";
export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    },
  };
}
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}
export function markTodos(id) {
  return {
    type: MARK_TODOS,
    payload: {
      id,
    },
  };
}
export function clearAllTodos() {
  return {
    type: CLEAR_ALL_TODOS,
    payload: {
      content: [],
    },
  };
}

export function setFilters(filter) {
  return {
    type: SET_FILTERS,
    payload: {
      filter,
    },
  };
}
