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
  const temp = lines[0].split(' ')
  const numberGood = Number(temp[0]) // 物品數
  const limitWeight = Number(temp[1]) // 限重
  const arrDp = []
  for (let i = 0; i <= numberGood; i++) {
    arrDp[i] = []
    for (let j = 0; j <= limitWeight; j++) {
      arrDp[i][j] = 0
    }
  } // console.log(arr_dp)
  const weight = []
  const value = []

  for (let i = 1; i < lines.length; i++) {
    const temp = lines[i].split(' ')
    weight[i] = Number(temp[0])
  }

  weight[0] = 0
  for (let i = 1; i < lines.length; i++) {
    const temp = lines[i].split(' ')
    value[i] = Number(temp[1])
  }
  value[0] = 0
  for (let i = 1; i <= numberGood; i++) {
    for (let j = 1; j <= limitWeight; j++) {
    // 放不下的情況
      if (j < weight[i]) {
        arrDp[i][j] = arrDp[i - 1][j]
      // console.log( arr_dp[i-1][j])
      } else {
        arrDp[i][j] = findMax(arrDp[i - 1][j], arrDp[i - 1][j - weight[i]] + value[i])
        // console.log(findMax(arr_dp[i-1][j], arr_dp[i-1][j-weight[i]]+value[i]))
      }
    }
  }
  console.log(arrDp[numberGood][limitWeight])
}

function findMax(a, b) {
  if (a > b) {
    return a
  } else {
    return b
  }
}
