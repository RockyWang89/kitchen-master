import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoritesIds, addFavorite, removeFavorite } from '../../store/favoriteSlice';
import './FoodCard.css';

function FoodCard(props) {
    const dispatch = useDispatch();
    const favoritesIds = useSelector(selectFavoritesIds);

    const changeFavorite = () => {
        if(favoritesIds.includes(props.id)) {
            dispatch(removeFavorite(props.id))
        }
        else {
            dispatch(addFavorite(props))
        }
    }

    return <div className="relative mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.4),0_10px_20px_-2px_rgba(0,0,0,0.4)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0 food-card">
        <NavLink to={`/food-detail?fid=${props.id}`}>
            <img className="rounded-lg w-full aspect-square" src={props.thumbnail_url} alt={props.name} />
        </NavLink>
        <div className="p-6 absolute bottom-0 bg-gray-800/50 w-full rounded-b-lg opacity-0 transition duration-500">
            <h5 className="text-lg font-medium leading-tight text-white dark:text-white">
                {props.name}
            </h5>
        </div>
        <button className='absolute right-4 top-4' onClick={changeFavorite}>
            {
                favoritesIds.includes(props.id) ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            }
        </button>
    </div>
}

export default FoodCard;