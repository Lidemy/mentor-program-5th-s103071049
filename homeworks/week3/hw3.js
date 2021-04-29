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
  const total = Number(lines[0])
  for (let i = 1; i <= total; i++) {
    const temp = Number(lines[i])

    if (temp === 1) {
      console.log('Composite')
    } else if (temp === 2) {
      console.log('Prime')
    } else {
      let count = 0
      for (let j = 2; j < temp; j++) {
        if (temp % j === 0) {
          count++
        }
      }
      if (count === 0) {
        console.log('Prime')
      } else {
        console.log('Composite')
      }
    }
  }
}
