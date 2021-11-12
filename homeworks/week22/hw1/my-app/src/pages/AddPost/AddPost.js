import React, { useState, useContext, useEffect } from "react";
import { getAuthToken, setAuthToken } from "../../utils";
import { addPost } from "../../WebAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import styled from "styled-components";
const Wrapper = styled.form`
  width: 80%;
  margin: 0 auto;
  padding: 12px;
`;
const Item = styled.div`
  padding: 12px;
`;
const SubmitButton = styled.button`
  background: white;
  border: 1px solid gray;
  padding: 12px;
  width: 80px;
  cursor: pointer;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 24px;
`;
export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    addPost(title, content).then((res) => {
      if (res.ok === 0) {
        return setErrorMessage(res.message);
      }
      navigate("/");
    });
  };
  return (
    <>
      <Wrapper onSubmit={handleSubmit}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        輸入文章標題：
        <Item>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Item>
        輸入文章內容：
        <Item>
          <textarea
            style={{ width: "500px", height: "400px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Item>
        <SubmitButton>提交</SubmitButton>
      </Wrapper>
    </>
  );
}
