import { useSelector } from "react-redux";
import { selectDietPlan } from "../../store/calendarSlice"
import FoodItem from "../FoodItem";
import { DAYS } from "../../static";

function CalendarTableDesktop() {
    const dietPlan = useSelector(selectDietPlan);

    return <table
    className="hidden md:table w-full border text-center text-sm font-light dark:border-neutral-500">
        <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                <th
                scope="col"
                className="border-r px-6 py-4 dark:border-neutral-500"></th>
                {
                    DAYS.map(item => {
                        return <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500"
                        key={item}>
                            {item}
                        </th>
                    })
                }
            </tr>
        </thead>
        <tbody>
            <tr className="border-b dark:border-neutral-500">
                <td
                className="whitespace-normal border-r px-6 py-4 font-bold dark:border-neutral-500">
                    Breakfast
                </td>
                {
                    dietPlan.map((dailyPlan, index) => {
                        return <td
                        className="whitespace-normal border-r px-4 py-2 dark:border-neutral-500"
                        key={`${index}-breakfast`}>
                            {
                                dailyPlan[0].map(item => <FoodItem day={index} mealtime={0} id={item.id} name={item.name} key={`${index}-0-${item.id}`}/>)
                            }
                        </td>
                    })
                }
            </tr>
            <tr className="border-b dark:border-neutral-500">
                <td
                className="whitespace-normal border-r px-6 py-4 font-bold dark:border-neutral-500">
                    Lunch
                </td>
                {
                    dietPlan.map((dailyPlan, index) => {
                        return <td
                        className="whitespace-normal border-r px-4 py-2 dark:border-neutral-500"
                        key={`${index}-lunch`}>
                            {
                                dailyPlan[1].map(item => <FoodItem day={index} mealtime={1} id={item.id} name={item.name} key={`${index}-1-${item.id}`}/>)
                            }
                        </td>
                    })
                }
            </tr>
            <tr className="border-b dark:border-neutral-500">
                <td
                className="whitespace-normal border-r px-6 py-4 font-bold dark:border-neutral-500">
                    Dinner
                </td>
                {
                    dietPlan.map((dailyPlan, index) => {
                        return <td
                        className="whitespace-normal border-r px-4 py-2 dark:border-neutral-500"
                        key={`${index}-dinner`}>
                            {
                                dailyPlan[2].map(item => <FoodItem day={index} mealtime={2} id={item.id} name={item.name} key={`${index}-2-${item.id}`}/>)
                            }
                        </td>
                    })
                }
            </tr>
        </tbody>
    </table>
}

export default CalendarTableDesktop