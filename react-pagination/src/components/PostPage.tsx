import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const PostPageContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const postData = await response.json();
      setPost(postData);
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostPageContainer>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </PostPageContainer>
  );
};

export default PostPage;