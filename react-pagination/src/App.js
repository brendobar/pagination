import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts.tsx';
import PostPage from './components/PostPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Posts</h1>
            <Posts />
          </>
        }>
        </Route>
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;