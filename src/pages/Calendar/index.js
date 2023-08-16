import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearPlans } from "../../store/calendarSlice";
import CalendarTableDesktop from "../../components/CalendarTableDesktop";
import CalendarTableMobile from "../../components/CalendarTableMobile";
import { Ripple, initTE } from "tw-elements";

function Calendar() {
    const dispatch =  useDispatch();

    useEffect(()=>{
        initTE({Ripple});
    }, []);

    const emptyCalendar = () => {
        dispatch(clearPlans())
    };

    return <>
        <div className="flex px-[4vw] pt-10 justify-between">
            <h1 className="text-[1.6rem] pb-2">My Favorites</h1>
            <button
            type="button"
            className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={emptyCalendar}>
                Clear Calendar
            </button>
        </div>
        <div className="px-[4vw] py-10">
            <CalendarTableDesktop />
            <CalendarTableMobile />
        </div>
    </>
}

export default Calendar;