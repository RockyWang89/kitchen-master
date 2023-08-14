import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchByKeyword } from "../../store/searchingSlice";
import FoodCard from "../FoodCard";
import { API_KEY } from "../../static";

function FoodSection(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [foodList, setFoodList] = useState([]);

    useEffect(()=>{
        axios.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {
                from: '0',
                size: '4',
                q: props.keyword
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        })
        .then(res => setFoodList(res.data.results))
        .catch(err => console.log(err))
    }, [props.keyword]);

    const goSearching = () => {
        dispatch(searchByKeyword(props.keyword));
        navigate('/search-result');
    };

    return <section>
        <div className="flex px-7 md:px-14 pt-20 justify-between">
            <h2 className="text-2xl">{props.title}</h2>
            <button className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out" onClick={goSearching}>View More</button>
        </div>

        <div className="grid-cols-1 sm:grid md:grid-cols-4 px-[4vw]">
            {
                foodList.map(item => <FoodCard key={item.id} name={item.name} thumbnail_url={item.thumbnail_url} id={item.id}/>)
            }
        </div>
    </section>
}

export default FoodSection;