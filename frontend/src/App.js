import './App.css';
import { ChatPage } from './components/chat_page/ChatPage';
import { CreationPage } from './components/creation_page/CreationPage'
import { AnalyticsPage } from './components/analytics_page/AnalyticsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div>
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
