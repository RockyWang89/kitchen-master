function Footer() {
    const currentYear = new Date().getFullYear();

    return <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
            &copy; {currentYear} &nbsp;
            <a
            className="text-neutral-800 dark:text-neutral-400"
            href="http://kitchen-master-app.s3-website-ap-southeast-2.amazonaws.com/"
            >
                Kitchen Master
            </a>
            . All rights reserved.
        </div>
    </footer>
}

export default Footer;