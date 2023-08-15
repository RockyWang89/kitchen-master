import { useState } from "react"
import { useSelector } from "react-redux";
import { selectDietPlan } from "../../store/calendarSlice"
import FoodItem from "../FoodItem";
import { DAYS } from "../../static";

function CalendarTableMobile() {
    const [day, setDay] = useState(0);
    const dietPlan = useSelector(selectDietPlan);

    return <div className="md:hidden">
        <div className="mb-5 text-center">
            <label htmlFor="day">Day: </label>
            <select id="day" value={day} onChange={e => setDay(e.target.value)}>
                {DAYS.map((item, index) => <option value={index} key={item}>{item}</option>)}
            </select>
        </div>
        <table
        className="w-full border text-center text-sm font-light dark:border-neutral-500">
            <tbody>
                <tr className="border-b dark:border-neutral-500">
                    <th
                    className="whitespace-normal border-r px-6 py-4 font-bold dark:border-neutral-500">
                        Breakfast
                    </th>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-normal border-r px-4 py-2 dark:border-neutral-500" >
                        {
                            dietPlan[day][0].map(item => <FoodItem day={day} mealtime={0} id={item.id} name={item.name} key={`${day}-0-${item.id}`}/>)
                        }
                    </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                    <th
                    className="whitespace-normal border-r px-6 py-4 font-bold dark:border-neutral-500">
                        Lunch
                    </th>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-normal border-r px-4 py-2 dark:border-neutral-500" >
                        {
                            dietPlan[day][1].map(item => <FoodItem day={day} mealtime={1} id={item.id} name={item.name} key={`${day}-0-${item.id}`}/>)
                        }
                    </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                    <th
                    className="whitespace-normal border-r px-6 py-4 font-bold dark:border-neutral-500">
                        Dinner
                    </th>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-normal border-r px-4 py-2 dark:border-neutral-500" >
                        {
                            dietPlan[day][2].map(item => <FoodItem day={day} mealtime={2} id={item.id} name={item.name} key={`${day}-0-${item.id}`}/>)
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default CalendarTableMobile