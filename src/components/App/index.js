import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../../router';
import Navbar from '../Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
