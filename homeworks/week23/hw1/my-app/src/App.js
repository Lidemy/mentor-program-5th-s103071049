import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodosByFilterState } from "./redux/selectors.js";
import {
  addTodo,
  clearAllTodos,
  deleteTodo,
  setFilters,
  markTodos,
} from "./redux/actions";
import styled from "styled-components";
import TodoItem from "./components/TodoItem.js";
import FilterList from "./components/FilterList.js";
const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  margin-bottom: 24px;
`;
const Title = styled.div`
  font-size: 36px;
`;
const AddTodo = styled.div`
  margin-bottom: 12px;
`;
const Button = styled.button`
  margin-left: 4px;
`;

function App() {
  const filtersTodos = useSelector(selectTodosByFilterState);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleAddTodo = () => {
    if (!value) {
      return alert("not typing any word");
    }
    dispatch(addTodo(value));
    setValue("");
  };
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleToggleIsDone = (id) => {
    dispatch(markTodos(id));
  };
  const handleClearAll = () => {
    dispatch(clearAllTodos());
  };
  const handleFilter = (name) => {
    dispatch(setFilters(name));
  };
  return (
    <div>
      <TodoWrapper>
        <Title>Todo List</Title>
        <AddTodo>
          <input
            type="text"
            placeholder="please type todos"
            value={value}
            onChange={handleInputChange}
          />
          <Button onClick={handleAddTodo}>add</Button>
        </AddTodo>
        <FilterList
          handleClearAll={handleClearAll}
          handleFilter={handleFilter}
        />
      </TodoWrapper>
      {filtersTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
