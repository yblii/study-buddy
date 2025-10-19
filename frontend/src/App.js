import './App.css';
import { ChatWindow } from './components/ChatWindow';

function App() {
    return (
        <div className="App bg-bg bg-repeat bg-contain h-screen flex items-center 
            justify-center">
            <ChatWindow />
            <div className='backdrop-saturate-[.85]  absolute top-0 left-0 w-full h-full'>
            </div>
        </div>
    );
}

export default App;
