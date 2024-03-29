// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateLink from './CreateLink';
import springbnblogo from '../../images/springbnblogo.png';
import sakuralogo from '../../images/logo-no-background.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="navigation-wrapper">
        
            <div className="navigation-content">
                <div className='logo'>
                        <NavLink className='logo-image' exact to="/">
                            <img src={sakuralogo} alt="Sprinbnb logo"></img>
                        </NavLink>
                </div>
                <div className='user-utils'>
                    <CreateLink user={sessionUser}/>
                    {/* <div className="home">
                        <NavLink exact to="/">Home</NavLink>
                    </div> */}
                    {isLoaded && (
                        
                            <ProfileButton user={sessionUser} />
                        
                    )}
                </div>
                
            </div>

        </nav>
    );
}

export default Navigation;