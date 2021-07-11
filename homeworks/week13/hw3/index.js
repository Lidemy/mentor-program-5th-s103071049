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
  fetch(`${apiUrl}/games/top`, {
    method: 'GET',
    headers: new Headers({
      'Accept': acceptUrl,
      'Client-ID': clientID
    })
  })
  .then((response) => {
    if (response.status >= 200 && response.status < 400) {
      return response.text()
    }
  }).then(text => {
    let data = JSON.parse(text)
    callback(data)
  }).catch(err => {
    alert(error)
    return
  })
}

function getStreams(gameName, callback) {
  fetch(`${apiUrl}/streams/?game=${gameName}&&limit=${streamsNum}`, {
    method: 'GET',
    headers: new Headers({
      'Accept': acceptUrl,
      'Client-ID': clientID
    })
  })
  .then((response) => {
    if (response.status >=200 && response.status < 400) {
      return response.text()
    }
  }).then(text => {
    let data = JSON.parse(text)
    callback(data)
  }).catch(err => {
    alert(error)
    return
  })
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