import React, { useState, useEffect, useRef } from 'react';
import { BsArrowsExpand } from 'react-icons/bs';
import {AiOutlineExpandAlt} from 'react-icons/ai';
import './ChatBox.css';

class Message {
    constructor(message, isMine, timestamp) {
        this.message = message;
        this.isMine = isMine;
        this.timestamp = timestamp;
        this.ref = React.createRef();
    }
}

const ChatBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8000/chat');

        socketRef.current.addEventListener('open', function(event) {
            console.log("WebSocket connection established");
        });

        socketRef.current.addEventListener('message', function (event) {
            console.log(event);
            const messageFromServer = event.data;
            console.log("Message received:" + messageFromServer);
            setMessages(prevMessages => [...prevMessages, new Message(messageFromServer, false, new Date().toLocaleTimeString())]);
        });

        return () => {
            socketRef.current.close();
        };
    }, []);

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, new Message(input, true, new Date().toLocaleTimeString())]);
            setInput('');

            const question = input;
            const message = JSON.stringify({question});

            console.log(message);
            socketRef.current.send(message);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            messages[messages.length - 1].ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className={`chat-container ${isExpanded ? 'expanded' : 'minimized'}`}>
            {isExpanded ? (
                <>
                    <button className="collapse-button" onClick={() => setIsExpanded(false)}>
                        Collapse < BsArrowsExpand/>
                    </button>
                    <div className="message-container">
                        {messages.map((message, index) => (
                            <div key={index} className={message.isMine ? 'my-message' : 'other-message'} ref={message.ref}>
                                <p>{message.message}</p>
                                <p className="timestamp">{message.timestamp}</p>
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <form onSubmit={handleMessageSubmit}>
                            <input 
                                type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                        </form>
                    </div>
                </>
            ) : (
                <div onClick={() => setIsExpanded(true)} className="minimized">
                    <span>Chat <AiOutlineExpandAlt /> </span>
                </div>
            )}
        </div>
    );
    
}

export default ChatBox;
