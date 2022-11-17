import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/SignUpPage';
import WriteReview from './pages/WriteReview';
import Login from './pages/Login';
import './components/common.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ReviewDetail from './pages/ReviewDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/categories/review/write" element={<WriteReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
