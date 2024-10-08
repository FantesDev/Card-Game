import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Header from './components/Header/Header';
import CardGame from './components/CardGame/CardGame';
import CardDisplay from './components/CardDisplay/CardDisplay'; 
import Footer from './components/Footer/Footer';
import FeedbackPage from './components/FeedBackpage/FeedbackPage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <section>
                        <Routes>
                            <Route path="/" element={<CardGame />} />
                            <Route path="/regras" element={<CardDisplay />} />
                            <Route path="/feedback" element={<FeedbackPage/>} />
                            <Route path="/search" element={<SearchPage/>} />
                        </Routes>
                    </section>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
