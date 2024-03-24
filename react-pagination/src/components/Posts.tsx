import React, { useEffect, useState } from 'react';
import Post from './Post.tsx';
import styled from 'styled-components';

interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const PostListContainer = styled.div`
  margin-top: 20px;
`;

const LoadMoreButton = styled.button`
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  color: blue;
`;

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [page, setPage] = useState<number>(() => {
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('_page');
        return pageParam ? parseInt(pageParam) : 1;
    });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [scrollMore, setScrollMore] = useState(true);
    const [scrollCount, setScrollCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                if (!loading && scrollMore) {
                    if (scrollCount >= 4 || page > 5) {
                        setScrollMore(false);
                    } else {
                        setPage((prevPage) => prevPage + 1);
                        setScrollCount((prevCount) => prevCount + 1);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, scrollMore, scrollCount]);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
            const newPosts = await response.json();
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setLoading(false);
            if (newPosts.length === 0) {
                setHasMore(false);
            }

            const params = new URLSearchParams(window.location.search);
            params.set('_page', String(page));
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        };

        loadPosts();
    }, [page]);

    return (
        <PostListContainer>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            {hasMore && (
                <LoadMoreButton onClick={() => setPage((prevPage) => prevPage + 1)}>
                    Load More
                </LoadMoreButton>
            )}
        </PostListContainer>
    );
};

export default Posts;
