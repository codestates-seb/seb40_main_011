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
  SocialLogin,
} from './pages';
import RvDetail from './components/Details/RvDetail';
import SearchResult from './components/Search/SearchResult';
import { Layout, QuestionListLayOut } from './layout/Layout';
import NotFound from './pages/NotFound';
import EditReviewDetail from './components/Details/EditReviewDetail';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/social" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/categories/review/:id" element={<ReviewLists />} />
          <Route path="/review/write" element={<WriteReview />} />
          <Route path="/review/:id" element={<RvDetail />} />
          <Route path="/review/edit/:id" element={<EditReviewDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/social" element={<SocialLogin />} />
        </Route>
        <Route path="/" element={<QuestionListLayOut />}>
          <Route path="/question-lists" element={<QuestionLists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
