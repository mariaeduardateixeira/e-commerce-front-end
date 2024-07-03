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
    </div>
  );
};

export default ConfirmarPedido;
