
const About = ({data}) => {

    const checkInfoExists = () => {
        if(!data.first_name && !data.first_name && !data.description){
            return (
                <span className="empty">Nothing found...</span>
            )
        } else{
            return(
                <div className="about-container">
                    <h3>{data.first_name} {data.last_name}</h3>  
                    <p>{data.description}</p>   
                </div>
            )
        }
    }  

    return(
        <>
            <div className="about-container">
                { checkInfoExists() }
            </div>
        </>
    )}

export default About;