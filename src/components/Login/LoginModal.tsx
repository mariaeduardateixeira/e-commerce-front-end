import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (username: string) => void;
}

const LoginModal: React.FC<IProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8085/login', {
        username,
        password
      });

      if (response.data === "Login bem-sucedido!") {
        console.log('Login realizado com sucesso!');
        onAuthenticated(username);
        onClose();
      } else {
        setError('Credenciais inválidas. Tente novamente ou cadastre-se.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError('Erro ao tentar fazer login: ' + error.response.data);
        console.error('Erro de autenticação:', error.response.data);
      } else {
        setError('Ocorreu um erro ao tentar fazer login!');
        console.error('Erro desconhecido:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <p className="register-link">Não tem uma conta? <a href="/registrar">Registre-se aqui</a></p>
      </div>
    </div>
  );
};

export default LoginModal;
