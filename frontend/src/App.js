import './App.css';
import { ChatPage } from './components/chat_page/ChatPage';
import { CreationPage } from './components/creation_page/CreationPage'
import { AnalyticsPage } from './components/analytics_page/AnalyticsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="bg-bg bg-repeat bg-auto h-screen flex items-center 
                justify-center">
            <div className='pointer-events-none absolute backdrop-saturate-[.9] backdrop-brightness-[.9] top-0 left-0 w-full h-full'></div>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ChatPage />} />
                    <Route path='/analytics' element={<AnalyticsPage />} />
                    <Route path='/new' element={<CreationPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
