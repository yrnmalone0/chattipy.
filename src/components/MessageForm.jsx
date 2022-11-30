import React from 'react';
import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';

const MessageForm = (props) => {
    const [value, setValue] = useState('');

    const {chatId, creds} = props;
    
    const handleSubmit = (event) => {
        // Avoiding browser refresh after submitting the form
        event.preventDefault();

        const text = value.trim();
        // sendMessage if length > 0
        if (text.length > 0) sendMessage(creds, chatId, {text});
        setValue('');
    }

    const handleChange = (event) => {
        // Get the value of input and store it
        setValue(event.target.value);

        isTyping(props, chatId);
    }

    const handleUpload = (event) => {
        sendMessage(creds, chatId, {files: event.target.files, text: ''});
    }

    return (
        <form className='message-form' onSubmit={handleSubmit}>
            <input  
                className='message-input'
                placeholder='Send a message...'
                value = {value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className='plus-button'>
                    <PlusOutlined className='plus-icon'/>
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id='upload-button'
                style={{display: 'none'}}
                onChange={handleUpload}
            />
            <button type='submit' className='send-button'>
                <ArrowRightOutlined className='send-icon'/>
            </button>
        </form>
    )
}

export default MessageForm;