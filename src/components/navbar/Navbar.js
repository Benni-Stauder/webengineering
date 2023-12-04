import {useEffect, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import Logo from '../../icons/DHBW-Logo.svg'
import './NavbarStyles.css'
import RSSFeed from "../rss/RSSFeed"
import StockApp from "../aktienkurse/StockApp"
import WetterApp from "../wetter/WetterApp";
import DB from "../deutsche_bahn/DB";
import Wikipedia from "../wikipedia/Wikipedia";

function Homepage() {
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Webengineering Projekt 2023</h1>
            <p style={{textAlign: 'center'}}>9765514</p>
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
                <div className={"logo"}>
                    <img src={Logo} alt={"DHBW Stuttgart"} style={{height: '50px', objectFit: 'fill'}}/>
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
                            <NavLink to="/db">Deutsche Bahn</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wikipedia">Wikipedia</NavLink>
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
            <Route path={"/db"} element={<DB/>}/>
            <Route path={"/wikipedia"} element={<Wikipedia/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Navbar