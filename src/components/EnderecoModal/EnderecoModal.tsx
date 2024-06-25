import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { EnderecosResponseDom } from '../../pages/Enderecos/types';
import { apiPut, STATUS_CODE } from '../../api/RestClient';

interface EnderecoModalProps {
  aberto: boolean;
  endereco?: EnderecosResponseDom;
  onFechar: () => void;
  onSalvar: (endereco: { rua: string; bairro: string; cidade: string; estado: string; }) => void;
}

const EnderecoModal: React.FC<EnderecoModalProps> = ({ aberto, endereco, onFechar, onSalvar }) => {
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    if (endereco) {
      setRua(endereco.rua);
      setBairro(endereco.bairro);
      setCidade(endereco.cidade);
      setEstado(endereco.estado);
    } else {
      setRua('');
      setBairro('');
      setCidade('');
      setEstado('');
    }
  }, [endereco, aberto]);

  const handleSalvar = async () => {
    if (endereco && endereco.id) {
      try {
        const response = await apiPut(`/enderecos/atualizarEndereco/${endereco.id}`, {
          rua,
          bairro,
          cidade,
          estado,

        });

        if (response.status === STATUS_CODE.OK) {
          console.log('Endereço atualizado com sucesso:', response.data);
          onFechar();
        } else {
          console.error('Erro ao atualizar o endereço, status:', response.status);
        }
      } catch (error) {
        console.error('Erro ao atualizar o endereço:', error);
      }
    } else {
      onSalvar({ rua, bairro, cidade, estado });
    }
  };

  return (
    <Dialog open={aberto} onClose={onFechar}>
      <DialogTitle>{endereco ? 'Editar Endereço' : 'Novo Endereço'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha as informações do endereço.
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
          margin="dense"
          id="estado"
          label="Estado"
          select
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
