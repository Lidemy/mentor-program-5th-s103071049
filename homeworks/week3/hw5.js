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
  const number = Number(lines[0])

  for (let i = 1; i <= number; i++) {
    const temp = lines[i].split(' ')
    const situation = Number(temp[2])
    const a = BigInt(temp[0])
    const b = BigInt(temp[1])

    if (situation === 1) {
      if (a > b) {
        console.log('A')
      } else if (a < b) {
        console.log('B')
      } else {
        console.log('DRAW')
      }
    }
    if (situation === -1) {
      if (a > b) {
        console.log('B')
      } else if (a < b) {
        console.log('A')
      } else {
        console.log('DRAW')
      }
    }
  }
}
