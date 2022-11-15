import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/codetech`)
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data}</p>
        <a></a>
      </header>
      <Footer />
    </div>
  );
}

export default App;
