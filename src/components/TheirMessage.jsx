import React from 'react';

// Passing in message and lastMessage as a props
const TheirMessage = ({message, lastMessage}) => {
    // Checking if message is the first message sent by a user
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

    return (
        <div className='message-row'>
            {/* if it's the message sent by a user, add the ff styling */}
            {isFirstMessageByUser && (
                <div 
                    // Put in message-avatar as backgroundImage if the "style" logic exists
                    className='message-avatar'
                    // check if message, sender, avatar exists
                    style={{backgroundImage: `url(${message?.sender?.avatar})`}}
                />
            )}

            {/* if the user sends other mesgs, add the ff styling */}
            {/* Check if message is the actual message or an image? */}
            {message?.attachments?.length > 0
                // if message is an image, return image
                ? (
                    <img
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                        style={{marginLeft: isFirstMessageByUser ? '4px' : '48px'}}
                    />
                 )
                // else, return text
                : (
                    <div className='message' style={{float: 'left', backgroundColor: 'rgb(215, 213, 213)', marginLeft: isFirstMessageByUser ? '4px' : '48px'}}> 
                        {message.text}
                    </div>
                )
            }
        </div>
    )
}

export default TheirMessage;