import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Welcome.css';

const Welcome = ({ cliente_nome }) => {
    return (
        <div className="welcome-container">
            <div className="welcome-message">
                <h1>Bem-vindo, {cliente_nome}!</h1>
                <p>Estamos felizes em vê-lo aqui.</p>
                <Link to="/concessionaria" className="welcome-link">Cadastrar Concessionária</Link>
                <Link to="/automovel" className="welcome-link">Cadastrar Automóvel</Link>
            </div>
        </div>
    );
};

export default Welcome;
