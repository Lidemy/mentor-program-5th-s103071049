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
  const l = lines[0].split(' ')

  const n = Number(l[0])
  const m = Number(l[1])

  for (let i = n; i <= m; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function digitsCount(n) {
  if (n === 0) {
    return 1
  }
  let result = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    result++
  } return result
}

function isNarcissistic(n) {
  let m = n
  const digits = digitsCount(m)
  let sum = 0
  while (m !== 0) {
    const num = m % 10
    sum += num ** digits
    m = Math.floor(m / 10)
  }
  if (sum === n) {
    return true
  } else {
    return false
  }
}
