import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Dropdown, initTE } from "tw-elements";

function Navbar() {

    useEffect(()=>{
        initTE({Collapse, Dropdown});
    }, []);

    return <div className="flex flex-wrap items-center justify-between px-3">
        <button
        className="ml-auto block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 md:hidden"
        type="button"
        data-te-collapse-init
        data-te-target="#navbarSupportedContent7"
        aria-controls="navbarSupportedContent7"
        aria-expanded="false"
        aria-label="Toggle navigation">
            <span className="[&>svg]:w-7">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7">
                    <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd" />
                </svg>
            </span>
        </button>

        <div
        className="!visible mt-2 mr-4 hidden flex-grow basis-[100%] items-center md:mt-0 md:!flex md:basis-auto"
        id="navbarSupportedContent7"
        data-te-collapse-item>
            <ul
            className="list-style-none ml-auto flex flex-col pl-0 md:mt-1 md:flex-row"
            data-te-navbar-nav-ref>
                <li
                className="my-4 pl-2 md:my-0 md:pl-2 md:pr-1"
                data-te-nav-item-ref>
                    <NavLink
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    aria-current="page"
                    to="/"
                    data-te-nav-link-ref>Home</NavLink>
                </li>
                <li
                className="mb-4 pl-2 md:mb-0 md:pl-0 md:pr-1"
                data-te-nav-item-ref>
                    <NavLink
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    to="favorites"
                    data-te-nav-link-ref>Favorites</NavLink>
                </li>
                <li
                className="mb-4 pl-2 md:mb-0 md:pl-0 md:pr-1"
                data-te-nav-item-ref>
                    <NavLink
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    to="/calendar"
                    type="button"
                    data-te-nav-link-ref>Calendar</NavLink>
                </li>
            </ul>
        </div>
    </div>
}

export default Navbar;