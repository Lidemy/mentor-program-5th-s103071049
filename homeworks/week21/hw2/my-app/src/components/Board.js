import React from 'react'
import styled from 'styled-components'
import Square from './Square.js'
import {calculateWinner} from '../calculateWinner.js'
import {useState} from 'react'
const Status = styled.div`
  margin-bottom: 10px;
`
const BoardRow = styled.div`
  display: flex;
`

const Board = ({squares, handleClick}) => {
  const renderSquare = (y, x) => {
    return <Square value={squares[y][x]} key={[y][x]} onClick={() => {handleClick(y, x)}}/>
  }
  return (
    <div>
    {squares.map((each, rowIndex) => {
      return (
        <BoardRow>
          {
            squares.map((each, colIndex) => {
              return renderSquare(rowIndex, colIndex)
            })
          }
        </BoardRow>
      )
    })}
    </div>
  )
}
export default Board