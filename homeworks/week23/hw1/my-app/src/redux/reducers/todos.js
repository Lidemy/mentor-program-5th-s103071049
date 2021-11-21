import {
  ADD_TODO,
  CLEAR_ALL_TODOS,
  DELETE_TODO,
  MARK_TODOS,
} from "../actionTypes";
let todoId = 2;
const initialState = {
  todos: [
    { id: 0, content: "study math", isDone: true },
    { id: 1, content: "play basketball with joe", isDone: false },
  ],
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,

          { id: todoId++, content: action.payload.content, isDone: false },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case MARK_TODOS: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }
    case CLEAR_ALL_TODOS: {
      return {
        ...state,
        todos: action.payload.content,
      };
    }
    default: {
      return state;
    }
  }
}
