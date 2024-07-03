// ModalUltimosPedidos.tsx
import React, { useState, useEffect } from 'react';
import { apiGet, STATUS_CODE } from '../../api/RestClient';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IPedido } from './types';

interface ModalUltimosPedidosProps {
  open: boolean;
  onClose: () => void;
  clienteId: number;
}

const ModalUltimosPedidos: React.FC<ModalUltimosPedidosProps> = ({ open, onClose, clienteId }) => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  useEffect(() => {
    if (open) {
      apiGet(`/pedidos/ultimos/${clienteId}`).then(response => {
        if (response.status === STATUS_CODE.OK) {
          setPedidos(response.data);
        } else {
          console.error('Erro ao buscar os pedidos:', response.status);
        }
      }).catch(error => {
        console.error('Erro na requisição:', error);
      });
    }
  }, [open, clienteId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Últimos Pedidos</DialogTitle>
      <DialogContent>
        {pedidos.length > 0 ? (
          <ul>
            {pedidos.map(pedido => (
              <li key={pedido.id}>
                Pedido #{pedido.id} - 
                {pedido.status} - 
                {pedido.valorTotal !== undefined && pedido.valorTotal !== null 
                  ? `Total: R$${pedido.valorTotal.toFixed(2)}` : 'Valor Total: Não disponível'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há pedidos para exibir.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUltimosPedidos;
