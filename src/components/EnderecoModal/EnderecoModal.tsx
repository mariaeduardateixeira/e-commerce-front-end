import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import "./EnderecoModal.css";

interface EnderecoModalProps {
  aberto: boolean,
  onFechar: () => void,
  onSalvar: (endereco: { rua: string, bairro: string, cidade: string, estado: string }) => void,
}

const EnderecoModal: FC<EnderecoModalProps> = ({ aberto, onFechar, onSalvar }) => {
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleSalvar = () => {
    onSalvar({ rua, bairro, cidade, estado });
    onFechar();
  };

  return (
    <Dialog open={aberto} onClose={onFechar}>
      <DialogTitle>Cadastro de Endereço</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Insira os detalhes do seu endereço.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="rua"
          label="Rua"
          type="text"
          fullWidth
          variant="standard"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
        <TextField
          margin="dense"
          id="bairro"
          label="Bairro"
          type="text"
          fullWidth
          variant="standard"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
        <TextField
          margin="dense"
          id="cidade"
          label="Cidade"
          type="text"
          fullWidth
          variant="standard"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <TextField
          select
          margin="dense"
          id="estado"
          label="Estado"
          fullWidth
          variant="standard"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Selecione um estado</option>
    
          <option value="Acre">Acre</option>
          <option value="Alagoas">Alagoas</option>
          <option value="Amapá">Amapá</option>
          <option value="Amazonas">Amazonas</option>
          <option value="Bahia">Bahia</option>
          <option value="Ceará">Ceará</option>
          <option value="Distrito Federal">Distrito Federal</option>
          <option value="Espírito Santo">Espírito Santo</option>
          <option value="Goiás">Goiás</option>
          <option value="Maranhão">Maranhão</option>
          <option value="Mato Grosso">Mato Grosso</option>
          <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
          <option value="Minas Gerais">Minas Gerais</option>
          <option value="Pará">Pará</option>
          <option value="Paraíba">Paraíba</option>
          <option value="Paraná">Paraná</option>
          <option value="Pernambuco">Pernambuco</option>
          <option value="Piauí">Piauí</option>
          <option value="Rio de Janeiro">Rio de Janeiro</option>
          <option value="Rio Grande do Norte">Rio Grande do Norte</option>
          <option value="Rio Grande do Sul">Rio Grande do Sul</option>
          <option value="Rondônia">Rondônia</option>
          <option value="Roraima">Roraima</option>
          <option value="Santa Catarina">Santa Catarina</option>
          <option value="São Paulo">São Paulo</option>
          <option value="Sergipe">Sergipe</option>
          <option value="Tocantins">Tocantins</option>

        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onFechar}>Cancelar</Button>
        <Button onClick={handleSalvar}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnderecoModal;
