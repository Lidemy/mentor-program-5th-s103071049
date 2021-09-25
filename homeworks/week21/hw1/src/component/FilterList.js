import styled from 'styled-components'

const FilterTodo = styled.div``

const Button = styled.button`
  margin-left: 4px;
`

export default function FilterList({FilterButton, handleClearAll}) {
  return (
    <div>
      <FilterTodo>
        {FilterButton}
        <Button onClick={handleClearAll}>清空</Button>
      </FilterTodo>
    </div>
  )
}