import Slider from "../../components/Slider";
import FoodSection from "../../components/FoodSection";

function Home() {

    return <div className="mb-10">
        <Slider />
        <FoodSection keyword="breakfast" title="Breakie"/>
        <FoodSection keyword="spicy" title="Spicy Lover"/>
        <FoodSection keyword="vegan" title="Vegan"/>
    </div>
}

export default Home;