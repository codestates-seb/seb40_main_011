import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/SignUpPage';
import WriteReview from './pages/WriteReview';
import ReviewDetail from './pages/ReviewLists';
import Login from './pages/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QuestionLists from './pages/QuestionLists';
import RvDetail from './components/Details/RvDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/categories/review/:id" element={<ReviewDetail />} />
          <Route path="/review/create" element={<WriteReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question-lists" element={<QuestionLists />} />
          <Route path="/review/:id" element={<RvDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
