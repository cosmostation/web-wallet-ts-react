import { useEffect } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

function App() {
  useEffect(() => {
    window.location.href = 'https://www.mintscan.io/wallet/portfolio/';
  }, []);
  return null;
}
