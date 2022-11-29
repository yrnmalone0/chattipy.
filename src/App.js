 import { ChatEngine } from "react-chat-engine";
 import ChatFeed from "./components/ChatFeed";
 import LoginForm from "./components/LoginForm";
 import './App.css'; 


 const App = () => {

    if(!localStorage.getItem('username')) return <LoginForm />;

    return(
        <ChatEngine
            height = "100vh"
            projectID = "85935044-d65e-4ef7-a173-0f5f32a14d8d"
            userName = {localStorage.getItem('username')}
            userSecret = {localStorage.getItem('password')}
            renderChatFeed = {(chatAppProps) => <ChatFeed { ...chatAppProps} />}
        />
    )
 }

 export default App;