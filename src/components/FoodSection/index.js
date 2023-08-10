import axios from "axios";
import {useState, useEffect} from "react";
import FoodCard from "../FoodCard";
import { API_KEY } from "../../static";

function FoodSection(props) {
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

    return <section>
        <div>
            <h2>{props.title}</h2>
            <button>View More</button>
        </div>

        <div className="grid-cols-1 sm:grid md:grid-cols-4 px-10">
            {
                foodList.map(item => <FoodCard key={item.id} name={item.name} thumbnail_url={item.thumbnail_url} id={item.id}/>)
            }
        </div>
    </section>
}

export default FoodSection;