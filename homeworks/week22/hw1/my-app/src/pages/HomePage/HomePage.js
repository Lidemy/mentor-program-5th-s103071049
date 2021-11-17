import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../WebAPI";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const PostTitle = styled(Link)`
  font-size: 16px;
  color: black;
  text-decoration: none;
`;
const PostDate = styled.div`
  color: rgba(0, 0, 0.8);
`;
const Pages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 12px;
`;
const Page = styled.span`
  padding: 6px;
`;
function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
    </PostContainer>
  );
}
Post.propTypes = {
  post: PropTypes.object,
};
export default function HomePage() {
  const limit = 5;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [posts, setPosts] = useState([]);
  let offset = (page - 1) * limit;
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      setTotalPage(Math.ceil(posts.length / limit));
    });
  }, []);
  return (
    <Root>
      {posts.slice(offset, offset + limit).map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <Pages>
        {page !== 1 && (
          <Page
            onClick={(e) => {
              setPage(1);
            }}
          >
            最前頁
          </Page>
        )}
        {page !== 1 && (
          <Page
            onClick={(e) => {
              setPage(page - 1);
            }}
          >
            {`<`}
          </Page>
        )}
        <Page>{page}</Page>
        {page !== totalPage && (
          <Page
            onClick={(e) => {
              setPage(page + 1);
            }}
          >
            {`>`}
          </Page>
        )}
        {page !== totalPage && (
          <Page
            onClick={(e) => {
              setPage(totalPage);
            }}
          >
            最末頁
          </Page>
        )}
      </Pages>
    </Root>
  );
}
