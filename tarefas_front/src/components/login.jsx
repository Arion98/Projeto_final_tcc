import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from "../config_axios";


const FormularioLogin = () => {
    const [email, setEmail] = useState("");
    const [cliente_senha, setClienteSenha] = useState("");
    const [error, setError] = useState("");
    const [aviso, setAviso] = useState("");
    const [success, setSuccess] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || cliente_senha.trim() === "") {
            setError("Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, cliente_senha })
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                login(); // Chama o método login do AuthProvider
                setSuccess(true);
                setTimeout(() => {
                    navigate('/welcome'); // Redireciona para a página de agendamentos
                }, 0);
            } else {
                setError("Usuário ou senha inválidos!");
            }
        } catch (error) {
            setError("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };



    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="username">USUÁRIO</label>
                                <input type="text" id="username" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="senha">SENHA</label>
                                <input type="password" id="senha" className="form-control form-control-lg" value={cliente_senha} onChange={(e) => setClienteSenha(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                            <div>
                                <br />
                                <Link to="/cadastrarUsuario" className="nav-link">
                                    <button type="button" className="btn btn-primary btn-lg btn-block">Cadastrar-se</button>
                                </Link>
                            </div>
                        </form>
                        {aviso && (
                           <div
                            className={`alert mt-3 ${success ? "alert-success" : "alert-danger"}`}>
                        {aviso}
                          </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioLogin;
