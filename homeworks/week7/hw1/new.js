document
  .querySelector('form')
  .addEventListener('submit', (e) => {
    let hasError = false
    const values = {}
    e.preventDefault()
    const elements = document.querySelectorAll('.required')
    for (const element of elements) {
      const input = element.querySelector('input[type=text]')
      if (input) {
        values[input.name] = input.value
        console.log(input.value)
        if (!input.value) {
          // 只是控制他顯示不顯示
          element.classList.remove('hide-error')
          hasError = true
        } else {
          element.classList.add('hide-error')
        }
      }
      const radios = element.querySelectorAll('input[type=radio]')
      if (!radios.length) continue
      const hasValue = [...radios].some((radio) => radio.checked)
      if (!hasValue) {
        element.classList.remove('hide-error')
        hasError = true
      } else {
        element.classList.add('hide-error')
        const r = element.querySelector('input[type=radio]:checked')
        values[r.name] = r.value
      }
    }
    if (!hasError) {
      console.log(values)
      // alert(JSON.stringify(values))
      alert(`
        暱稱：${values.nickname}
        電子郵件：${values.email}
        手機號碼：${values.phone}
        報名類型：${values.type}
        怎麼知道活動：${values.referal}
        其他：${document.querySelector('input[name=other]').value}
        `)
    }
  })
