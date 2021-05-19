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
  const arr = []
  for (let i = 1; i < lines.length; i++) {
    const temp = lines[i].split(' ')
    const score = Number(temp[1])
    arr.push(score)
  }
  const arr2 = sort(arr)

  for (let i = 1; i < lines.length; i++) {
    const temp = lines[i].split(' ')
    const score = Number(temp[1])
    if (score === arr2[0]) {
      console.log(temp[0])
    }
  }
}

function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  } return arr
}
