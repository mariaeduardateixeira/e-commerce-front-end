import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';
import { STATUS_CODE, apiPost } from '../../api/RestClient';
import { TextField, InputAdornment, IconButton, InputLabel, Button } from "@mui/material";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (email: string, id: number) => void;
}

const LoginModal: React.FC<IProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [id, setId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState('');

  const salvarCliente = async () => {
    const data = {
      email,
      senha: password
    };

    console.log(">>>", data);


      const response = await apiPost("/clientes/autenticar/", data);
      if (response.status === 200) {
        alert("Cliente autenticado com sucesso!");
      }
      if (response.status === 200) {
        const idCliente = response.data; // Assume que o ID do cliente é retornado pelo backend
    console.log(">>>> dados: ",idCliente);
        // Chama a função onAuthenticated com email e idCliente
        onAuthenticated(email, idCliente);
        onClose();
      } else {
        setError('Credenciais inválidas. Tente novamente ou cadastre-se.');
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
// function apiPost(arg0: string, data: {
//   nome: string | undefined;
//   //sobrenome: sobrenome,
//   //cpf: cpf,
//   //sexo: genero,
//   email: string | undefined; senha: string | undefined;
// }) {
//   throw new Error('Function not implemented.');
// }

