import React, {useContext} from "react";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {GlobalStateContext} from '../App';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    let history = useHistory();

    const globalState = useContext(GlobalStateContext);

    const logout = () => {
        localStorage.clear();
        globalState.setIsAuthenticated(false);
        globalState.setAuthenicatedUser(false);
        globalState.setWasLoggedOut(true);
        history.push('/');
    }

    return (
        <header>
            <nav className="navbar container">
                <Link to="/" className="branding">TikTak</Link>
                <ul>
                    { globalState.isAuthenticated ?
                   <>
                    <li><a href="#" className="upload"><AiOutlineCloudUpload/></a></li>
                    <li><Link to={"/profile/"+globalState.authenticatedUser.user_id} className="link link-navbar-mugshot"><div className="name">{globalState.authenticatedUser.username}</div><div className="navbar-mugshot" style={{backgroundImage: `url(${globalState.authenticatedUser.user_image})`}}></div></Link></li>
                    <li><span className="link" onClick={logout}>Log out</span></li>
                   </>
                    :
                    <>
                    <li><a href="#" className="upload"><AiOutlineCloudUpload/></a></li>
                    <li><Link to="/login" className="button-small primary-button">Log In</Link></li>
                    <li><Link to="/register" className="button-small  secondary-button">Register</Link></li>
                    </>
                    }
                    
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;