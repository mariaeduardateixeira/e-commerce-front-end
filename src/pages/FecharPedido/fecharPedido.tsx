// import { FC, useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
// import { apiGet, apiPost, STATUS_CODE } from "../../api/RestClient";
// import { IEndereco, formasPagamento } from "./types";
// import "./fecharPedido.css";

// import { Button, ListItem, ListItemText, Radio } from "@mui/material";
// import Botao from "../../components/Botao/botao";
// import EnderecoModal from "../../components/EnderecoModal/EnderecoModal";

// const FecharPedido: FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
//   const [clienteStore, setClienteStore] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [enderecoId, setEnderecoId] = useState<number>();
//   const [pagamento, setPagamento] = useState<string>();
//   const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");

//   const finalizarCompra = () => {
//     const data = {
//       clienteId: cliente.id,
//       enderecoId: enderecoId,
//       forma_pagamento: pagamento,
//     };
    
//     localStorage.setItem("resumo", JSON.stringify(data));
//     window.location.href = `/resumo`;
//   };

//   useEffect(() => {
//     if (cliente?.id) {
//       setClienteStore(cliente);
//     } else {
//       console.log("Cliente não autenticado ou ID não definido");
//       console.log("ncjndcjdnj", clienteStore)
//     }
//   }, []);

//   useEffect(() => {
//     if (clienteStore?.id) {
//       carregarEnderecos(); // Passar o ID do cliente aqui
//     }
//   }, [clienteStore]);

