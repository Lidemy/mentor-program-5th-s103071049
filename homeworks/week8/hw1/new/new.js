const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage = '系統不穩定，請再試一次'

function draw(cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', apiUrl, true)
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      let data
      try {
        data = JSON.parse(xhr.response)
      } catch (err) {
        cb(errorMessage)
        return
      }
      if (!data.prize) {
        cb(errorMessage)
        return
      }
      cb(null, data)
    } else {
      cb(errorMessage)
    }
  }
  xhr.onerror = function() {
    cb(errorMessage)
  }
  xhr.send()
}

document.querySelector('.lottery__btn').addEventListener('click', (e) => {
  draw((err, data) => {
    if (err) {
      alert(err)
      return
    }

    const prizes = {
      FIRST: {
        className: 'first__prize',
        title: '恭喜你中頭獎了！日本東京來回雙人遊！'
      },
      SECOND: {
        className: 'second__prize',
        title: '二獎！90 吋電視一台！'
      },
      THIRD: {
        className: 'third__prize',
        title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
      },
      NONE: {
        className: 'none__prize',
        title: '銘謝惠顧'
      }
    }
    const { className, title } = prizes[data.prize]
    document.querySelector('.banner').classList.add(className)
    document.querySelector('.lottery__result-title').innerText = title
    document.querySelector('.lottery__block').classList.add('hide')
    document.querySelector('.lottery__result').classList.remove('hide')
  })
})
