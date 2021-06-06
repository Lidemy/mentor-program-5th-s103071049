const apiUrl = 'https://api.twitch.tv/kraken'
const clientID = 'ka1mgyrfu09rtyw1znuocyf6x0xciq'
const acceptUrl = 'application/vnd.twitchtv.v5+json'

const error = '系統不穩定，請再試一次'
const topGamenum = 5
const streamsNum = 20

const streamTemplate = `
          <img class='pictureUrl' src=$pictureUrl alt='picture'>
            <div class='footer'>
                <img class='logoUrl' src=$logoUrl alt='logo'>
                <div class='status'>$status</div>
                <div class='author'>$author</div>
`

getGame((games) => {
  for (let i = 0; i < topGamenum; i++) {
    const div = document.createElement('div')
    div.classList.add('item')
    div.innerHTML = games.top[i].game.name
    document.querySelector('.navbar__item').appendChild(div)
  }
})

document.querySelector('.navbar__item').addEventListener('click', (e) => {
  isChangeGame()
  if (e.target.classList[0] === 'item') {
    const gameName = e.target.innerHTML
    getStreams(gameName, (stream) => {
      document.querySelector('h2').innerHTML = gameName
      for (let i = 0; i < streamsNum; i++) {
        appendStream(stream.streams[i])
      }
    })
  }
})

function getGame(callback) {
  const request = new XMLHttpRequest()
  request.open('Get', `${apiUrl}/games/top`, true)
  request.setRequestHeader('Accept', acceptUrl)
  request.setRequestHeader('Client-ID', clientID)
  request.onload = function() {
    if (request.status >= 200 || request.status < 400) {
      let data
      try {
        data = JSON.parse(request.response)
      } catch (err) {
        alert(error)
        return
      }
      callback(data)
    }
  }
  request.onerror = function() {
    alert(error)
  }
  request.send()
}

function getStreams(gameName, callback) {
  const request = new XMLHttpRequest()
  request.open('Get', `${apiUrl}/streams/?game=${gameName}&&limit=${streamsNum}`, true)
  request.setRequestHeader('Accept', acceptUrl)
  request.setRequestHeader('Client-ID', clientID)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.response)
      } catch (error) {
        alert(error)
        return
      }
      callback(data)
    }
  }
  request.onerror = function() {
    alert(error)
  }
  request.send()
}

function appendStream(stream) {
  const div = document.createElement('div')
  div.classList.add('stream')
  div.innerHTML = streamTemplate
    .replace('$pictureUrl', stream.preview.medium)
    .replace('$logoUrl', stream.channel.logo)
    .replace('$status', stream.channel.status)
    .replace('$author', stream.channel.name)
  document.querySelector('.content').appendChild(div)
  div.parentNode.classList.add('need__reload')
}

function isChangeGame() {
  if (document.querySelector('.content').classList.contains('need__reload')) {
    document.querySelector('.content').innerHTML = ''
  }
}
