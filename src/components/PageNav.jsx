import { NavLink } from "react-router-dom"

function PageNav() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/contactus">Contact Us</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
