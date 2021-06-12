document.querySelector('.wrapper .lottery__btn').addEventListener('click', (e) => {
  const request = new XMLHttpRequest()
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText
      let json
      try {
        json = JSON.parse(response)
      } catch (error) {
        alert('系統不穩定，請再試一次')
        window.location.reload()
        return
      }
      if (!json.prize) {
        alert('系統不穩定，請再試一次')
        window.location.reload()
        return
      }
      if (json.prize === 'FIRST') {
        isTrue(isHide, 'lottery__block')
        isTrue(isHide, 'original-pic')
        isTrue(isHide, 'first__prize-pic')
      } else if (json.prize === 'SECOND') {
        isTrue(isHide, 'lottery__block')
        isTrue(isHide, 'original-pic')
        isTrue(isHide, 'second__prize-pic')
      } else if (json.prize === 'THIRD') {
        isTrue(isHide, 'lottery__block')
        isTrue(isHide, 'original-pic')
        isTrue(isHide, 'third__prize-pic')
      } else if (json.prize === 'NONE') {
        isTrue(isHide, 'lottery__block')
        isTrue(isHide, 'original-pic')
        isTrue(isHide, 'none__prize-pic')
      } else {
        alert('系統不穩定，請再試一次')
        window.location.reload()
      }
    } else {
      alert('系統不穩定，請再試一次')
      window.location.reload()
    }
  }
  request.onerror = function() {
    alert('系統不穩定，請再試一次')
    window.location.reload()
  }
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
  request.send()
}, { once: true })

function isHide(className) {
  if (document.querySelector(`.${className}`).classList.contains('hide')) {
    return true
  } else {
    return false
  }
}

function isTrue(funct, className) {
  if (funct(className) === true) {
    document.querySelector(`.${className}`).classList.remove('hide')
  } else {
    document.querySelector(`.${className}`).classList.add('hide')
  }
}
