import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogout());
        history.push("/");
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="profile-button">
            <button onClick={openMenu}>
                <span className="button-icon">
                    <i className="fa-solid fa-bars"></i>
                </span>
                <span className="button-icon">
                    <i className="fas fa-user-circle" />
                </span>
                
            </button>

            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className="dropdown-user-stats">
                            <div>{user.firstName}</div>
                            <div>{user.email}</div>
                        </li>
                        
                        <li>
                            <NavLink id="manage-spots-link" to="/spots/current">Manage Spots</NavLink>
                        </li>
                        <li>
                            <NavLink id="manage-trips-link" to="/bookings/current">Manage Trips</NavLink>
                        </li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalButton
                            buttonText="Log In"
                            id={"nav-log-in"}
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalButton
                            buttonText="Sign Up"
                            id={"nav-sign-up"}
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </div>
    );
}

export default ProfileButton;