import React, { useState, useEffect } from 'react';
import { apiGet, STATUS_CODE } from '../../api/RestClient';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IPedido } from '../Historico/types';

interface ModalUltimosPedidosProps {
  open: boolean;
  onClose: () => void;
  clienteId: number;
}

const ModalUltimosPedidos: React.FC<ModalUltimosPedidosProps> = ({ open, onClose, clienteId }) => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      apiGet(`/pedidos/ultimos/${clienteId}`)
        .then(response => {
          if (response.status === STATUS_CODE.OK) {
            setPedidos(response.data);
          } else {
            console.error('Erro ao buscar os pedidos:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, clienteId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Últimos Pedidos</DialogTitle>
      <DialogContent>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {pedidos.length > 0 ? (
              <ul>
                {pedidos.map(pedido => (
                  <li key={pedido.id} style={{ marginBottom: '1rem' }}>
                    <div>
                      <strong>Pedido #{pedido.id}</strong>
                    </div>
                    <div>Status: {pedido.status || 'Não disponível'}</div>
                    <div>Forma de Pagamento: {pedido.formaPagamento}</div>
                    <div>Valor Total: {pedido.valorTotal ? `R$${pedido.valorTotal.toFixed(2)}` : 'Não disponível'}</div>
                    <div>Produtos:</div>
                    <ul>
                      {pedido.carrinho.produtos.map(produto => (
                        <li key={produto.produto.id}>
                          <div>{produto.produto.nome}</div>
                          <div>Descrição: {produto.produto.descricao}</div>
                          <div>Preço Unitário: R${produto.produto.preco.toFixed(2)}</div>
                          <div>Quantidade: {produto.quantidade}</div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há pedidos para exibir.</p>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUltimosPedidos;
