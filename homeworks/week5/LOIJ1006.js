const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const temp = Number(lines[0])
  const arr = []
  for (let i = 0; i < temp; i += 2) {
    arr.push([i + 1, i + 2])
  }
  for (let i = 1; i < temp - 1; i++) {
    arr.push([i, i + 2])
  }
  const limit = []
  for (let i = 2; i < lines.length; i++) {
    limit.push(Number(lines[i]))
  }
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    // eslint-disable-next-line
    outer: for (let j = 0; j < 2; j++) {
      for (let k = 0; k < limit.length; k++) {
        if (limit[k] === arr[i][j]) {
          count++
          // eslint-disable-next-line
          break outer
        }
      }
    }
  }
  const result = arr.length - count
  console.log(result)
}
