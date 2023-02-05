import videoHomepage from '../../assets/HomePage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    return (
        <div className="homepage-container">
                <video autoPlay muted loop >
                        <source src={videoHomepage} type="video/mp4"/>
                 </video>
                 <div className='homepage-content'>
                        <div className='title-1'>There's a better way to ask</div>
                        <div className='title-2'>You don't want to make a boring form.
                            And your audience won't answer one.
                            Create a typeform instead-and make everyone happy.
                        </div>
                        <div className='title-3'>
                            {isAuthenticated === false ?  
                            <button onClick={()=> navigate('/login')}>Get's started. It's free</button> 
                            :
                             <button onClick={()=> navigate('/users')}>Doing Quiz Now</button>
                            }
                           
                        </div>
                 </div>
        </div>
    )
}

export  default HomePage