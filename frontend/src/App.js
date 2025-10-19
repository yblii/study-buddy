import './App.css';
import { ChatPage } from './components/chat_page/ChatPage';
import { AnalyticsPage } from './components/analytics_page/AnalyticsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ChatPage />} />
                    <Route path='/analytics' element={<AnalyticsPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
