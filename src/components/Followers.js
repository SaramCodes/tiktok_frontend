import {Link} from 'react-router-dom';

const Followers = ({data, error}) => {
    return(
        <div className="follow-container">
            {data ? 
            <>
            
            {data.length > 0 ? 
            <div className="users-container">

                {data.map((user, index) => (
                    <div className="user" key={index}>
                        <Link to={`/profile/${user.id}`} >
                            <div className="mugshot" style={{backgroundImage: `url(${user.image})`}}></div>
                            <h3>{user.username}</h3>
                        </Link>
                    </div>
                ))}
        
            </div>
            :
            <h3 className="empty">{error}</h3>
            }


            </>
            :
            <h3 className="empty">Loading...</h3>
            }
        </div>
    )
}

export default Followers;