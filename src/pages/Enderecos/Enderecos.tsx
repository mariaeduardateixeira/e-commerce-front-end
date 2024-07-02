// import React, { useEffect, useState } from 'react';
// import { apiGet, apiPost, apiPut, apiDelete, STATUS_CODE } from '../../api/RestClient';
// import { IEndereco } from './types';
// import EnderecoModal from '../../components/EnderecoModal/EnderecoModal';
// import { Button, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Enderecos: React.FC = () => {
//   const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
//   const [clienteStore, setClienteStore] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [enderecoAtual, setEnderecoAtual] = useState<IEndereco | null>(null);

//   useEffect(() => {
//     const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
//     if (cliente?.id) {
//       setClienteStore(cliente);
//       carregarEnderecos(cliente.id);
//     } else {
//       console.log("Cliente não autenticado ou ID não definido");
//     }
//   }, []);

//   const carregarEnderecos = async (clienteId: string) => {
//     const response = await apiGet(`/enderecos/carregarEnderecoByCliente/${clienteId}`);
//     if (response.status === STATUS_CODE.OK) {
//       setEnderecos(response.data);
//     } else {
//       console.error("Erro ao carregar endereços, status:", response.status);
//     }
//   };

//   const abrirModalParaCriar = () => {
//     setEnderecoAtual(null);
//     setIsModalOpen(true);
//   };

//     const abrirModalParaEditar = (endereco: IEndereco) => {
//     setEnderecoAtual(endereco);
//      setIsModalOpen(true);
//      };

//   const fecharModal = () => {
//     setIsModalOpen(false);
//   };

//   const salvarEndereco = async (endereco: { rua: string, bairro: string, cidade: string, estado: string }) => {
//     const enderecoParaSalvar = enderecoAtual ? { ...endereco, id: enderecoAtual.id } : endereco;
//     const apiEndpoint = enderecoAtual ? `/enderecos/atualizarEndereco/${enderecoAtual.id}` : '/enderecos/criarEndereco';
  
    
//   };

  

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Endereços Cadastrados
//       </Typography>
//       <Button variant="contained" color="primary" onClick={abrirModalParaCriar}>
//         Criar Novo Endereço
//       </Button>
//       {enderecos.length > 0 ? (
//         <List>
//           {enderecos.map((endereco) => (
//             <ListItem key={endereco.id} secondaryAction={
//               <>
                
               
//               </>
//             }>
//               <ListItemText
//                 primary={`${endereco.rua}, ${endereco.bairro}`}
//                 secondary={`${endereco.cidade}, ${endereco.estado}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       ) : (
//         <Typography variant="subtitle1">Nenhum endereço cadastrado.</Typography>
//       )}
//       <EnderecoModal
//         aberto={isModalOpen}
//         endereco={enderecoAtual || undefined}
//         onFechar={fecharModal}
//         onSalvar={salvarEndereco}
//       />
//     </div>
//   );
// };

// export default Enderecos;
// export {};

import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete, STATUS_CODE } from '../../api/RestClient';
import { IEndereco } from './types';
import EnderecoModal from '../../components/EnderecoModal/EnderecoModal';
import { Button, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Enderecos.css";
import { useNavigate } from 'react-router-dom';



const Enderecos: React.FC = () => {
  const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
  const [clienteStore, setClienteStore] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enderecoAtual, setEnderecoAtual] = useState<IEndereco | null>(null);
  const navigate = useNavigate();
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

  const voltar = () => {
    navigate('/');
  }

  const abrirModalParaEditar = (endereco: IEndereco) => {
    setEnderecoAtual(endereco);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };
  const salvarEndereco = async (endereco: { rua: string, bairro: string, cidade: string, estado: string }) => {
    const enderecoParaSalvar = enderecoAtual ? { ...endereco, id: enderecoAtual.id } : endereco;
    const apiEndpoint = enderecoAtual ? `/enderecos/atualizarEndereco/${enderecoAtual.id}` : '/enderecos/criarEndereco';

    try {
      const response = await (enderecoAtual ? apiPut : apiPost)(apiEndpoint, {
        ...enderecoParaSalvar,
        clienteId: clienteStore.id
      });

      if (response.status === STATUS_CODE.CREATED || response.status === STATUS_CODE.OK) {
        carregarEnderecos(clienteStore.id);
        fecharModal();
      } else {
        console.error('Erro ao salvar o endereço, status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao salvar o endereço:', error);
    }
  };

  const deletarEndereco = async (id: number) => {
    try {
      const response = await apiDelete(`/enderecos/deletar/${id}`);
      if (response.status === STATUS_CODE.OK) {
        setEnderecos(enderecos.filter((endereco) => endereco.id !== id));
      } else {
        console.error('Erro ao deletar o endereço, status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao deletar o endereço:', error);
    }
  };

  return (
    <div className='div-principal'>
      <div className="titulo">
        <Typography variant="h4" gutterBottom>
          Endereços Cadastrados
        </Typography>
      </div>
      {enderecos.length > 0 ? (
        <List>
          {enderecos.map((endereco) => (
            <ListItem key={endereco.id} secondaryAction={
              <>
                <IconButton edge="end" aria-label="editar" onClick={() => abrirModalParaEditar(endereco)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="deletar" onClick={() => deletarEndereco(endereco.id)}>
                  <DeleteIcon />
                </IconButton>
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
      <div className="botao-endereco">
        <Button variant="contained" color="primary" onClick={abrirModalParaCriar}>
          Criar Novo Endereço
        </Button>
        
        <Button variant="contained" color="primary" onClick={voltar}>
          Voltar
        </Button>
      </div>
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