import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./components/Home";
import PaginatedPost from "./components/PaginatedPost";
import ReactQueryPost from "./components/ReactQueryPost";
import RQMutation from "./components/RQMutation";
import RQPostDetail from "./components/RQPostDetail";
import TraditionalPostFetch from './components/TraditionalPostFetch'

const App = () => {
  return (
    <Router>
      <nav className="w-full sticky top-0">
        <ul className="flex justify-center gap-4 md:gap-10 bg-black text-white md:text-xl font-semibold p-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/rq-posts">RQPosts</Link>
          </li>
          <li>
            <Link to="/rq-pagination">Pagination</Link>
          </li>
          <li>
            <Link to="/rq-mutation">Mutation</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<TraditionalPostFetch />} />
        <Route path="/rq-posts" element={<ReactQueryPost />} />
        <Route path="/rq-pagination" element={<PaginatedPost />} />
        <Route path="/rq-mutation" element={<RQMutation />} />
        <Route path="/rq-posts/:postId" element={<RQPostDetail />} />
      </Routes>
    </Router>
  )
}

export default App
