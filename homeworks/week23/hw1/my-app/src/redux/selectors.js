import { VISIBILITY_FILTERS } from "../constants";
export const selectTodos = (store) => store.todoState.todos;
export const selectFilterState = (store) => store.filterState.state;
export const selectTodosByFilterState = (store) => {
  const allTodos = selectTodos(store);
  const filterState = selectFilterState(store);
  switch (filterState) {
    case VISIBILITY_FILTERS.ALL: {
      console.log("allTodos", allTodos);
      return allTodos;
    }
    case VISIBILITY_FILTERS.COMPLETED: {
      const completed = allTodos.filter((todo) => todo.isDone);
      console.log("completed", completed);
      return completed;
    }
    case VISIBILITY_FILTERS.ACTIVE: {
      const undo = allTodos.filter((todo) => !todo.isDone);
      console.log("undo", undo);
      return undo;
    }
    default:
      return allTodos;
  }
};
