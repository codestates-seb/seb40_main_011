import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/SignUpPage';
import './components/common.css';

function App() {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch(`/codetech`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         // error coming back from server
  //         throw Error('could not fetch the data for that resource');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     });
  // }, []);

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
