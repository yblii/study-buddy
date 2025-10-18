import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/hello")
        .then((res) => setMessage(res.data.message))
        .catch((err) => console.error(err));
        });

    return (
        <div className="App">
            <h1>Welcome to the Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
