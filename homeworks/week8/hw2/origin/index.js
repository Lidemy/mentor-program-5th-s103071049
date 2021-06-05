const topGamesApi = 'https://api.twitch.tv/kraken/games/top'
const error = '系統不穩定，請再試一次'
const topGamenum = 5
const xhr = new XMLHttpRequest()
xhr.open('Get', topGamesApi, true)
xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
xhr.setRequestHeader('Client-ID', 'ka1mgyrfu09rtyw1znuocyf6x0xciq')

xhr.onload = function() {
  if (xhr.status >= 200 || xhr.status < 400) {
    let json
    try {
      json = JSON.parse(xhr.response)
    } catch (err) {
      alert(error)
    }
    for (let i = 0; i < topGamenum; i++) {
      const div = document.createElement('div')
      div.classList.add('item')
      // eslint-disable-next-line
      div.innerHTML = `${json.top[i].game['name']}`
      document.querySelector('.navbar__item').appendChild(div)
    }
  }
}
xhr.onerror = function() {
  alert(error)
}
xhr.send()

const xhrTwo = new XMLHttpRequest()
const streamsNum = 20
document.querySelector('.navbar__item').addEventListener('click', (e) => {
  if (document.querySelector('.content').classList.contains('need__reload')) {
    console.log(document.querySelector('.content'))
    document.querySelector('.content').innerHTML = ''
  }
  if (e.target.classList[0] === 'item') {
    const target = e.target.innerHTML
    const streamsApi = `https://api.twitch.tv/kraken/streams/?game=${target}&&limit=${streamsNum}`
    xhrTwo.open('Get', streamsApi, true)
    xhrTwo.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    xhrTwo.setRequestHeader('Client-ID', 'ka1mgyrfu09rtyw1znuocyf6x0xciq')
    xhrTwo.onload = function() {
      if (xhrTwo.status >= 200 && xhrTwo.status < 400) {
        let json
        try {
          json = JSON.parse(xhrTwo.response)
        } catch (error) {
          alert(error)
        }
        document.querySelector('h2').innerHTML = `${target}`
        for (let i = 0; i < streamsNum; i++) {
          const data = json.streams[i]
          const pictureUrl = data.preview.medium
          const logoUrl = data.channel.logo
          const author = data.channel.name
          // eslint-disable-next-line
          const status = data.channel.status
          const div = document.createElement('div')
          div.classList.add('stream')
          div.innerHTML = `
          <img class='pictureUrl' src=${pictureUrl} alt='picture'>
            <div class='footer'>
                <img class='logoUrl' src=${logoUrl} alt='logo'>
                <div class='status'>${status}</div>
                <div class='author'>${author}</div>
        `
          document.querySelector('.content').appendChild(div)
          div.parentNode.classList.add('need__reload')
        }
      }
    }
    xhrTwo.onerror = function() {
      alert(error)
    }
    xhrTwo.send()
  }
})
