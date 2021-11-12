import styled from "styled-components";
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  white-space: pre;
  margin-top: 24px;
`;
export default function About() {
  return (
    <>
      <Wrapper>
        {`嗨嗨，
        這裡是被 react final project耽誤的作業。
        我的目標是在一邊準備求職，一邊把作業與 redux 搞定。
        自己還有好多不足，這樣真的沒有問題麻？不過，煩惱這麼多好像也沒有甚麼幫助。只要心態正確剩下的就只是時間問題，所以繼續努力。`}
      </Wrapper>
    </>
  );
}
