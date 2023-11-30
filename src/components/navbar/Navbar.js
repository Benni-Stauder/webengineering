import { useState } from 'react'
import {BrowserRouter, NavLink, Outlet, Route, Routes} from 'react-router-dom'
import { ReactComponent as Logo } from '../../icons/Logo.svg'
import './NavbarStyles.css'
import RSSFeed from "../rss/RSSFeed"
import StockApp from "../aktienkurse/StockApp"
import WetterApp from "../wetter/WetterApp";

function Homepage() {
    return (
        <>
            <h1>Hallo</h1>
            <p>awiaufg wufigawfiug awgfiuawgf aifawfgt awfgawifg afgawfgtawifgawfizugawfagwf awf afga wfgafugawf awof awfuawfg awfg af afa fuag fawufg</p>
            <p>wiohfz owf ufguiwfgw eifwgef wefgw efgweuifgw eufgw efgweugfw efgwef wegfwefgwefzugwefweg fwe fwefgwef wef wefwef wefwef we</p>
            <Outlet/>
        </>
    )
}

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <>
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
                            <NavLink to={"/rss"}>RSS</NavLink>
                        </li>
                        <li>
                            <NavLink to="/news">News</NavLink>
                        </li>
                        <li>
                            <NavLink to="/ueber_mich">Über mich</NavLink>
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
            <Route path={"/aktien"} element={
                <div className={`chart ${showNavbar && 'active'}`}>
                    <StockApp/>
                </div>}/>
            <Route path={"/rss"} element={<RSSFeed/>}/>
            <Route path={"/wetter"} element={<WetterApp/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Navbar