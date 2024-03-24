import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  post: {
    id: number;
    userId: number;
    title: string;
    body: string;
  };
}

const PostContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Post: React.FC<Props> = ({ post }) => {
  const history = useNavigate ();

  const handlePostClick = () => {
    history(`/post/${post.id}`);
  };

  return (
    <PostContainer onClick={handlePostClick}>
      <h3>{post.id}. {post.title}</h3>
      <p>{post.body}</p>
    </PostContainer>
  );
};

export default Post;