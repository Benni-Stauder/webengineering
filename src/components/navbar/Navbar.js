import {useEffect, useState} from 'react'
import {BrowserRouter, NavLink, Outlet, Route, Routes} from 'react-router-dom'
import { ReactComponent as Logo } from '../../icons/Logo.svg'
import './NavbarStyles.css'
import RSSFeed from "../rss/RSSFeed"
import StockApp from "../aktienkurse/StockApp"
import WetterApp from "../wetter/WetterApp";

function Homepage() {
    return (
        <>
            <h1>Webengineering Projekt 2023</h1>
            <p>9765514</p>
        </>
    )
}

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    useEffect(() => {
        function handleResize() {
            // Update the state or perform any other actions when the
            // browser is resized
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <BrowserRouter>
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Logo/>
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <h1>Menü</h1>
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/aktien">Aktien</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wetter">Wetter</NavLink>
                        </li>
                        <li>
                            <NavLink to="/news">News</NavLink>
                        </li>
                        <li>
                            <NavLink to="/kontakt">Kontakt</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path={"/aktien"} element={<StockApp/>}/>
            <Route path={"/news"} element={<RSSFeed/>}/>
            <Route path={"/wetter"} element={<WetterApp/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Navbar