// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Header';
import RouteList from './RouteList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RouteList />
      </BrowserRouter>
    </div>
  );
}

export default App;
