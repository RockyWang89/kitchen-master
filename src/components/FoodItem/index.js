import { useDispatch } from "react-redux";
import { removePlan } from "../../store/calendarSlice";
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';

function FoodItem({day, mealtime, id, name}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const removeFromCalendar = (event) => {
        event.stopPropagation();
        dispatch(removePlan({day, mealtime, id}));
    }

    const goToDetail = () => {
        navigate(`/food-detail?fid=${id}`)
    }

    return <div role="button" onClick={goToDetail} className="relative w-full food-item" aria-label={`view ${name} detail`}>
        <p className="bg-yellow-100 rounded p-[6px] text-left">{name}</p>
        <button onClick={removeFromCalendar} className="absolute top-[-8px] right-[-8px] bg-white rounded-[50%]" aria-label={`remove ${name} from the calendar`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
}

export default FoodItem;