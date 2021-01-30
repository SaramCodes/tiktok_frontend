import React, {useContext, useEffect, useState} from "react";
import {GlobalStateContext} from '../App';
import {useParams, useHistory} from 'react-router-dom';
import {Axios} from '../utils';
import {BsHouseFill, BsFillPeopleFill} from 'react-icons/bs';
import Followers from '../components/Followers';
import Videos from '../components/Videos';
import About from '../components/About';
import Follow from '../components/Follow';


const Profile = () => {
    let history = useHistory();
    const [user, setUser] = useState(false);
    const [screen, setScreen] = useState('videos');
    const [loadingOrFailed, setLoadingOrFailed] = useState(true);
    const globalState = useContext(GlobalStateContext);
    const {id} = useParams();
    
    const fetchUser = async () => {
        setLoadingOrFailed(true)
        try{
            const result = await Axios.get(`/accounts/${id}/`);
            console.log(result.data)
            setUser(result.data);

        } catch(err){
            setLoadingOrFailed(false);
            console.log(err)
            if(err.response.status === 401){
                globalState.isTokenExpired();
                history.push('/');
            }
        }
    }

    const showScreen = (data) => {
        switch(data){
            case 'videos':
                return <Videos posts={user.posts} />;
            case 'followers':
                return <Followers data={user.followers} error="No Followers" />;
            case 'following':
                return <Followers data={user.following} error="None Following" />;
            case 'about':
                return <About data={{description: user.description,first_name: user.first_name, last_name: user.last_name}} />;
            default:
                return <Videos />;

        }
    }

    const onClickScreen = (data) => {
        if(screen === data){
            return
        } else{
            setScreen(data)
        }
    }

    

    const handleFollow = () => {
        if(user.followers.filter(obj => obj.id === globalState.authenticatedUser.user_id).length > 0){
            return <Follow fetchUser={fetchUser} followed={true} id={user.id} />                  
        } else{
            return <Follow fetchUser={fetchUser} followed={false} id={user.id} />                  
        }
    }

    useEffect( () => {
        fetchUser();
        setScreen('videos');

    }, [id]);



    return (
        <div className="container">
            <div className="feed-page">
                <div className="feed-custom">
                    <div className="feed-custom-links">
                        <span className="feed-custom-link feed-custom-link-active">
                            <BsHouseFill /> <p>For You</p>
                        </span>
                        <span className="feed-custom-link">
                            <BsFillPeopleFill /> <p>Following</p>
                        </span>
                    </div>
                </div>
                <div className="feed-main">
                    {user ?
                    <>
                        <div className="profile-info">
                                <div className="profile-mugshot" >
                                    <span>{user.username}</span>
                                    <div className="profile-mugshot-inner" style={{backgroundImage: `url(${user.image})`}}></div>
                                </div>
                                <div className="profile-details">
                                    <h1 className="profile-user-name-container">
                                        <span className="profile-user-name">{user.username}</span>
                                        {globalState.isAuthenticated ? 
                                        <>
                                            { globalState.authenticatedUser.user_id == id ?
                                            null
                                            :
                                            handleFollow()
                                            }
                                        </>
                                        : null}
                                       
                                    </h1>
                                    <div className="profile-navigation">
                                        <p 
                                        onClick={() => onClickScreen('videos')}
                                        className={`profile-navigation-btn ${screen === 'videos' ? 'profile-navigation-btn-active' : null}`}>
                                            <span>{user.posts.length} </span>
                                             Videos
                                        </p>
                                        
                                        <p
                                        onClick={() => onClickScreen('followers')}
                                        className={`profile-navigation-btn ${screen === 'followers' ? 'profile-navigation-btn-active' : null}`}><span>{user.followers.length} </span>
                                         Followers
                                        </p>
                                        
                                        <p
                                        onClick={() => onClickScreen('following')}
                                        className={`profile-navigation-btn ${screen === 'following' ? 'profile-navigation-btn-active' : null}`}><span>{user.following.length} </span>
                                         Following
                                        </p>
                                        <p
                                        onClick={() => onClickScreen('about')}
                                        className={`profile-navigation-btn ${screen === 'about' ? 'profile-navigation-btn-active' : null}`}>
                                         About
                                        </p>
                                    </div>
                                </div>
                        </div>
                        {
                            showScreen(screen)

                        }
                    </>
                    :
                        <>
                            {loadingOrFailed ?
                            <h3 className="empty">Loading...</h3>
                            :
                            <h3 className="empty">An Error occured trying to fetch data!</h3>
                            }

                        </>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Profile;