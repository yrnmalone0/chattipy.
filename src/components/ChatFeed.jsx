import React from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

// Functional Component 
const ChatFeed = (props) => {
    // Destructuring the props to make it easy extract only what is needed.
    const { chats, activeChat, userName, messages } = props;

    // Find the current chat >>> if chats exists, then finds chats and activeChat
    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => {
        // map users who read the message
        return chat.people.map((person, index) => person.last_read === message.id && (
            // render the ff if a user read the message
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

     // Functional component for generating new messages
    const renderMessages = () => {
        // Fetching all messages in the ChatFeed
        const keys = Object.keys(messages);

        // Rendering the messages with callback function and passing in the parameters
        return keys.map((key, index) => {
            const message = messages[key];
            // if there are messages, then find the last message.
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            // checking who the message belongs to
            const isMyMessage = userName === message.sender.username;


            return(
                // A statement to act as a user's message
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                     {/* Rendering the messages */}
                    <div className='message-block'>
                        {
                            // if it's my-message, render MyMessage Component, else render TheirMessage Component
                            isMyMessage
                            // Passing in message as a prop to have access to MyMessage and TheirMessage
                            ? <MyMessage message = {message} />
                            : <TheirMessage message = {message} lastMessage = {messages[lastMessageKey]} />
                        }
                    </div>
                    <div className='read-receipts' style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        })
    };

    // if there's no chat return a string of Loading
    if(!chat) return 'Loading...';

    return (
        // The structure of the ChatFeed
        <div className='chat-feed'>
            {/* Chat-Title Container */}
            <div className='chat-title-container'>
                <div className='chat-title'>
                    {/* Making sure we have the chat before accessing the chat-title */}
                    {chat?.title}
                </div>
                <div className='chat-subtitle'>
                    {/* Mapping over all the users to get the specific people to display as sub-title */}
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
                <hr
                    style={{
                    background: 'rgb(217, 217, 217)',
                    height: '2px',
                    marginTop: '8px',
                    }}
                />
            </div>
            {/* Calling renderMessages function */}
            {renderMessages()}
            <div style={{height: '100px'}}/>

            {/* The container or area to hold the entire messages */}
            <div className='message-form-container'>
                {/* Spreading all the props and pass in the chatId */}
                <MessageForm {...props} chatId = {activeChat} />
            </div>
        </div>
    )
    }

export default ChatFeed;