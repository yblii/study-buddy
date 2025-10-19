import './App.css';
import { ChatPage } from './components/chat_page/ChatPage';
import { CreationPage } from './components/creation_page/CreationPage'
import { AnalyticsPage } from './components/analytics_page/AnalyticsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="bg-bg bg-repeat bg-auto h-screen w-screen">
            <BrowserRouter >
                <Routes>
                    <Route path='/chat' element={<ChatPage />} />
                    <Route path='/analytics' element={<AnalyticsPage />} />
                    <Route path='/' element={<CreationPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
