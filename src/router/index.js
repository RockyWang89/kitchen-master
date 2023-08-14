import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import Calendar from '../pages/Calendar';
import SearchResult from '../pages/SearchResult';
import FoodDetail from '../pages/FoodDetail';
import NotFound from '../pages/NotFound';

function AppRouter() {
    return <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='/calendar' element={<Calendar />}/>
        <Route path='/search-result' element={<SearchResult />}/>
        <Route path='/food-detail' element={<FoodDetail />}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
}

export default AppRouter;