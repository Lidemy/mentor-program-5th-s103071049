import React, { useState, useContext } from "react";
import { setAuthToken } from "../../utils";
import { register, getMe } from "../../WebAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import styled from "styled-components";
const Wrapper = styled.form`
  width: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  padding: 12px;
  margin-top: 24px;
  flex-direction: column;
`;
const Item = styled.div`
  padding: 12px;
`;
const LoginButton = styled.button`
  background: #3m3m3m;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
`;
const ErrorMessage = styled.div`
  color: red;
`;
export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    register(username, nickname, password).then((res) => {
      if (res.ok !== 1) {
        return setErrorMessage(res.message);
      }
      setAuthToken(res.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage("系統處理異常，請請稍後再嘗試");
        }
        setUser(res.data);
        navigate("/");
      });
    });
  };
  return (
    <>
      <Wrapper onSubmit={handleSubmit}>
        <Item>
          username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Item>
        <Item>
          nickname:{" "}
          <input
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </Item>
        <Item>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Item>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <LoginButton>提交</LoginButton>
      </Wrapper>
    </>
  );
}
