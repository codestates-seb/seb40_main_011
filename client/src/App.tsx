import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/SignUpPage';
import './components/common.css';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
