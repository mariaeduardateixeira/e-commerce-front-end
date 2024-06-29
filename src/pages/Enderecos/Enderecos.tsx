import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete, STATUS_CODE } from '../../api/RestClient';
import { IEndereco } from './types';
import EnderecoModal from '../../components/EnderecoModal/EnderecoModal';
import { Button, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Enderecos: React.FC = () => {
  const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
  const [clienteStore, setClienteStore] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enderecoAtual, setEnderecoAtual] = useState<IEndereco | null>(null);

  useEffect(() => {
    const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
    if (cliente?.id) {
      setClienteStore(cliente);
      carregarEnderecos(cliente.id);
    } else {
      console.log("Cliente não autenticado ou ID não definido");
    }
  }, []);

  const carregarEnderecos = async (clienteId: string) => {
    const response = await apiGet(`/enderecos/carregarEnderecoByCliente/${clienteId}`);
    if (response.status === STATUS_CODE.OK) {
      setEnderecos(response.data);
    } else {
      console.error("Erro ao carregar endereços, status:", response.status);
    }
  };

  const abrirModalParaCriar = () => {
    setEnderecoAtual(null);
    setIsModalOpen(true);
  };

  // const abrirModalParaEditar = (endereco: IEndereco) => {
  //   setEnderecoAtual(endereco);
  //   setIsModalOpen(true);
  // };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const salvarEndereco = async (endereco: { rua: string, bairro: string, cidade: string, estado: string }) => {
    const enderecoParaSalvar = enderecoAtual ? { ...endereco, id: enderecoAtual.id } : endereco;
    const apiEndpoint = enderecoAtual ? `/enderecos/atualizarEndereco/${enderecoAtual.id}` : '/enderecos/criarEndereco';
  
    
  };

  

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Endereços Cadastrados
      </Typography>
      <Button variant="contained" color="primary" onClick={abrirModalParaCriar}>
        Criar Novo Endereço
      </Button>
      {enderecos.length > 0 ? (
        <List>
          {enderecos.map((endereco) => (
            <ListItem key={endereco.id} secondaryAction={
              <>
                
               
              </>
            }>
              <ListItemText
                primary={`${endereco.rua}, ${endereco.bairro}`}
                secondary={`${endereco.cidade}, ${endereco.estado}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1">Nenhum endereço cadastrado.</Typography>
      )}
      <EnderecoModal
        aberto={isModalOpen}
        endereco={enderecoAtual || undefined}
        onFechar={fecharModal}
        onSalvar={salvarEndereco}
      />
    </div>
  );
};

export default Enderecos;
export {};
