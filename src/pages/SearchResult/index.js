import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchResult, selectKeyword, selectLoading, selectHasNextPage, setLoadingTrue, fetchMoreData } from "../../store/searchingSlice";
import FoodCard from "../../components/FoodCard";
import useInfiniteScroll from 'react-infinite-scroll-hook';

function SearchResult() {
    const dispatch = useDispatch();
    const searchResult = useSelector(selectSearchResult);
    const keyword = useSelector(selectKeyword);
    const hasNextPage = useSelector(selectHasNextPage);
    const loading =useSelector(selectLoading);

    useEffect(()=>{
        if(loading) {
            dispatch(fetchMoreData());
        }
    }, [loading, dispatch]);

    function changeLoading() {
        dispatch(setLoadingTrue());
    }

    const [infiniteRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: changeLoading
    });

    return <>
        <h1 className="text-[1.6rem] pl-[4vw] pt-10 pb-2">Searching Result for "{keyword}"</h1>
        <section className="grid-cols-1 sm:grid md:grid-cols-4 px-[4vw] pb-10">
            {
                searchResult.length > 0 ? searchResult.map(item => <FoodCard key={item.id} name={item.name} thumbnail_url={item.thumbnail_url} id={item.id}/>) : <p>No match result</p>
            }
            {
                hasNextPage && <p ref={infiniteRef}>Loading...</p>
            }
        </section>
    </>
}

export default SearchResult;