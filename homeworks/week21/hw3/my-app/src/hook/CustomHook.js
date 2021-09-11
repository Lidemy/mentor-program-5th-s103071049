import {useState} from 'react'

const useSignUpForm = (cb) => {
  const [inputs, setInputs] = useState([])
  const [content, setContent] = useState('')
  const [nicknameCheck, setNicknameCheck] = useState({
    'nickname': true,
  })
  const [emailCheck, setemailCheck] = useState({
    'email': true,
  })
  const [phoneCheck, setphoneCheck] = useState({
    'phone': true,
  })
  const [contentCheck, setcontentCheck] = useState({
    'content': true,
  })
  const [referalCheck, setreferalCheck] = useState({
    'referal': true,
  })

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
      isValid()
    }
    cb()
  }
  const handleInputChange = (event) => {
    event.persist()
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
  }
  const handleConent = (event) => {
    event.persist()
    if (event.target.value === '1') {
      setContent('躺在床上用想像力實作')
    }
    if (event.target.value === '2') {
      setContent('趴在地上滑手機找現成的')
    }
  }
  const isValid = () => {
    // 報名類型
    if (content === '') {
      setcontentCheck({'content': false})
    } else {
      setcontentCheck({'content': true})
    }
    // 綽號
    if (inputs.nickname === undefined || inputs.nickname.length < 1) {
      setNicknameCheck({'nickname': false})
    } else {
      setNicknameCheck({'nickname': true})
    }
    // email
    if (inputs.email === undefined || inputs.email.length < 1) {
      setemailCheck({'email': false})
    } else {
      setemailCheck({'email': true})
    }
    // phone
    if (inputs.phone === undefined || inputs.phone.length < 1) {
      setphoneCheck({'phone': false})
    } else {
      setphoneCheck({'phone': true})
    }
    // referal
    if (inputs.referal === undefined || inputs.referal.length < 1) {
      setreferalCheck({'referal': false})
    } else {
      setreferalCheck({'referal': true})
    }
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    content,
    handleConent,
    nicknameCheck,
    emailCheck,
    phoneCheck,
    contentCheck,
    referalCheck
  }
}

export default  useSignUpForm
