import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Header';
import RouteList from './RouteList';

/** Renders application */

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
