import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../../router';
import Header from '../Header';
import Footer from '../Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mt-[6.5rem] md:mt-[4.5rem] min-h-screen">
        <AppRouter />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
