import './App.css';
import { ChatPage } from './components/chat_page/ChatPage';
import { CreationPage } from './components/creation_page/CreationPage'
import { AnalyticsPage } from './components/analytics_page/AnalyticsPage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SignUpPage } from './components/authentication/SignUpPage';
import { LoginPage } from './components/authentication/LoginPage';
import { HomePage } from './components/home_page/HomePage';
import { ExplanationsPage } from './components/analytics_page/OtherExplanations';

function App() {
    return (
        <div className="bg-bg bg-repeat bg-auto h-screen w-screen">
            <HashRouter>
                <Routes>
                    <Route path='/chat/:chatId' element={<ChatPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/analytics' element={<AnalyticsPage />} />
                    <Route path='/create' element={<CreationPage />}/>
                    <Route path='/home' element={<HomePage />}/>
                    <Route path='/community' element={<ExplanationsPage />}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
