import './App.css';
import { ChatPage } from './pages/ChatPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
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
