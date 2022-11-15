import React, { useEffect, useState } from 'react';
import useFetch from './util/useFetch';

function App() {
  const [review, setReview] = useState<unknown>(null);
  const url = '/REVIEW';
  const [data, isPending, error] = useFetch(url);

  useEffect(() => {
    setReview(data);
  }, []);

  console.log(typeof review);

  return (
    <div className="App">
      <header className="App-header">
        <p>{isPending ? <div>loading...</div> : <div>hi</div>}</p>
        <a></a>
      </header>
    </div>
  );
}

export default App;
