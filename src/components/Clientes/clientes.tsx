import React, { FC, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import './clientes.css';

const Clientes: FC = () => {
    const [nome, setNome] = useState<string>('');
    const [sobrenome, setSobrenome] = useState<string>('');
    const [cpf, setCPF] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');

    const salvarCliente = async () => {
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            senha: senha,
        };

        const response = await apiPost('/cadastroCliente/cadastrar', data); // Alterado para /cadastroCliente/cadastrar
        if (response.status === STATUS_CODE.CREATED) {
            alert('Cliente cadastrado com sucesso!');
            window.location.href = '/'; // Redireciona para a página inicial
        } else {
            alert(`Erro ao cadastrar cliente: ${response.message}`);
        }
    };

    return (
        <>
            <div className="div-login">
                <div className="div-login-linha">
                    <TextField
                        fullWidth
                        label="Nome"
                        type="text"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                </div>
                <div className="div-login-linha">
                    <TextField
                        fullWidth
                        label="Sobrenome"
                        type="text"
                        value={sobrenome}
                        onChange={(event) => setSobrenome(event.target.value)}
                    />
                </div>
                <div className="div-login-linha">
                    <TextField
                        fullWidth
                        label="CPF"
                        value={cpf}
                        onChange={(event) => setCPF(event.target.value)}
                        type="number"
                    />
                </div>
                <div className="div-login-linha">
                    <TextField
                        fullWidth
                        label="Telefone"
                        value={telefone}
                        onChange={(event) => setTelefone(event.target.value)}
                        type="number"
                    />
                </div>
                <div className="div-login-linha">
                    <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="div-login-linha">
                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                    />
                </div>
                <div className="div-login-linha">
                    <Button variant="contained" onClick={salvarCliente}>
                        Salvar
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Clientes;
