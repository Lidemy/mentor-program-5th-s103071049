import styled from 'styled-components'
import React from 'react'

const FOOTER = styled.div`
  background-color: #000000;
  color: #999999;
  font-size: 13px;
  text-align: center;
  padding: 24px 12px;
`
export default function Footer() {
  return (
    <div>
      <FOOTER>© 2020 © Copyright. All rights Reserved.</FOOTER>
    </div>
  )
}