import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from './Navbar';
import { Context } from '../index';
import firebase from 'firebase';
import bg from '../images/bg.jpg';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 50px;
    background-color: #171717;
    background-image: url(${bg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Window = styled.div`
    background-color: #1e2126;
    padding: 50px 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
`
const Descr = styled.div`
    font-weight: 300;
    text-align: center;
    max-width: 500px;
    color: #fff;
    font-size: 16px;
    margin-bottom: 30px;
`

const LoginBtn = styled(Button)`
    height: 40px;
    border-radius: 5px;
`

const Login = () => {

    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
    }

    return (
        <Container>
            <Window>
                <Title>Welcome to React Chat</Title>
                <Descr>This is a simple application for communication. 
                    There are no restrictions here. To log in, you 
                    only need a Google account.</Descr>
                <LoginBtn onClick={login} >Login with Google</LoginBtn>
            </Window>
        </Container>
    );
};

export default Login;