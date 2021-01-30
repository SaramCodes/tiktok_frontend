import React, {useEffect, useState, useContext} from 'react';
import {BsHeartFill, BsHouseFill, BsFillPeopleFill} from 'react-icons/bs';
import {FaComments, FaReact} from 'react-icons/fa';
import {Axios} from '../utils';
import {GlobalStateContext} from '../App';
import Popup from '../components/Popup';
import {useHistory} from 'react-router-dom';
import {Link} from "react-router-dom";

const Feed = () => {
    let history = useHistory();
    const globalState = useContext(GlobalStateContext);

    const [loadingOrFailed, setLoadingOrFailed] = useState(true);
    const [posts, setPosts] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const fetchPosts = async () =>{
        setLoadingOrFailed(true)
        try{
            let result = await Axios("/posts/");
            console.log(result.data)
            setPosts(result.data)
        } catch(err){
            setLoadingOrFailed(false)
            if(err.response.status === 401){
                globalState.isTokenExpired();
                history.push('/');
            }
        }
    }

    const followUser = async (id) => {
        if(loading){
            return;
        }
        setLoading(true);
        try{
            let result = await Axios.post(`/accounts/${id}/follow`);
            setPosts(posts.map(post => {
                if(post.user.id === id){
                    post.user.followers.push(globalState.authenticatedUser.user_id)
                }
                return post;                
            }))
            setLoading(false);

        } catch(err){
            setLoading(false);
            console.log(err)
            if(err.response.status === 401){
                globalState.isTokenExpired();
                history.push('/');
            }
        }
    }

    const unfollowUser = async (id) => {
        if(loading){
            return;
        }
        setLoading(true);

        try{
            let result = await Axios.post(`/accounts/${id}/unfollow`);
            setPosts(posts.map(post => {
                if(post.user.id === id){
                    let followerFoundIndex = post.user.followers.findIndex(index => index === parseInt(globalState.authenticatedUser.user_id))
                    post.user.followers.splice(followerFoundIndex, 1);
                }
                return post;                
            }))
            setLoading(false);
        } catch(err){
            console.log(err.response.data);
            setLoading(false);
            if(err.response.status === 401){
                globalState.isTokenExpired();
                history.push('/');
            }
        }
    }

    const handleFollow = (user) => {
        if(user.followers.filter(id => id === globalState.authenticatedUser.user_id).length > 0){
            return (<span href="#" className="secondary-button button-small" onClick={() => unfollowUser(user.id)}>
                {loading ? <span className="btn-spinner"><FaReact /></span> : "Unfollow" }
            </span>)                  
        } else{
            return (<span href="#" className="primary-button button-small" onClick={() => followUser(user.id)}>
                 {loading ? <span className="btn-spinner"><FaReact /></span> : "Follow" }
            </span>)                 
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])


    return(
        <div className="container">
            {globalState.wasLoggedOut ? <Popup message={"Logged Out Successfully!"} close={() => globalState.setWasLoggedOut(false)} /> : null}
            {globalState.logUserOut ? <Popup  message={"You were logged out because token expired!"} close={() => globalState.setLogUserOut(false)} /> : null}
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
                    {posts ?
                        <>
                        {
                        posts.map( (post, index) => (
                            <div className="post" key={post.id} >
                                <div className="post-info-container">
                                    <div className="post-mugshot-container">
                                        <Link to={`/profile/${post.user.id}`} className="post-mugshot" style={{backgroundImage: `url(${post.user.user_image})`}}>

                                        </Link>
                                    </div>
                                    <div className="post-user-info-container">
                                        <div className="post-user-info">
                                            <h3 className="username">{post.user.username}</h3>
                                            <p className="video-title">{post.title}</p>
                                        </div>
                                        <div className="post-follow">
                                        {globalState.isAuthenticated ? 
                                        <>
                                            { globalState.authenticatedUser.user_id == post.user.id ?
                                            null
                                            :
                                                <>
                                                    {handleFollow(post.user)}
                                                </>
                                            }
                                        </>
                                        : null}
                                            
                                        </div>
                                    </div>

                                </div>

                                <div className="post-video-container">
                                    <div className="video-empty"></div>
                                    <video controls>
                                        <source src={post.video} type="video/mp4"></source>
                                    </video>
                                    
                                    <div className="post-side-links">
                                        <div className="post-side-link-container">
                                            <span className="post-side-link">
                                                <BsHeartFill />
                                            </span>
                                            <small>{post.likes.length}</small>
                                        </div>
                                        <div className="post-side-link-container">
                                            <span className="post-side-link">
                                                <FaComments />
                                            </span>
                                            <small>{post.comments}</small>
                                        </div>

                                    </div>
                                </div>
                                
                                
                            </div>
                        ) )
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

export default Feed;