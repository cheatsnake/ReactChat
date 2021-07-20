import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import styled from 'styled-components';
import { Context } from '../index';
import {useAuthState} from 'react-firebase-hooks/auth';


const AppBar = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: #1e2126;
    color: #fff;
`
const Toolbar = styled.div`
    margin: 0 auto;
    width: 100;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
`
const Logo = styled.h1`
    font-size: 20px;
`

const Button = styled.div`
    cursor: pointer;
    background: #5f58ff;
    padding: 5px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border-radius: 3px;
    color: #fff;
    transition: .3s all;
    &:hover {
        background: #443eb6;
    }
`

const Navbar = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        <AppBar>
            <Toolbar>
                <Logo>React Chat</Logo>
                {user ? 
                    <Button onClick={() => auth.signOut()}>Exit</Button>
                    :
                    <NavLink to={LOGIN_ROUTE}>
                        {/* <Button>Login</Button> */}
                    </NavLink>
                }

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
export {
    Button
};