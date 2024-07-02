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
    <div>
      <h1>Pedido concluído com sucesso!</h1>
      <h2>Últimos pedidos</h2>
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
      )}
    </div>
  );
};

export default ConfirmarPedido;
