import React, { useState } from 'react';
import './LoginModal.css';
import { STATUS_CODE, apiPost } from '../../api/RestClient';
import { Button } from "@mui/material";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (username: string, idCliente: number) => void;
}

const LoginModal: React.FC<IProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState('');

  const salvarCliente = async () => {
    const data = {
      email,
      senha: password
    };

    console.log("Dados enviados:", data); // Verificar dados enviados na requisição

    try {
      const response = await apiPost("/clientes/autenticar/", data);
      if (response.status === STATUS_CODE.OK) {
        const idCliente = response.data.id; // Extraindo id do cliente da resposta
        console.log("ID do Cliente recebido: ", idCliente);
        onAuthenticated(email, idCliente);
        onClose();
      } else {
        setError('Credenciais inválidas. Tente novamente ou cadastre-se.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setError('Erro ao autenticar. Tente novamente mais tarde.');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          variant="contained"
          onClick={salvarCliente}
        >
          Entrar
        </Button>
        <p className="register-link">Não tem uma conta? <a href="/clientes/">Registre-se aqui</a></p>
      </div>
    </div>
  );
};

export default LoginModal;
