import styled from "styled-components";

const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TodoContent = styled.div`
  display: flex;
  border: 1px solid gray;
  padding: 6px;
  border-radius: 4px;
  width: 700px;
  position: relative;
  ${(props) => props.$isDone && `text-decoration: line-through`}
`;

const TodoItemButton = styled.div`
  position: absolute;
  right: 4px;
`;

const Button = styled.button`
  margin-left: 4px;
`;

export default function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  return (
    <div>
      <TodoItemWrapper data-todo-id={todo.id}>
        <TodoContent $isDone={todo.isDone}>
          {todo.content}
          <TodoItemButton>
            <Button
              onClick={() => {
                handleDeleteTodo(todo.id);
              }}
            >
              delete
            </Button>
            <Button
              onClick={() => {
                handleToggleIsDone(todo.id);
              }}
            >
              {todo.isDone ? "undone" : "done"}
            </Button>
          </TodoItemButton>
        </TodoContent>
      </TodoItemWrapper>
    </div>
  );
}
