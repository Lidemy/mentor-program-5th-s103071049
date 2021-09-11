import styled from 'styled-components'
import React from 'react'

const ApplyForm = styled.div``

const ApplyFormTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: bold;
`
const ApplyFormDesc = styled.p`
  margin-top: 32px;
  font-size: 14px;
  line-height: 1.5em
`
const ApplyFormNotice = styled.p`
  margin-top: 22px;
  font-size: 16px;
  color: #e74149;
`

export default function FormTitle() {
  return (
    <div>
      <ApplyForm>
        <ApplyFormTitle>新拖延運動報名表單</ApplyFormTitle>
        <ApplyFormDesc>
          活動日期：2020/12/10 ~ 2020/12/11 <br/>
          活動地點：台北市大安區新生南路二段1號
        </ApplyFormDesc>
        <ApplyFormNotice>*必填</ApplyFormNotice>
      </ApplyForm>
    </div>
  )
}