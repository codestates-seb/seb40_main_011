import useFetch from './util/useFetch';

function App() {
  const url = '/review';
  const isPending = useFetch(url)[1];

  return (
    <div className="App">
      <header className="App-header">
        {isPending ? <div>loading...</div> : <div>hi</div>}
        <a></a>
      </header>
    </div>
  );
}

export default App;
