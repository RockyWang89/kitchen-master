import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../../router';
import Header from '../Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mt-[6.5rem] md:mt-[4.5rem]">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
