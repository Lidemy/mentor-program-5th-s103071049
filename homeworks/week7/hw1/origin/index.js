/* eslint-disable */
document.querySelector('form').addEventListener('submit',
  function(e) {
    e.preventDefault()
    // 暱稱
    const temp1 = document.querySelector('input[name = nickname]').value
    if (temp1 === null || temp1 === '') {
      document.querySelector('#warn1').style.visibility = 'visible'
    } else {
      document.querySelector('#warn1').style.visibility = 'hidden'
    }
    // email
    const temp2 = document.querySelector('input[name = email]').value
    if (temp2 === null || temp2 === '') {
      document.querySelector('#warn2').style.visibility = 'visible'
    } else {
      document.querySelector('#warn2').style.visibility = 'hidden'
    }
    // phone
    const temp3 = document.querySelector('input[name = phone]').value
    if (temp3 === null || temp3 === '') {
      document.querySelector('#warn3').style.visibility = 'visible'
    } else {
      document.querySelector('#warn3').style.visibility = 'hidden'
    }
    // 如何得知活動
    const temp4 = document.querySelector('input[name = referal]').value
    if (temp4 === null || temp4 === '') {
      document.querySelector('#warn5').style.visibility = 'visible'
    } else {
      document.querySelector('#warn5').style.visibility = 'hidden'
    }
    // 報名類型
    const temp5 = document.querySelector('#radio1').checked
    const temp6 = document.querySelector('#radio2').checked
    if (temp5 === false && temp6 === false) {
      document.querySelector('#warn4').style.visibility = 'visible'
    } else {
      document.querySelector('#warn4').style.visibility = 'hidden'
    }
    let temp7　=　''
    if (temp5 === true) {
      temp7 = '躺在床上用想像力實作'
    } else {
      temp7 = '趴在地上滑手機找現成的'
    }
    if (document.querySelector('#warn1').style.visibility === 'hidden'
      &&　document.querySelector('#warn2').style.visibility === 'hidden'
      &&　document.querySelector('#warn3').style.visibility === 'hidden'
      &&　document.querySelector('#warn4').style.visibility === 'hidden'
      &&　document.querySelector('#warn5').style.visibility === 'hidden'
    ) {
      alert(`
            暱稱：${temp1}
            電子郵件：${temp2}
            手機號碼：${temp3}
            報名類型：${temp7}
            怎麼知道這個活動的：${temp4}
            其他：${document.querySelector('input[name = other]').value}
            `)
    }
  }
)
