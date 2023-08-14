function NutritionTable(props) {

    return <table>
        <tbody>
            <tr>
                <td>Calories</td>
                <td className="pl-5">{(props.calories || props.calories === 0) ? props.calories : "unknown"}</td>
            </tr>
            <tr>
                <td>Carbohydrates</td>
                <td className="pl-5">{(props.carbohydrates || props.carbohydrates === 0) ? props.carbohydrates : "unknown"}</td>
            </tr>
            <tr>
                <td>Protein</td>
                <td className="pl-5">{(props.protein || props.protein === 0) ? props.protein : "unknown"}</td>
            </tr>
            <tr>
                <td>Fat</td>
                <td className="pl-5">{(props.fat || props.fat === 0) ? props.fat : "unknown"}</td>
            </tr>
            <tr>
                <td>Fiber</td>
                <td className="pl-5">{(props.fiber || props.fiber === 0) ? props.fiber : "unknown"}</td>
            </tr>
            <tr>
                <td>Sugar</td>
                <td className="pl-5">{(props.sugar || props.sugar === 0) ? props.sugar : "unknown"}</td>
            </tr>
        </tbody>
    </table>
}

export default NutritionTable;