import React, { useState, useEffect, useRef } from 'react';
import { BsArrowsExpand } from 'react-icons/bs';
import {AiOutlineExpandAlt} from 'react-icons/ai';
import './ChatBox.css';
import axios from 'axios';

class Message {
    constructor(message, isMine, timestamp) {
        this.message = message;
        this.isMine = isMine;
        this.timestamp = timestamp;
    }
}

const baseURL = process.env.REACT_APP_URL

const ChatBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([
        new Message("Hi there! How can I help you with your fitness goals?", false, new Date().toLocaleTimeString())
    ]);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);


    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, new Message(input, true, new Date().toLocaleTimeString())]);
    
            setInput('');
    
            try {
                console.log(input)
                const response = await axios.post(baseURL + 'chat', {question: input});
                const messageFromServer = response.data.answer;
                setMessages(prevMessages => [...prevMessages, new Message(messageFromServer, false, new Date().toLocaleTimeString())]);
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={`chat-container ${isExpanded ? 'expanded' : 'minimized'}`}>
            {isExpanded ? (
                <>
                    <button className="collapse-button" onClick={() => setIsExpanded(false)}>
                        Collapse < BsArrowsExpand/>
                    </button>
                    <div className="message-container" ref={messagesEndRef}>
                        {messages.map((message, index) => (
                            <div key={index} className={message.isMine ? 'my-message' : 'other-message'}>
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
