const Videos = ({posts}) => {
    return(
        <>
        {posts.length > 0 ?
                <div className="video-container">
                    {posts.map((post, index) => (
                        <div key={index} className="video">
                            <video controls>
                                <source src={post.video} type="video/mp4"></source>
                            </video>
                        </div>
                    ))}
                </div>
            :
            <h3 className="empty">No Posts</h3>
        }
        </>
    )
}

export default Videos;