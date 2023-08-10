function FoodCard(props) {
    return <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
        <a href="#!">
            <img className="rounded-t-lg" src={props.thumbnail_url} alt={props.name} />
        </a>
        <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {props.name}
            </h5>
        </div>
    </div>
}

export default FoodCard;