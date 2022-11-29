import React, { useState } from 'react';
// import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authObject = {'Project-ID': "85935044-d65e-4ef7-a173-0f5f32a14d8d", 'User-Name': username, 'User-Secret': password};

       try {
           //username + password => chatengine (to give msgs)
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});

            //if it works, -> logged in

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();

       } catch (error) {
            //if not -> error ... try again later/new username
            setError('Incorrect username or password! Please try again');
       }
    }

    return (
        <div className='wrapper'>
            {/* <h1 className='title'>Welcome to Chattipy Web Application</h1> */}
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <label className='label'>Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className='input'
                        required
                    />
                    <label className='label'>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className='input'
                        required
                    />
                    <div align="center">
                        <button type='submit' className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;