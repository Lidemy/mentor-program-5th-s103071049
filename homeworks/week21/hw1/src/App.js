import {useState} from 'react'
import styled from 'styled-components'
import TodoItem from './component/TodoItem.js'
import FilterList from './component/FilterList.js'
const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  margin-bottom: 24px;
`
const Title = styled.div`
  font-size: 36px;
`
const AddTodo = styled.div`
  margin-bottom: 12px;
`
const Button = styled.button`
  margin-left: 4px;
`

let id = 2
function App() {
  const [todos, setTodos] = useState([{id:0, content: 'done', isDone: true}, {id:1, content: 'not done', isDone: false}])
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('All')
  // 新增
  const handleAddTodo = () => {
    if (!value) {
      return alert('尚未輸入內容')
    }
    setTodos([{
      id, content: value
    }, ...todos])
    setValue('')
    id ++
  }
  const handleInputChange = e => {
    setValue(e.target.value)
  }
  // 刪除
  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  // mark
  const handleToggleIsDone = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }
  // 清空
  const handleClearAll = () => {
    setTodos([])
  }
  // filter 功能
  const handleFilter = (name) => {
    setFilter(name)
  }
  const FilterMap = {
  All: () => true,
  Active: todo => !todo.isDone,
  Completed: todo => todo.isDone
  }
  const FilterNames = Object.keys(FilterMap)
  const FilterButton = FilterNames.map(name => (
  <Button key={name} name={name} onClick={() => {handleFilter(name)}}>{name}</Button>
  ))
  return (
    <div>
      <TodoWrapper>
        <Title>Todo List</Title>
        <AddTodo>
          <input type="text" placeholder="請輸入代辦事項" value={value} onChange={handleInputChange} />
          <Button onClick={handleAddTodo}>新增</Button>
        </AddTodo>
        <FilterList handleClearAll={handleClearAll} FilterButton={FilterButton}/>
      </TodoWrapper>
        {todos.filter(FilterMap[filter]).map((todo) => 
          <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone}/>)
        }
    </div>
  );
}

export default App;
