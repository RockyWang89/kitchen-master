import { useSelector } from "react-redux";
import { selectAllFavorites } from "../../store/favoriteSlice";
import FoodCard from "../../components/FoodCard";

function Favorites() {
    const favoritesList = useSelector(selectAllFavorites);

    return <>
        <h1 className="text-[1.6rem] pl-[4vw] pt-10 pb-2">My Favorites</h1>
        <section className="grid-cols-1 sm:grid md:grid-cols-4 px-[4vw] pb-10">
            {
                favoritesList.length > 0 ? favoritesList.map(item => <FoodCard key={item.id} name={item.name} thumbnail_url={item.thumbnail_url} id={item.id}/>) : <p>No favorite food</p>
            }
        </section>
    </>
}

export default Favorites;