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
  const temp = lines[1].split(' ')
  const end = temp[temp.length - 1]
  const result = []
  let count = 0

  for (let j = 1; j <= Number(end); j++) {
    for (let i = 0; i < temp.length; i++) {
      if (Number(temp[i]) === j) {
        count++
      }
    } result.push(count)
    count = 0
  }
  // eslint-disable-next-line
  result.sort((a,b) => { return b - a })
  console.log(result[0])
}
