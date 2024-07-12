import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { api } from "../config_axios";

const MenuSuperior = () => {
    const { funcionario, logout } = useAuth(); // Assuming useAuth provides funcionario data after login
    const [nome, setNome] = useState('');
    
    useEffect(() => {
        const fetchFuncionarioNome = async () => {
            try {
                const response = await api.get(`/funcionario/`);
                console.log('Response:', response); // Verifique a resposta da API
                setNome(response.data.nome); // Verifique se o nome está sendo definido corretamente
            } catch (error) {
                console.error('Erro ao buscar nome do funcionário:', error);
            }
        };
            fetchFuncionarioNome();
        
    }, []);
    
    
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
            <div className="container">
                <Link to="/welcome" className="navbar-brand">Página incial{nome}</Link>
                
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/automovel" className="nav-link">Cadastrar automóvel</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/concessionaria" className="nav-link">Cadastrar concessionária</Link>
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
