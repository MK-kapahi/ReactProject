
import React from "react";
import './style.css'
import { useState, useEffect, useRef } from "react";


export default function UserView({ receiver, sendAMessage, messageArray, currentUser, loadMessages, currentPage, roomResponse }) {
    const [message, setMessage] = useState('')
    const chatDisplayRef = useRef(null);
    const handleInput = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        sendAMessage(message)
        setMessage(" ")
    }

    useEffect(() => {
        // Attach an event listener for scroll events

        window.addEventListener('scroll', handleScroll);

        // Cleanup: Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    console.log(receiver)
    const handleScroll = () => {


        // Check if the user has scrolled to the bottom of the page
        const chatDisplay = chatDisplayRef.current;

        if (!chatDisplay) {
            return; // Return if chatDisplayRef is not yet available
        }

        // Check if the user has scrolled to the bottom of the chat display
        if (chatDisplay.scrollTop + chatDisplay.clientHeight >= chatDisplay.scrollHeight) {
            // Load more messages when the user reaches the bottom
            loadMessages(receiver, currentPage + 1);
        }
    };
    return (
        <>
            {JSON.stringify(receiver) != '{}' ? (
                <>
                    <div className="container d-flex justify-content-center">
                        <div className="card mt-5 chatdiv">
                            <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
                                <i className="fas fa-chevron-left"></i>
                                <span className="pb-3">{receiver.name}</span>
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="chatdisplay" ref={chatDisplayRef}>


                                {messageArray.length ? messageArray.map((singleMessage) => {
                                    return (


                                        <>
                                            {singleMessage.senderId === receiver._id ? (

                                                <>
                                                    <div className="d-flex flex-row p-3 receiverDiv row">
                                                        <div className="col-lg-12  d-flex flex-row">

                                                            <p> {receiver.name}</p>
                                                            <div className="bg-white mr-2 p-3"><span className="text-muted">{singleMessage.content}</span></div>
                                                            <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="30" height="30" />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : " "}
                                            {singleMessage.senderId === currentUser._id ?

                                                <>


                                                    <div className="d-flex flex-row p-3 senderDiv row">
                                                        <div className="col-lg-12 d-flex flex-row">

                                                            <p> {currentUser.name}</p>
                                                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30" />
                                                            <div className="chat ml-2 p-3"> {singleMessage.content} </div>
                                                        </div>
                                                    </div>
                                                </>

                                                : " "

                                            }





                                        </>
                                    )
                                })

                                    : " start a chat "
                                }
                            </div>

                            <div className="form-group px-3v d-flex">
                                <input type="text" className="form-control input-message" rows="5" placeholder="Type your message" onChange={handleInput} value={message} />
                                <button type="button" className="sendButton" onClick={sendMessage}>send </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                " "
            )}
        </>
    );
}