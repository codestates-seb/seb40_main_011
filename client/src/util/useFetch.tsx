//fetch custom hook
import { useState, useEffect } from 'react';

type Fetch = {
  (url: string): [
    data: { id: number } | null,
    isPending: boolean,
    error: string | null
  ];
};

const useFetch: Fetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:3001${url}`)
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, []);

  return [data, isPending, error];
};

export default useFetch;
