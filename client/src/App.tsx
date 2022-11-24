import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Main,
  MyPage,
  Signup,
  WriteReview,
  ReviewLists,
  QuestionLists,
  Login,
} from './pages';
import RvDetail from './components/Details/RvDetail';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<QuestionLists />} />
          {/* <Route path="" element={<Main />} /> */}
          <Route path="mypage/*" element={<MyPage />} />
          <Route path="categories/review" element={<ReviewLists />} />
          <Route path="categories/review/write" element={<WriteReview />} />
          <Route path="question-lists" element={<Main />} />
          <Route path="review/:id" element={<RvDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
