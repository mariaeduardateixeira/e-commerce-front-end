import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import "./novoEndereco.css";

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
    
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>

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
