import React, { FC, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import './clientes.css';
import { useNavigate } from 'react-router-dom';

const Clientes: FC = () => {
    const [nome, setNome] = useState<string>('');
    const [sobrenome, setSobrenome] = useState<string>('');
    const [cpf, setCPF] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const navigate = useNavigate();


    const aplicarMascaraDocumento = (documento: string) => {
        const apenasDigitos = documento.replace(/\D/g, '').slice(0,14);
    
        if (apenasDigitos.length <= 11) {
          return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
          return apenasDigitos
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
            
        }
      };
      const formatarTelefone = (telefone: string) => {
        return telefone
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
          .replace(/(-\d{4})\d+?$/, '$1');
      };

      const removerCaracteresNaoNumericos = (valor: string) => {
        return valor.replace(/\D/g, '');
      }

    const salvarCliente = async () => {
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            cpf: removerCaracteresNaoNumericos(cpf),
            telefone: removerCaracteresNaoNumericos(telefone),
            email: email,
            senha: senha,
        };

        const response = await apiPost("/clientes/", data);
        if(response.status === STATUS_CODE.CREATED){
          alert("Cliente cadastrado com sucesso!");
        }else {
            alert(`Erro ao cadastrar cliente`);
        }
      console.log(">>>>",data)
      navigate('/');
    };

    return (
        <>
        <div className="div-login">
        <Typography>
            Cadastre-se!
        </Typography>
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
            label="CPF/CNPJ"
            value={cpf}
            onChange={(event) => setCPF(aplicarMascaraDocumento(event.target.value))}
          />
                </div>
                <div className="div-login-linha">
                <TextField
            fullWidth
            label="Telefone"
            value={telefone}
            onChange={(event) => setTelefone(formatarTelefone(event.target.value))}
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