//   const carregarEnderecos = async () => {
//     console.log(`Carregando endereços para o cliente ID: ${clienteStore.id}`);
//     const response = await apiGet(`/enderecos/carregarEnderecoByCliente/${clienteStore.id}`);
//     if (response.status === STATUS_CODE.OK) {
//       setEnderecos(response.data);
//     } else {
//       console.error("Erro ao carregar endereços, status:", response.status);
//     }
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSaveAddress = async (novoEndereco: { rua: string, bairro: string, cidade: string, estado: string }) => {
//     if (enderecos.length >= 4) {
//       alert("Você já cadastrou o número máximo de endereços (4).");
//       return;
//     }
//     try {
//       const response = await apiPost('/enderecos/criarEndereco', {
//         ...novoEndereco,
//         clienteId: clienteStore.id
//         //clienteStore.id
//       });
  
//       if (response.status === STATUS_CODE.CREATED) {
//         setEnderecos([...enderecos, response.data]);

//       } else {
//         console.error('Erro ao salvar o endereço, status:', response.status);
//       }
//     } catch (error) {
//       console.error('Erro ao salvar o endereço:', error);
//     }
  
//     handleCloseModal();
//   };

//   return (
//     <>
//       <div className="div-central">
//         <div className="div-central-fieldset">
//           <div className="container-enderecos">
//             <fieldset className="fieldset">
//               <legend id="titulo-endereco">Endereço de entrega</legend>
//               {enderecos.length > 0 ? (
//                 enderecos.map((endereco: IEndereco) => (
//                   <div className="container-endereco-cadastrado" key={endereco.id}>
                    
//                     <div className="endereco-content">
//                       <Radio
//                         className="radio"
//                         checked={endereco.id === (enderecoId || 0)}
//                         onChange={() => {
//                         setEnderecoId(endereco.id);
//                         }}
//                         sx={{
//                           color: "#888", // Cor quando não está selecionado
//                           '&.Mui-checked': {
//                             color: "#9088ba", // Cor quando está selecionado
//                           },
//                         }}
//                       />
                        
                       
//                 <p>{`${endereco.rua}, ${endereco.bairro} - ${endereco.cidade}, ${endereco.estado}`}</p>
                

//                     </div>
//                               <hr/>  
//                 </div>
//               ))
//             ) : (
//               <div>Carregando dados...</div>
//             )}
//           </fieldset>
//           </div>
//           </div>
//         <div className="novo-endereco">
//           <Button variant="contained" onClick={handleOpenModal}>Adicionar novo endereço</Button>
//         </div>
//         <div className="container-fechar-pedido">
//           <div className="container-forma-pagamento">
//           <fieldset className="forma-pagamento">
//               <legend>Forma de pagamento</legend>
//                   {formasPagamento.map(f => (
//                     <div className="div-forma-pagamento" key={f.valor}>
//                       <Radio
//                         checked={f.valor === (pagamento || 0)}
//                         onChange={() => {
//                           // if(f.valor === "CREDITO"){
                            
//                           // }
//                           setPagamento(f.valor);
//                         }}
//                         sx={{
//                           color: "#888", // Cor quando não está selecionado
//                           '&.Mui-checked': {
//                             color: "#9088ba", // Cor quando está selecionado
//                           },
//                         }}
//                       />
//                       <label htmlFor="pix">{f.texto}</label>
//                     </div>
//                   ))}                  
//         </fieldset>
//           </div>
//         </div>
//         <div className="container-botao">
//           <div className="button">
//             <Botao
//               label="Finalizar Compra"
//               onClick={() => {finalizarCompra()}}
//             />
//           </div>
//         </div>
//       </div>
     
//       <EnderecoModal
//         aberto={isModalOpen}
//         onFechar={handleCloseModal}
//         onSalvar={handleSaveAddress}
//       />
//     </>
//   );
// };

// export default FecharPedido;


import { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { apiGet, apiPost, STATUS_CODE } from "../../api/RestClient";
import { IEndereco, formasPagamento } from "./types";
import "./fecharPedido.css";

import { Button, Radio } from "@mui/material";
import Botao from "../../components/Botao/botao";
import EnderecoModal from "../../components/EnderecoModal/EnderecoModal";
import { useNavigate } from "react-router-dom";



const FecharPedido: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
  const [clienteStore, setClienteStore] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enderecoId, setEnderecoId] = useState<number>();
  const [pagamento, setPagamento] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
    if (cliente?.id) {
      setClienteStore(cliente);
    } else {
      console.log("Cliente não autenticado ou ID não definido");
    }
  }, []);

  const handleEnderecoClick = () => {
    navigate('/enderecos/');
  }


  useEffect(() => {
    if (clienteStore?.id) {
      carregarEnderecos();
    }
  }, [clienteStore]);

  const carregarEnderecos = async () => {
    console.log(`Carregando endereços para o cliente ID: ${clienteStore.id}`);
    const response = await apiGet(`/enderecos/carregarEnderecoByCliente/${clienteStore.id}`);
    if (response.status === STATUS_CODE.OK) {
      setEnderecos(response.data);
    } else {
      console.error("Erro ao carregar endereços, status:", response.status);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAddress = async (novoEndereco: { rua: string, bairro: string, cidade: string, estado: string }) => {
    if (enderecos.length >= 4) {
      alert("Você já cadastrou o número máximo de endereços (4).");
      return;
    }
    try {
      const response = await apiPost('/enderecos/criarEndereco', {
        ...novoEndereco,
        clienteId: clienteStore.id
      });

      if (response.status === STATUS_CODE.CREATED) {
        setEnderecos([...enderecos, response.data]);
      } else {
        console.error('Erro ao salvar o endereço, status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao salvar o endereço:', error);
    }

    handleCloseModal();
  };

  const handlePaymentChange = (valor: string) => {
    setPagamento(valor);
  };
  

  const finalizarCompra = () => {
    const data = {
      clienteId: clienteStore.id,
      enderecoId: enderecoId,
      forma_pagamento: pagamento,
    };

    localStorage.setItem("resumo", JSON.stringify(data));
    window.location.href = `/resumo`;
  };

  return (
    <>
      <div className="div-central">
        <div className="div-central-fieldset">
          <div className="container-enderecos">
            <fieldset className="fieldset">
              <legend id="titulo-endereco">Endereço de entrega</legend>
              {enderecos.length > 0 ? (
                enderecos.map((endereco: IEndereco) => (
                  <div className="container-endereco-cadastrado" key={endereco.id}>
                    <div className="endereco-content">
                      <Radio
                        className="radio"
                        checked={endereco.id === (enderecoId || 0)}
                        onChange={() => setEnderecoId(endereco.id)}
                        sx={{
                          color: "#888", // Cor quando não está selecionado
                          '&.Mui-checked': {
                            color: "#9088ba", // Cor quando está selecionado
                          },
                        }}
                      />
                      <p>{`${endereco.rua}, ${endereco.bairro} - ${endereco.cidade}, ${endereco.estado}`}</p>
                    </div>
                    <hr/>
                  </div>
                ))
              ) : (
                <div>Carregando dados...</div>
              )}
            </fieldset>
          </div>
        </div>
        <div className="novo-endereco">
          <Button variant="contained" onClick={handleEnderecoClick}>ABRIR GERENCIADOR DE ENDEREÇOS</Button>
        </div>
        <div className="container-fechar-pedido">
          <div className="container-forma-pagamento">
            
            <fieldset className="forma-pagamento">
              <legend>Forma de pagamento</legend>
              {formasPagamento.map(f => (
                <div className="div-forma-pagamento" key={f.valor}>
                  <Radio
                    checked={f.valor === (pagamento || '')}
                    onChange={() => handlePaymentChange(f.valor)}
                    sx={{
                      color: "#888", // Cor quando não está selecionado
                      '&.Mui-checked': {
                        color: "#9088ba", // Cor quando está selecionado
                      },
                    }}
                  />
                  <label htmlFor={f.valor}>{f.texto}</label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        <div className="container-botao">
          <div className="button">
            <Botao
              label="Finalizar Compra"
              onClick={finalizarCompra}
            />
          </div>
        </div>
      </div>

      <EnderecoModal
        aberto={isModalOpen}
        onFechar={handleCloseModal}
        onSalvar={handleSaveAddress}
      />
    </>
  );
};

export default FecharPedido;
