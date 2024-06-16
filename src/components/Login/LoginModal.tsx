import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';
import { STATUS_CODE, apiPost } from '../../api/RestClient';
import { TextField, InputAdornment, IconButton, InputLabel, Button } from "@mui/material";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (username: string, idCliente: number) => void; // Corrigido: Number para number
}

const LoginModal: React.FC<IProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idCliente, setIdCliente] = useState<number | null>(null); // Inicializa como null
  const [error, setError] = useState('');
  const [nome, setNome] = useState<string>();
  const [sobrenome, setSobrenome] = useState<string>();
  const [cpf, setCPF] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();

  const salvarCliente = async () => {
    const data={
      username,
      idCliente,
      password
    }

    console.log(">>>", data);

  
      const response = await apiPost("/autenticar/", data);
    if(response.status === STATUS_CODE.CREATED){
      alert("Cliente autenticado com sucesso!");
    }
  }

//     try{
//     if (response.data === "Login bem-sucedido!") {
//       console.log('Login realizado com sucesso!');
//       if (idCliente !== null) {
//         onAuthenticated(username, idCliente);
//       } else {
//         setError('ID do cliente inválido.');
//       }
//       onClose();
//     } else {
//       setError('Credenciais inválidas. Tente novamente ou cadastre-se.');
//     }
//   }
//     catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       setError('Erro ao tentar fazer login: ' + error.response.data);
//       console.error('Erro de autenticação:', error.response.data);
//     } else {
//       setError('Ocorreu um erro ao tentar fazer login!');
//       console.error('Erro desconhecido:', error);
//     }
  
// ;


if (!isOpen) return null;
  

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8085/login', {
  //       username,
  //       password
  //     });


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
        <Button 
          variant="contained"
          onClick={() => {
            salvarCliente();
          }}>Salvar</Button>
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

