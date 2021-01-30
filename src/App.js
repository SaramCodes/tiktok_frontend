// SETUP IMPORTS
import React, {useState, createContext, useEffect} from 'react';
import GlobalStyle from "./style-components/GlobalStyle";
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";
import jwt from 'jwt-decode';

// PAGES IMPORTS
import Feed from "./pages/Feed";  
import Login from "./pages/Login";  
import Register from './pages/Register';
import Profile from './pages/Profile';

  
// COMPONENTS IMPORTS
import Navbar from "./components/Navbar"

export const GlobalStateContext = createContext({});

const App = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('access_token') ? true : false);
    const [wasLoggedOut, setWasLoggedOut] = useState(false);
    const [authenticatedUser, setAuthenicatedUser] = useState(false);
    const [logUserOut, setLogUserOut] = useState(false);

    const isTokenExpired = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setAuthenicatedUser(false);
        setLogUserOut(true);
    }
    
    const globalState = {
        success:showSuccess,
        setSuccess: setShowSuccess,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        wasLoggedOut: wasLoggedOut,
        setWasLoggedOut: setWasLoggedOut,
        authenticatedUser: authenticatedUser,
        setAuthenicatedUser: setAuthenicatedUser,
        logUserOut: logUserOut,
        setLogUserOut: setLogUserOut,
        isTokenExpired: isTokenExpired,
    }

    // decode token if it exists and set the current user 
    useEffect(() =>{
        if(isAuthenticated){
            let decodedToken = jwt(localStorage.getItem('access_token'));
            setAuthenicatedUser({user_id: decodedToken.user_id, username: decodedToken.username, user_image: `http://localhost:8000${decodedToken.user_image}` })
        }   
    }, [])
    return(
        <>
            <GlobalStyle />
            <GlobalStateContext.Provider value={globalState}>
                <BrowserRouter>    
                <Navbar/>
                    <Switch>
                        <Route path="/profile/:id">
                            <Profile />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/">
                            <Feed/>
                        </Route>
                    </Switch>
                </BrowserRouter>    
            </GlobalStateContext.Provider>
        </>
    )
}

export default App;

