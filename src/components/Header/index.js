import Navbar from '../Navbar';
import SearchBox from '../SearchBox';

function Header() {

    return <header className="fixed z-[2] top-0 left-0 flex w-full flex-nowrap justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-md dark:bg-neutral-600 md:flex-wrap md:justify-start md:py-4 max-md:flex-col">
        <nav className='flex grow justify-end' data-te-navbar-ref>
            <h1 className='ml-3 grow text-2xl md:text-3xl'>Kitchen Master</h1>
            <Navbar />
        </nav>
        <SearchBox />
    </header>
}

export default Header;