import {Axios} from "../utils";
import {useState} from 'react';
import {FaReact} from 'react-icons/fa';
import {GlobalStateContext} from '../App';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';


const Follow = ({followed, id, fetchUser}) => {
    const globalState = useContext(GlobalStateContext);
    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const followUser = async() => {
        if(loading){
            return;
        }
        setLoading(true);
        try{
            let result = await Axios.post(`/accounts/${id}/follow`);
            fetchUser()
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

    const unfollowUser = async () => {
        if(loading){
            return;
        }
        setLoading(true);

        try{
            let result = await Axios.post(`/accounts/${id}/unfollow`);
            fetchUser()
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

    const followOrUnfollow = () => {
        if(followed){
            return(
                <span onClick={unfollowUser} className="secondary-button button-small">
                {loading ? <span className="btn-spinner"><FaReact /></span> : "Unfollow" }
                </span>
            )
        } else{
            return (
                <span onClick={followUser} className="primary-button button-small">
                {loading ? <span className="btn-spinner"><FaReact /></span> : "Follow" }
            </span>
            )
        }
    }

    return(
        <>
            {
                followOrUnfollow()
            }
        </>     
    )    
}

export default Follow;