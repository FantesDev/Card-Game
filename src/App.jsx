import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import CardGame from './components/CardGame/CardGame';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <section>
                    <h2>Jogo de Cartas</h2>
                    <CardGame />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
