import React from 'react';

// Passing in message as a props
const MyMessage = ({ message }) => {
    // Check if message is the actual message or an image?
    if(message?.attachments?.length > 0){
        // if length > 0, means message is an image
        return(
            // Then return image with the ff props
            <img
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{float: 'right'}}
            />
        )
    }

     // if length !> 0, means message is a text
    return (
        <div className='message' style={{float: 'right', marginRight: '18px', color: 'white', backgroundColor: 'rgb(130, 128, 128)'}}> 
            {message.text}
        </div>
    )
}

export default MyMessage;