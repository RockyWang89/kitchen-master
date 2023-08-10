import Slider from "../../components/Slider";
import FoodSection from "../../components/FoodSection";

function Home() {

    return <>
        <Slider />
        <FoodSection keyword="breakfast" title="Breakie"/>
        <FoodSection keyword="spicy" title="Spicy Lover"/>
        <FoodSection keyword="vegan" title="Vegan"/>
    </>
}

export default Home;