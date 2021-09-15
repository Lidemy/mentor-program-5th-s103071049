import React from 'react'
import styled from 'styled-components'
import {useState} from 'react'
// 傳物件
const SquareButton = styled.div`
  background: #fff;
  border: 1px solid gray;
  font-size: 24px;
  font-weight: bold;
  height: 34px;
  width: 34px;
  line-height: 34px;
  padding: 0;
  text-align: center;
  margin: 0;
  background: #917856;
`

const Square = ({value, onClick}) => {
  return (
    <SquareButton onClick={onClick}>{value}</SquareButton>
  )
}
export default Square