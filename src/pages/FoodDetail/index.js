import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../static";
import NutritionTable from "../../components/NutritionTable";
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoritesIds, addFavorite, removeFavorite } from '../../store/favoriteSlice';
import { selectDietPlan, addPlan } from "../../store/calendarSlice";
import { Modal, Ripple, initTE } from "tw-elements";
import './FoodDetail.css';

function FoodDetail() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const foodId = searchParams.get("fid");
    const [food, setFood] = useState({});
    const [currentTag, setCurrentTag] = useState('ingredients');
    const [day, setDay] = useState(0);
    const [mealtime, setMealtime] = useState(0);
    const favoritesIds = useSelector(selectFavoritesIds);
    const dietPlan = useSelector(selectDietPlan);

    useEffect(()=>{
        initTE({Modal, Ripple});
    }, []);

    useEffect(()=>{
        axios.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
            params: {id: foodId},
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        })
        .then(res => setFood(res.data))
        .catch(err => console.log(err))
    }, [foodId]);

    const changeFavorite = () => {
        if(favoritesIds.includes(food.id)) {
            dispatch(removeFavorite(food.id))
        }
        else {
            dispatch(addFavorite({id: food.id, name: food.name, thumbnail_url: food.thumbnail_url}))
        }
    }

    const addFoodToCalendar = () => {
        if(!(dietPlan[day][mealtime].find(item => item.id === food.id))) {
            dispatch(addPlan({
                day,
                mealtime,
                food: {
                    id: food.id,
                    name: food.name
                }
            }))
        }
    }

    const TabContent = useMemo(()=>{
        if(currentTag === "ingredients") {
            return food.sections ? <ul>{food.sections[0].components.map(item => <li key={item.id} className="list-inside list-disc text-justify">{item.raw_text}</li>)}</ul> : <p>No ingredient</p>
        }
        else if(currentTag === "instruction") {
            return food ? <ul>{food.instructions.map(item => <li key={item.id} className="list-inside list-disc text-justify">{item.display_text}</li>)}</ul> : <p>No instruction</p>
        }
        else {
            return food ? <NutritionTable {...food.nutrition}/> : <p>Nutrition Unknown</p>
        }
    }, [currentTag, food]);

    return <div className="md:columns-2 px-[4vw] pt-10">
        {/** Food image */}
        <div className="w-full px-[2vw]">
            <img src={food.thumbnail_url} alt={food.name} className="aspect-square rounded-xl"/>
        </div>

        {/** Text and manipulations */}
        <div className="w-full px-[2vw]">
            {/** Food name and buttons */}
            <div className="flex max-md:flex-col-reverse">
                <h1 className="text-2xl leading-[3rem]">{food.name}</h1>
                <div className="self-center ml-auto justify-end max-md:mt-2">
                    {/** favorite button */}
                    <button className="mx-1" onClick={changeFavorite}>
                        {
                            favoritesIds.includes(food.id) ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>:
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        }
                    </button>

                    {/** 'Add to calendar' button */}
                    <button 
                    className="mx-1"
                    data-te-toggle="modal"
                    data-te-target="#exampleModalCenter"
                    // data-te-ripple-init
                    // data-te-ripple-color="light"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                    </button>

                    {/** 'Add to calendar' modal */}
                    <div
                    data-te-modal-init
                    className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModalCenter"
                    tabIndex="-1"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-modal="true"
                    role="dialog">
                        <div
                        data-te-modal-dialog-ref
                        className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                            <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                                {/** Modal header */}
                                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    {/** Modal title */}
                                    <h5
                                    className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                    id="exampleModalScrollableLabel">
                                        Select day and mealtime
                                    </h5>

                                    {/** Close button */}
                                    <button
                                    type="button"
                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    data-te-modal-dismiss
                                    aria-label="Close">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/** Modal body */}
                                <div className="relative p-4">
                                    <section>
                                        <label htmlFor="day">Day: </label>
                                        <select id="day" value={day} onChange={e => setDay(e.target.value)}>
                                            <option value={0}>Moday</option>
                                            <option value={1}>Tuesday</option>
                                            <option value={2}>Wednesday</option>
                                            <option value={3}>Thursday</option>
                                            <option value={4}>Friday</option>
                                            <option value={5}>Saturday</option>
                                            <option value={6}>Sunday</option>
                                        </select>
                                    </section>
                                    <section>
                                        <label htmlFor="mealtime">Mealtime: </label>
                                        <select id="mealtime" value={mealtime} onChange={e => setMealtime(e.target.value)}>
                                            <option value={0}>Breakfast</option>
                                            <option value={1}>Lunch</option>
                                            <option value={2}>Dinner</option>
                                        </select>
                                    </section>
                                </div>

                                {/** Modal footer */}
                                <div
                                    className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    <button
                                    type="button"
                                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    data-te-modal-dismiss
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                        Cancel
                                    </button>
                                    <button
                                    type="button"
                                    className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    data-te-modal-dismiss
                                    onClick={addFoodToCalendar}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/** Description */}
            <p className="py-3 text-justify">{food.description}</p>

            {/** Tabs for ingredients, instruction and nutrition */}
            <ul
            className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
            role="tablist"
            data-te-nav-ref>
                <li role="presentation" className="flex-auto text-center">
                    <button
                    className={`flex justify-center w-full my-2 block px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-transparent ${currentTag === 'ingredients' && 'selected-tab'}`}
                    role="tab"
                    aria-controls="tabs-ingredients"
                    aria-selected="true"
                    onClick={()=>setCurrentTag('ingredients')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" className="w-8 h-8" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path d="M1200 5111 c-72 -22 -139 -81 -166 -147 -20 -48 -17 -151 5 -199 24 -52 99 -121 147 -134 219 -61 403 152 304 349 -52 103 -184 163 -290 131z m135 -171 c64 -60 20 -170 -68 -170 -99 0 -136 136 -49 185 34 19 88 12 117 -15z"/>
                                <path d="M4042 4920 c-119 -31 -206 -83 -302 -180 -139 -138 -188 -253 -197 -460 -3 -69 -10 -134 -16 -145 -6 -11 -248 -314 -539 -672 l-529 -653 -1059 -2 c-1058 -3 -1059 -3 -1087 -24 -54 -40 -67 -77 -71 -203 -5 -138 13 -453 27 -480 15 -28 62 -44 94 -32 45 17 48 37 37 198 -5 82 -10 203 -10 271 l0 122 2036 0 2037 0 -5 -275 c-5 -271 -5 -275 17 -295 27 -25 66 -26 96 -1 31 25 37 84 38 377 1 234 0 242 -21 274 -44 63 -71 70 -276 70 l-183 0 7 22 c30 96 298 776 311 790 9 10 52 39 96 64 308 178 426 561 271 879 -138 284 -467 435 -772 355z m348 -159 c121 -46 230 -144 284 -255 43 -88 55 -140 56 -236 0 -198 -102 -368 -281 -465 -132 -72 -125 -60 -315 -555 l-169 -440 -652 0 c-359 0 -653 2 -653 5 0 3 223 280 495 616 272 335 503 624 512 642 12 23 18 71 23 172 6 120 11 150 35 210 36 89 70 139 139 203 59 54 134 95 213 118 72 20 243 13 313 -15z"/>
                                <path d="M1795 4237 c-92 -45 -145 -128 -145 -227 0 -223 266 -332 424 -174 155 154 57 407 -162 421 -56 3 -75 0 -117 -20z m149 -138 c33 -15 59 -71 51 -109 -8 -36 -58 -80 -91 -80 -33 0 -81 25 -94 49 -21 40 -12 91 21 122 33 31 71 37 113 18z"/>
                                <path d="M1005 3889 c-82 -23 -165 -139 -165 -230 0 -144 107 -253 250 -254 183 0 303 186 226 351 -27 58 -94 120 -145 134 -43 12 -124 12 -166 -1z m136 -149 c24 -13 49 -61 49 -94 0 -14 -13 -40 -29 -58 -24 -27 -36 -33 -71 -33 -35 0 -47 6 -71 33 -40 44 -40 93 0 133 31 31 83 39 122 19z"/>
                                <path d="M1235 2437 c-86 -49 -204 -282 -265 -524 -6 -24 -12 -43 -13 -43 -1 0 -31 9 -67 20 -120 36 -230 52 -367 52 -154 -1 -202 -16 -249 -77 -22 -30 -29 -50 -32 -99 -4 -56 -1 -67 40 -144 58 -109 155 -239 239 -320 l68 -65 -85 -90 c-101 -108 -162 -192 -221 -305 -34 -66 -43 -93 -43 -134 0 -67 33 -125 92 -158 81 -46 323 -39 526 16 51 14 96 22 101 20 5 -3 11 -25 15 -48 19 -116 117 -341 195 -444 41 -55 107 -94 160 -94 54 0 118 37 156 89 80 109 176 331 200 464 8 44 -2 43 130 9 148 -39 383 -55 467 -32 76 21 137 102 138 180 0 91 -159 338 -304 471 l-51 46 89 94 c97 103 164 196 227 316 38 71 41 83 36 132 -11 109 -83 168 -210 173 -64 3 -70 1 -93 -25 -29 -34 -30 -56 -4 -90 17 -21 33 -27 80 -33 78 -9 89 -22 64 -77 -38 -84 -135 -218 -219 -302 -46 -47 -89 -85 -94 -85 -5 0 -40 18 -78 39 -37 22 -102 54 -143 72 -44 18 -94 49 -121 74 -25 24 -61 51 -79 60 l-33 17 24 19 c46 36 175 94 294 134 104 35 122 44 134 69 16 34 4 67 -34 92 -25 16 -30 16 -106 -5 -44 -12 -86 -24 -93 -27 -9 -3 -16 13 -25 53 -37 172 -153 417 -232 490 -54 49 -147 58 -214 20z m152 -184 c69 -109 141 -293 158 -405 6 -41 5 -47 -14 -53 -25 -8 -163 -97 -216 -140 -22 -17 -57 -35 -77 -39 -21 -4 -62 -20 -93 -36 l-55 -29 0 87 c0 202 61 417 172 605 53 88 73 90 125 10z m-687 -474 c36 -5 104 -21 153 -36 l87 -26 0 -83 c0 -45 5 -117 11 -160 9 -64 8 -92 -6 -160 -9 -46 -14 -93 -10 -104 9 -28 -2 -25 -81 22 -182 109 -331 262 -429 440 -20 37 -35 78 -33 90 3 21 10 24 73 28 78 6 139 3 235 -11z m727 -326 c52 -21 99 -69 123 -125 55 -127 -10 -278 -139 -323 -124 -43 -259 16 -309 135 -8 19 -14 59 -14 90 -2 178 173 292 339 223z m483 -292 c164 -120 387 -416 353 -469 -9 -15 -28 -17 -144 -16 -144 1 -211 11 -329 50 l-75 24 -2 109 c-1 60 -6 134 -12 164 -8 42 -7 65 5 102 8 27 14 72 14 101 l0 53 65 -37 c36 -20 92 -57 125 -81z m-950 -147 c25 -10 71 -41 102 -70 32 -29 67 -55 78 -59 31 -10 20 -25 -46 -62 -168 -94 -336 -141 -536 -150 -188 -8 -199 3 -129 126 56 100 113 174 203 262 l79 78 102 -54 c56 -29 122 -61 147 -71z m605 -229 c-19 -231 -73 -406 -180 -575 -50 -80 -63 -79 -118 8 -56 88 -100 187 -130 292 -43 152 -45 139 33 184 38 21 100 62 138 91 40 31 91 59 123 69 30 9 70 25 89 35 l35 19 8 -26 c4 -15 5 -58 2 -97z"/>
                                <path d="M4404 1895 c-9 -13 -31 -65 -50 -115 -148 -400 -423 -708 -827 -930 -136 -75 -141 -84 -146 -267 l-3 -143 -765 0 c-562 0 -770 -3 -786 -12 -50 -26 -60 -69 -26 -112 l20 -26 802 0 c777 0 803 1 834 20 60 36 67 58 73 224 l5 151 103 55 c147 79 271 170 396 290 217 210 360 424 460 692 42 114 46 160 14 182 -35 25 -85 21 -104 -9z"/>
                            </g>
                        </svg>
                    </button>
                </li>
                <li role="presentation" className="flex-auto text-center">
                    <button
                    className={`flex justify-center w-full my-2 block px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-transparent ${currentTag === 'instruction' && 'selected-tab'}`}
                    role="tab"
                    aria-controls="tabs-instruction"
                    aria-selected="true"
                    onClick={()=>setCurrentTag('instruction')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" className="w-8 h-8 " viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path d="M4432 4935 c-16 -13 -242 -222 -503 -465 l-474 -440 -1423 0 -1424 0 -29 -29 -29 -30 2 -1876 3 -1877 24 -19 c23 -19 61 -19 1482 -19 l1460 0 121 113 c645 595 905 840 915 859 18 32 19 3728 1 3761 -27 52 -79 61 -126 22z m-22 -1979 l0 -1733 -416 -387 c-229 -212 -420 -386 -425 -386 -5 0 -9 740 -9 1730 l0 1729 418 390 c229 214 420 390 425 390 4 1 7 -779 7 -1733z m-1005 -856 l0 -1765 -1345 0 -1345 0 -3 1768 -2 1767 1347 -2 1348 -3 0 -1765z"/>
                                <path d="M2443 2948 c-244 -246 -252 -255 -269 -313 -17 -59 -17 -61 9 -165 l26 -105 -92 -93 -92 -92 -65 65 -65 65 0 122 c-1 109 -5 132 -29 198 -42 114 -106 208 -200 297 -136 129 -284 193 -446 193 -107 0 -195 -25 -262 -75 -206 -152 -211 -471 -13 -733 145 -192 406 -315 600 -283 l60 9 70 -69 70 -69 -297 -297 c-261 -263 -298 -303 -308 -342 -34 -128 55 -247 185 -245 28 0 66 8 85 18 19 10 164 147 323 304 l287 287 303 -302 c202 -202 314 -307 339 -318 129 -53 268 43 268 185 0 28 -7 65 -16 83 -9 18 -151 167 -315 332 l-299 300 92 92 93 92 80 -20 c98 -26 169 -27 215 -4 19 9 149 130 288 268 233 233 252 254 252 287 0 32 -20 55 -273 307 -265 266 -273 273 -312 273 -39 0 -47 -7 -292 -252z m177 -163 c-114 -115 -170 -178 -170 -193 0 -36 21 -70 52 -83 46 -19 77 3 249 178 l152 154 26 -25 26 -26 -168 -168 c-151 -151 -167 -171 -167 -201 0 -45 33 -81 74 -81 27 0 54 23 196 165 91 91 170 165 176 165 5 0 22 -13 37 -28 l27 -28 -203 -200 c-111 -111 -209 -204 -218 -207 -9 -3 -68 8 -130 24 -63 16 -123 29 -134 29 -13 0 -208 -189 -566 -546 -401 -400 -551 -545 -563 -541 -47 18 -33 35 512 580 297 298 543 552 546 564 4 12 -7 74 -24 141 -16 67 -30 124 -30 128 0 5 93 101 207 216 l207 208 28 -27 28 -27 -170 -171z m-1256 151 c248 -90 421 -371 362 -591 -7 -27 -11 -57 -8 -65 2 -8 47 -59 100 -112 l96 -98 -29 -30 -29 -30 -101 100 c-56 55 -109 100 -118 100 -8 0 -44 -7 -78 -16 -257 -66 -598 222 -599 507 0 86 22 147 70 194 79 77 196 92 334 41z m1119 -1434 c234 -234 287 -293 287 -315 0 -20 -6 -28 -26 -33 -24 -6 -52 19 -320 287 l-294 293 27 28 c15 15 29 28 33 28 3 0 135 -130 293 -288z"/>
                            </g>
                        </svg>
                    </button>
                </li>
                <li role="presentation" className="flex-auto text-center">
                    <button
                    className={`flex justify-center w-full my-2 block px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-transparent ${currentTag === 'nutrition' && 'selected-tab'}`}
                    role="tab"
                    aria-controls="tabs-nutrition"
                    aria-selected="false"
                    onClick={()=>setCurrentTag('nutrition')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" className="w-8 h-8" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path d="M2489 4957 c-52 -19 -94 -52 -117 -90 -31 -51 -1903 -3558 -1923 -3601 -37 -83 40 -152 105 -93 14 12 80 124 146 249 l122 228 468 0 469 0 -34 -68 c-19 -37 -36 -74 -39 -83 -4 -14 -12 -15 -58 -7 -212 40 -410 -76 -479 -279 -33 -95 -33 -238 0 -343 72 -232 228 -401 385 -417 28 -3 88 2 134 10 74 14 89 14 155 1 148 -32 240 -3 352 110 153 155 229 410 180 601 -57 216 -234 342 -451 322 l-66 -6 17 27 c49 77 109 116 199 130 31 5 65 17 76 27 28 25 26 76 -3 103 -23 22 -23 22 -623 24 l-600 3 199 373 199 372 1258 0 1258 0 199 -372 199 -373 -933 -5 c-868 -5 -933 -6 -950 -22 -22 -23 -22 -83 0 -106 17 -16 84 -17 993 -22 l975 -5 334 -625 c184 -344 335 -635 335 -648 0 -13 -11 -34 -25 -47 l-24 -25 -741 0 -740 0 0 153 0 153 68 17 c187 48 345 185 442 382 59 120 88 228 97 352 6 89 5 92 -20 117 -33 33 -82 34 -191 6 -179 -46 -327 -166 -428 -348 l-41 -73 -34 63 c-123 221 -314 357 -528 375 -61 5 -73 3 -95 -15 -23 -19 -25 -26 -23 -104 6 -299 175 -587 415 -708 42 -21 102 -44 133 -51 l55 -12 0 -154 0 -153 -1545 0 -1546 0 -24 25 c-14 13 -25 34 -25 46 0 12 68 149 150 303 83 155 150 292 150 304 0 30 -43 72 -73 72 -14 0 -34 -8 -45 -17 -35 -31 -322 -578 -329 -628 -13 -100 59 -215 153 -243 60 -18 4748 -18 4808 0 25 8 59 31 86 58 66 66 86 144 56 226 -20 54 -1811 3404 -1835 3432 -24 28 -60 28 -95 1 -38 -30 -34 -66 24 -173 28 -51 50 -96 50 -99 0 -4 -175 -7 -389 -7 -360 0 -394 -1 -452 -20 -344 -107 -344 -603 0 -710 52 -17 92 -20 225 -20 l162 0 74 -75 74 -75 -777 0 c-427 0 -777 3 -777 7 0 4 88 172 197 375 l196 368 124 0 c68 0 132 4 142 10 10 5 24 22 30 39 10 24 10 34 -3 59 -20 38 -31 42 -128 42 -69 0 -79 2 -74 16 20 51 630 1180 644 1191 22 16 62 16 84 0 9 -7 105 -179 214 -383 108 -203 204 -377 213 -386 9 -9 28 -20 42 -23 36 -9 82 31 82 71 0 26 -340 678 -409 786 -48 75 -171 116 -255 85z m127 -1531 c100 -47 134 -124 134 -308 l0 -118 -139 0 c-132 0 -141 1 -192 28 -42 21 -61 40 -86 82 -115 190 82 410 283 316z m918 -344 c108 -203 196 -371 196 -375 0 -4 -129 -7 -288 -7 l-287 0 -127 128 -126 127 -5 175 c-4 182 -13 226 -59 293 l-19 27 259 0 259 0 197 -368z m-1873 -1748 c78 -15 91 -15 177 1 154 29 253 3 319 -83 110 -144 69 -413 -87 -574 -76 -78 -113 -88 -231 -64 -86 17 -93 17 -184 0 -77 -14 -101 -15 -134 -6 -82 25 -176 143 -223 281 -31 92 -32 226 -1 294 68 148 167 189 364 151z m1299 -36 c160 -78 283 -269 324 -506 5 -31 4 -32 -22 -26 -127 30 -266 149 -340 291 -41 79 -82 209 -82 261 0 21 3 23 28 18 15 -4 56 -21 92 -38z m928 -14 c-23 -147 -85 -272 -188 -375 -74 -75 -139 -117 -214 -137 l-39 -11 6 48 c3 27 18 84 32 127 60 180 184 323 331 383 79 32 82 30 72 -35z"/>
                                <path d="M2517 4450 c-30 -24 -135 -200 -180 -302 -68 -158 -27 -299 108 -371 31 -17 58 -22 115 -22 85 0 133 20 186 77 53 55 68 95 68 173 0 83 -28 155 -124 320 -84 143 -118 168 -173 125z m97 -300 c55 -110 63 -147 42 -189 -17 -33 -62 -61 -96 -61 -62 0 -117 65 -105 126 7 41 93 214 105 214 5 0 29 -41 54 -90z"/>
                                <path d="M2035 2355 c-14 -13 -25 -34 -25 -47 0 -27 152 -295 182 -320 11 -10 31 -18 45 -18 30 0 73 42 73 72 0 28 -152 295 -181 321 -30 24 -66 21 -94 -8z"/>
                                <path d="M2435 2355 c-14 -13 -25 -35 -25 -47 0 -28 152 -295 181 -320 12 -10 32 -18 46 -18 30 0 73 42 73 72 0 28 -152 295 -181 321 -30 24 -66 21 -94 -8z"/>
                                <path d="M2835 2355 c-14 -13 -25 -35 -25 -47 0 -28 152 -295 181 -320 12 -10 32 -18 46 -18 30 0 73 42 73 72 0 28 -152 295 -181 321 -30 24 -66 21 -94 -8z"/>
                            </g>
                        </svg>
                    </button>
                </li>
            </ul>

            {/** Tab content */}
            <div className="mb-6">
                <div role="tabpanel" >
                    {TabContent}
                </div>
            </div>
        </div>
    </div>
}

export default FoodDetail;