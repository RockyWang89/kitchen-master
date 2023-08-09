import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Calendar from '../pages/Calendar';
import SearchResult from '../pages/SearchResult';
import FoodDetail from '../pages/FoodDetail';
import NotFound from '../pages/NotFound';

function AppRouter() {
    return <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favorite' element={<Favorite />}/>
        <Route path='/calendar' element={<Calendar />}/>
        <Route path='/search-result/:keyword' element={<SearchResult />}/>
        <Route path='/food-detail/:fid' element={<FoodDetail />}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
}

export default AppRouter;