import React from "react";
import ChatView from "./Components/ChatView"
import UserView from "./Components/UserView";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { allMessages, sendMessage } from "../../../Redux/Actions";
import { createChatRoom } from "../../../Redux/Actions/index";
import socket from "../../../Service/socket";
export default function ChatRoom() {

    const dispatch = useDispatch();
    const [receiver, setReceiver] = useState({})
    const [roomResponse, setRoomResponse] = useState({})
    const [messageArray, setMessageArray] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    const [currentPage, setCurrentPage] = useState(1);
    let roomId = ''
    let allMessageArrya = [...messageArray] || [ ]

    const chatRoom = (user) => {
        console.log(receiver)
        const dataToBeSent = {
            currentUserId: currentUser._id,
            currentUserName: currentUser.name,
            otherUserId: user._id,
            otherUserName: user.name,
            successfulChatRoomResponse
        }
        dispatch(createChatRoom({ dataToBeSent }))
    }

    const successfulChatRoomResponse = (res) => {
        setRoomResponse(res)
        roomId = res._id
        loadMessages(res, currentPage)
    }

    const loadMessages = (res, nextPage) => {
        let id = res._id || roomId
        console.log(id)
        dispatch(allMessages({ id, page: nextPage, pageSize: 10, AllMessage }));
        setCurrentPage(nextPage)
    }
    const AllMessage = (msgRes) => {
        setMessageArray(msgRes)
    }
    const sendAMessage = (message) => {
        console.log(message)
        const dataTobeSent = {
            roomId: roomResponse._id,
            senderId: currentUser._id,
            content: message
        }

        allMessageArrya.push(dataTobeSent)
        dispatch(sendMessage({ dataTobeSent }))
        setMessageArray(allMessageArrya)

    }

    useEffect(() => {
        socket.on('message', (message) => {
            if (message) {
                allMessageArrya.push(message)
                setMessageArray(allMessageArrya)
            }
        });
    }, [allMessageArrya])

    return (
        <>
            <section className="container">
                <div className="row ">
                    <div className="col-lg-3">
                        <UserView setReceiver={setReceiver} currentUser={currentUser} chatRoom={chatRoom} roomResponse={roomResponse} />

                    </div>
                    <div className="col-lg-9">
                        <ChatView receiver={receiver} sendAMessage={sendAMessage} messageArray={messageArray} currentUser={currentUser} loadMessages={loadMessages} roomResponse={roomResponse} currentPage={currentPage} />
                    </div>
                </div>
            </section>
        </>
    )
}