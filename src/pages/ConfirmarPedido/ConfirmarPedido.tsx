// import React, { useState, useEffect } from 'react';
// import { apiGet, STATUS_CODE } from '../../api/RestClient';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import { IPedido } from '../Historico/types';

// interface ModalUltimosPedidosProps {
//   open: boolean;
//   onClose: () => void;
//   clienteId: number;
// }

// const ModalUltimosPedidos: React.FC<ModalUltimosPedidosProps> = ({ open, onClose, clienteId }) => {
//   const [pedidos, setPedidos] = useState<IPedido[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (open) {
//       setLoading(true);
//       apiGet(`/pedidos/ultimos/${clienteId}`)
//         .then(response => {
//           if (response.status === STATUS_CODE.OK) {
//             setPedidos(response.data);
//           } else {
//             console.error('Erro ao buscar os pedidos:', response.status);
//           }
//         })
//         .catch(error => {
//           console.error('Erro na requisição:', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [open, clienteId]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Últimos Pedidos</DialogTitle>
//       <DialogContent>
//         {loading ? (
//           <p>Carregando...</p>
//         ) : (
//           <>
//             {pedidos.length > 0 ? (
//               <ul>
//                 {pedidos.map(pedido => (
//                   <li key={pedido.id} style={{ marginBottom: '1rem' }}>
//                     <div>
//                       <strong>Pedido #{pedido.id}</strong>
//                     </div>
//                     <div>Status: {pedido.status || 'Não disponível'}</div>
//                     <div>Forma de Pagamento: {pedido.formaPagamento}</div>
//                     <div>Valor Total: {pedido.valorTotal ? `R$${pedido.valorTotal.toFixed(2)}` : 'Não disponível'}</div>
//                     <div>Produtos:</div>
//                     <ul>
//                       {pedido.carrinho.produtos.map(produto => (
//                         <li key={produto.produto.id}>
//                           <div>{produto.produto.nome}</div>
//                           <div>Descrição: {produto.produto.descricao}</div>
//                           <div>Preço Unitário: R${produto.produto.preco.toFixed(2)}</div>
//                           <div>Quantidade: {produto.quantidade}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Não há pedidos para exibir.</p>
//             )}
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">Fechar</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ModalUltimosPedidos;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './confirmarPedido.css'; // Importe o CSS aqui

const ConfirmarPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const clienteId = JSON.parse(localStorage.getItem('authenticatedUser') || '{}').id;

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`/api/pedidos/ultimos/${clienteId}`);
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, [clienteId]);

  return (
    <div className="confirmar-pedido">
      <h1>Pedido concluído com sucesso!</h1>
      <h2>Realize o pagamento em até 25 minutos ou o pedido será cancelado.</h2>
      <img src="caminho/para/imagem.jpg" alt="Pagamento" className="imagem-pagamento" />
      {/* <h2>Últimos pedidos</h2>
      {pedidos.length > 0 ? (
        <ul>
          {pedidos.map((pedido: any) => (
            <li key={pedido.id}>
              Pedido #{pedido.id}, Total: R$ {pedido.total}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )} */}
    </div>
  );
};

export default ConfirmarPedido;
