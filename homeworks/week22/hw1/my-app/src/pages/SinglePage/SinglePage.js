import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPost } from "../../WebAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px;
  margin: 0 auto;
  width: 80%;
`;
const Title = styled.div`
  font-size: 24px;
`;
const Content = styled.div`
  padding: 12px;
  line-height: 1.5em;
  white-space: break-spaces;
`;

export default function SinglePage() {
  let params = useParams();
  const [post, setPost] = useState("");
  useEffect(() => {
    getPost(params.id).then((posts) => setPost(posts));
  }, []);
  return (
    <>
      <Wrapper>
        {post && <Title>{post[0].title}</Title>}
        {post && <Content>{post[0].body}</Content>}
      </Wrapper>
    </>
  );
}
