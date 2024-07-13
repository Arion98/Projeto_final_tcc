import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { api } from "../config_axios";

const MenuSuperior = () => {
    const { funcionario, logout } = useAuth(); // Assuming useAuth provides funcionario data after login
    const [cliente_nome, setCliente_nome] = useState('');
    
    useEffect(() => {
        const fetchclienteNome = async () => {
            try {
                const response = await api.get(`/cliente`);
                console.log('Response:', response); // Verifique a resposta da API
                setCliente_nome(response.data.cliente_nome); // Verifique se o nome está sendo definido corretamente
            } catch (error) {
                console.error('Erro ao buscar nome do funcionário:', error);
            }
        };
            fetchclienteNome();
        
    }, []);
    
    
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
            <div className="container">
                <Link to="/welcome" className="navbar-brand">Página incial{cliente_nome}</Link>
                
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/prestador" className="nav-link">Cadastrar Prestador</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/agendamento" className="nav-link">Cadastrar agendamento</Link>
                    </li>                  
                    <li className="nav-item">
                        <Link to="/alter" className="nav-link">Manutenção Automoveis</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={logout} className="btn btn-sm btn-outline-secondary">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MenuSuperior;
