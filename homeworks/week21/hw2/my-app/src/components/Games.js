import React from 'react'
import styled from 'styled-components'
import Board from './Board.js'
import {useState} from 'react'
import {calculateWinner} from '../calculateWinner.js'

const Flex = styled.div`
  display: flex
`
const Info = styled.div`
  margin-left : 20px;
`
const Wrapper = styled.div`
  padding: 20px;
`

const Games = () => {
  let status
  const size = 19
  let square = []
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      row.push('')
    }
    square.push(row)
  }
  const [historyState, setHistoryState] = useState({history:[{squares: square}], xIsNext: true, stepNumber: 1, winner: null})
  let history = historyState.history.slice(0, historyState.stepNumber + 1)
  let current = history[history.length - 1]
  let squares = current.squares.slice()
  let newSquares = JSON.parse(JSON.stringify(squares))
  const handleClick = (y, x) => {
    if (squares[y][x] || historyState.winner) {
      return
    }
    newSquares[y][x] = historyState.xIsNext ? '●' : 'o'
    setHistoryState({
      history: history.concat([{squares: newSquares}]) , 
      xIsNext: !historyState.xIsNext, 
      stepNumber: historyState.history.length, 
      winner: calculateWinner(newSquares, y, x), 
      winnerColor: newSquares[y][x]
    })
  }
  const jumpTo = (step) => {
    setHistoryState({...historyState, xIsNext: (step % 2) === 0 , stepNumber: step, winner: null})
  }
  let desc
  const moves = history.map((step, move) => {
     desc = move ? `go to move #${move}` : 'go to game start'
     return (
      <div key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </div>
     )
  })
  if (historyState.winner) {
    status = `winner is ${historyState.winnerColor}`
  } else {
    status = `next player ${historyState.xIsNext ? '●' : '○'}`
  }
  return (
    <div>
      <Wrapper>
        <Flex>
        <Board squares={current.squares} handleClick={handleClick}/>
        <Info>
          <div>{status}</div>
          <div>{moves}</div>
        </Info>
        </Flex>
      </Wrapper>
    </div>
  )
}

export default Games