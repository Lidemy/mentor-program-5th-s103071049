import styled from "styled-components";
import { VISIBILITY_FILTERS } from "../constants";
const FilterTodo = styled.div``;
const Button = styled.button`
  margin-left: 4px;
`;

export default function FilterList({ handleFilter, handleClearAll }) {
  return (
    <div>
      <FilterTodo>
        <Button onClick={() => handleFilter(VISIBILITY_FILTERS.ALL)}>
          all
        </Button>
        <Button onClick={() => handleFilter(VISIBILITY_FILTERS.COMPLETED)}>
          done
        </Button>
        <Button onClick={() => handleFilter(VISIBILITY_FILTERS.ACTIVE)}>
          undo
        </Button>
        <Button onClick={handleClearAll}>clear all</Button>
      </FilterTodo>
    </div>
  );
}
