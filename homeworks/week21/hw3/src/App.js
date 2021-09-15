import './App.css';
import styled from 'styled-components'
import React, {useState} from 'react'
import FormTitle from './component/FormTitle.js'
import Footer from './component/Footer.js'
import useSignUpForm from './hook/CustomHook.js'

const Wrapper = styled.div`
  max-width: 645px;
  background: white;
  margin:10% auto;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  border-top: solid 8px #fad312;
  padding: 64px 32px;
`

const InputBlock = styled.form`
  margin-top: 55px;
`
const InputBlockTitle = styled.div`
  text-align: left;
  font-size: 20px;
  ${props => props.require === 'true' && `
    &:after {
      content: "*";
      color: #e74149;
    }
  `}
`
const InputText = styled.input`
  border: solid 1px #d0d0d0;
  font-size: 16px;
  padding: 8px;
  margin-top: 18px;
`

const Input = styled.div`
  margin-top: 18px;
`
const ErrorMessage = styled.div`
  color: #e74149;
  ${(props) => props.$check && 'visibility:hidden;'}
  margin-top: 4px;
`
const InputBlockInput = styled.div`
margin-top: 18px;
`
const Label = styled.label`
  display: block;
  margin-top: 12px;
`
const InputRadio = styled.input``
const InputBlockDesc = styled.div`
  font-size: 14px;
  margin-top: 8px;
`
const InputSubmit = styled.input`
  background: #fad312;
  padding: 12px 32px;
  font-size: 15px;
  margin-top: 48px;
  border: none;
  border-radius: 3px;
`
const WarningMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.5em
`

function App() {
  const signup = (event) => {
      alert(`
        暱稱：${(inputs.nickname) ? inputs.nickname : '你的暱稱是甚麼 @@'}
        電子郵件：${inputs.email ? inputs.email : '信箱沒填'}
        手機號碼：${inputs.phone ? inputs.phone : '手機沒填'}
        報名類型：${content ? content : '還沒勾選資料也'}
        怎麼知道活動：${inputs.referal ? inputs.referal : '尚未填寫如何得知活動信息'}
        其他：${inputs.other ? inputs.other : '這邊還沒填，拜託留個言吧'}
        `)
  }
  const {inputs, handleInputChange, handleSubmit, content, handleConent, nicknameCheck, emailCheck, phoneCheck, contentCheck, referalCheck} = useSignUpForm(signup)
  return (
    <div className='App.css'>
    <Wrapper>
      <FormTitle/>
      <InputBlock onSubmit={handleSubmit}>
        <InputBlockTitle  require="true">暱稱</InputBlockTitle>
        <Input>
          <InputText name="nickname" type="text" placeholder="您的回答" onChange={handleInputChange} value={inputs.nickname || ''}/>
          <ErrorMessage $check={nicknameCheck.nickname}>請輸入暱稱</ErrorMessage>
        </Input>
        <Input>
          <InputBlockTitle  require="true">電子郵件</InputBlockTitle>
          <InputText name="email" type="text" placeholder="您的電子郵件" onChange={handleInputChange} value={inputs.email || ''}/>
          <ErrorMessage $check={emailCheck.email}>請輸入電子郵件</ErrorMessage>
        </Input>
        <Input>
          <InputBlockTitle require="true">手機號碼</InputBlockTitle>
           <InputText name="phone" type="text" placeholder="您的手機號碼" onChange={handleInputChange} value={inputs.phone || ''}/>
           <ErrorMessage $check={phoneCheck.phone}>請輸入手機號碼</ErrorMessage>
        </Input>
        <Input>
          <InputBlockTitle require="true">報名類型</InputBlockTitle>
          <InputBlockInput>
            <Label>
              <InputRadio name="type" value='1' onChange={handleConent} type="radio" checked={content === '躺在床上用想像力實作'}/>躺在床上用想像力實作
            </Label>
            <Label>
              <InputRadio name="type" value='2' onChange={handleConent} type="radio" checked={content === '趴在地上滑手機找現成的'}/>趴在地上滑手機找現成的
            </Label>
            <ErrorMessage $check={contentCheck.content}>請輸入報名類型</ErrorMessage>
          </InputBlockInput>
        </Input>
        <Input>
          <InputBlockTitle require="true">怎麼知道這個活動的？</InputBlockTitle>
          <InputBlockInput>
            <InputText name="referal" type="text" placeholder="您的回答" onChange={handleInputChange} value={inputs.referal || ''}/>
            <ErrorMessage $check={referalCheck.referal}>請輸入資料</ErrorMessage>
          </InputBlockInput>
        </Input>
        <Input>
          <InputBlockTitle require="">其他</InputBlockTitle>
          <InputBlockDesc>對活動的一些建議</InputBlockDesc>
          <InputText name="other" type="text" placeholder="您的回答" onChange={handleInputChange} value={inputs.other || ''}/>
        </Input>
        <InputSubmit type="submit"/>
        <WarningMessage>請勿透過表單送出您的密碼。</WarningMessage>
      </InputBlock>
    </Wrapper>
    <Footer/>
    </div>
  );
}
export default App;
