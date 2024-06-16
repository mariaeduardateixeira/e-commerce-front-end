import { AlternateEmail, Key, VisibilityOff, Visibility } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, InputLabel, Button } from "@mui/material";
import { FC, useState } from "react";
import "./clientes.css";
import InputSelect from "../InputSelect/inputSelect";
import { listaGeneros } from "./type";
import { STATUS_CODE, apiPost } from "../../api/RestClient";

const Clientes: FC = () => {
  const [genero, setGenero] = useState<string>();
  const [nome, setNome] = useState<string>();
  const [sobrenome, setSobrenome] = useState<string>();
  const [cpf, setCPF] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [telefone, setTelefone] = useState<string>();

  const salvarCliente = async () => {
    const data={
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        senha: senha,
        
    }

    const response = await apiPost("/clientes/", data);
    if(response.status === STATUS_CODE.CREATED){
      alert("Cliente cadastrado com sucesso!");
    }
  }

  return<>
    <div className="div-login">
      <div className="div-login-linha">
        <TextField 
          fullWidth
          label="Nome"
          type="text"
          value={nome}
          onChange={(event) => {
            if(event){
              setNome(event.target.value);
            }
          }}
        />
      </div>
      <div className="div-login-linha">
        <TextField 
          fullWidth
          label="Sobrenome"
          type="text"
          value={sobrenome}
          onChange={(event) => {
            if(event){
              setSobrenome(event.target.value);
            }
          }}
        />
      </div>
      <div className="div-login-linha">
        <TextField 
        fullWidth
        label="CPF"
        value={cpf}
        onChange={(event) => {
          if(event){
            setCPF(event.target.value);
          }
        }}
        type="number"
        />
      </div>
      <div className="div-login-linha">
        <TextField 
        fullWidth
        label="Telefone"
        value={telefone}
        onChange={(event) => {
          if(event){
            setTelefone(event.target.value);
          }
        }}
        type="number"
        />
      </div>
      <div className="div-login-linha">
        <TextField 
          fullWidth
          label="Email"
          type="text"
          value={email}
          onChange={(event) => {
            if(event){
              setEmail(event.target.value);
            }
          }}
        />
      </div>
      {/* <div className="div-login-linha">
        <InputSelect 
        label="Genero"
          lista={listaGeneros}
          valor={genero}
          onChange={(valor : any) =>{
            setGenero(valor);
          }}/>
      </div> */}
      <div className="div-login-linha">
        <TextField 
          fullWidth
          label="Senha"
          type="password"
          value={senha}
          onChange={(event) => {
            if(event){
              setSenha(event.target.value);
            }
          }}
        />
      </div>
      <div className="div-login-linha">
        <Button 
          variant="contained"
          onClick={() => {
            salvarCliente();
          }}>Salvar</Button>
      </div>
      </div>
  </>
}

export default Clientes;