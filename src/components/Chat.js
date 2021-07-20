import React, {useContext} from 'react';
import { Container } from './Login';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { Button } from './Navbar';
import { useState } from 'react';
import Loaded from './Loaded';
import firebase from 'firebase';

const ChatContainer = styled(Container)`
    background-color: #171717;
    background-image: none;
    display: block;
    padding: 50px 0 65px 0;
`

const ChatWindow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 0px 10px 20px 10px;
    width: 100%;
    max-width: 900px;
    height: 100%;
    //background-color: #14171b;
    color: #fff;
    overflow-y: auto;
    margin-top: 15px;
`

const ChatMsg = styled.div`
    padding: 10px 5px;
    display: flex;
    flex-direction: row;
`

const UserAvatar = styled.div`
    img {
        width: 50px;
        border-radius: 50%;
    }
`
const Msg = styled.div`
    padding: 0 0 0 10px;
    display: flex;
    flex-direction: column;
`

const Name = styled.div`
    font-weight: 400;
    font-size: 14px;
    color: #58bcff;
`
const Text = styled.div`
    font-weight: 300;
    margin-top: 5px;
    font-size: 16px;
`

const ChatPanel = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    padding: 10px 20px 15px 0px;
    width: 100%;
    max-width: 900px;
    height: 65px;
    background-color: #171717;
    
`

const ChatInput = styled.input`
    height: 100%;
    width: 100%;
    border: none;
    background-color: #1e2126;
    padding: 5px 10px;
    color: #fff;
    font-size: 18px;
    &:focus{
        outline: none;
    }
`

const ChatBtn = styled(Button)`
    background-color: #1e2126;
    text-align: center;
    line-height: 10px;
    padding: 5px 15px;
    width: 60px;
    font-size: 32px;
    color: #5a626e;
    &:hover {
        background-color: #1e2126;
        color: #ffffff;
    }
`

const Chat = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);

    const [value, setValue] = useState('');
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )
    
    const sendMessage = async () => {
        if (value != '') {
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setValue('');
    }

    const keyPress = e => {
        if (e.charCode == 13) {
            sendMessage();
        }
    }

    if (loading) {
        return <Loaded/>
    } 

    function scroll() {
        const view = document.querySelector(".sc-jrsJWt").scrollHeight;
        document.querySelector(".sc-jrsJWt").scrollBy(0, view);
    }

    return (
        <ChatContainer>
            <ChatWindow onLoad={scroll} onKeyPress={keyPress}>
                {messages.map(message => 
                    <ChatMsg>
                        <UserAvatar>
                            <img src={message.photoURL} alt={'avatar'}/>
                        </UserAvatar>
                        <Msg>
                            <Name>{message.displayName}</Name>
                            <Text>{message.text}</Text>
                        </Msg>
                    </ChatMsg>    
                )}
                <ChatPanel>
                    <ChatInput
                        placeholder={'Type your message'}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    ></ChatInput>
                    <ChatBtn onClick={sendMessage}>&#9993;</ChatBtn>
                </ChatPanel>
            </ChatWindow>
        </ChatContainer>
    );
};

export default Chat;