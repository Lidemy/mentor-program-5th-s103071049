export const calculateWinner = (squares, x, y) => {
  return (
    countTotal(squares, x, y, 1, 0) + countTotal(squares, x, y, -1, 0) >= 4||
    countTotal(squares, x, y, 0, 1) + countTotal(squares, x, y,  0, -1) >= 4 ||
    countTotal(squares, x, y, 1, 1) + countTotal(squares, x, y, -1, -1) >= 4 ||
    countTotal(squares, x, y, 1, -1) + countTotal(squares, x, y, -1, 1) >= 4
  )
}

function countTotal(squares ,currentY, currentX, directionX, directionY) {
  console.log('squares', squares)
  let now = squares[currentY][currentX]
  let tempX = currentX + directionX
  let tempY = currentY + directionY
  let total = 0
  if (tempX < 0) return 0
  if (tempY < 0) return 0
  if (tempX > squares.length -1) return 0
  if (tempY > squares.length -1 ) return 0
  while (squares[tempY][tempX] === now) {
    total ++
    tempX += directionX
    tempY += directionY
    if (tempX < 0) return total
    if (tempY < 0) return total
    if (tempX > squares.length -1) return total
    if (tempY > squares.length -1 ) return total
  }
  return total
}

