import Cadastrar_Tarefas from './components/cadastrar_tarefa';
import Menu_Superior from './components/MenuSuperior';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import Cadastrar_Prestador from './components/cadastrar_prestador';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Cadastrar_Concessionaria from './components/cadastrar_concessionaria';
import Cadastrar_Automovel from './components/cadastrar_automovel';
import Manutencao_Automovel from './components/manutencao_Automoveis';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  const navigate = useNavigate();

  if (!autenticado) {
    navigate('/');
    return null;
  }

  return children;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();

  return (
    <Router>
      {autenticado && <Menu_Superior />}
      <Routes>
        <Route path="/" element={<FormularioLogin />} />
        <Route path="/welcome" element={autenticado ? <Cadastrar_Tarefas /> : <Navigate to="/" />} />
        <Route path="/tarefas" element={<ProtectedRoute><Cadastrar_Tarefas /></ProtectedRoute>} />
        <Route path="/cadastrarUsuario" element={<Cadastrar_Usuarios />} />
        <Route path="/prestador" element={<Cadastrar_Prestador />} />
        <Route path="/concessionaria" element={<ProtectedRoute><Cadastrar_Concessionaria /></ProtectedRoute>} />
        <Route path="/automovel" element={<ProtectedRoute><Cadastrar_Automovel /></ProtectedRoute>} />
        <Route path="/alter" element={<ProtectedRoute><Manutencao_Automovel /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoutesWithAuth />
    </AuthProvider>
  );
};

export default App;
