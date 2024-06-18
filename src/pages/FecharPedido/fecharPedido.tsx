import { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import { IEndereco } from "./types";
import "./fecharPedido.css";
import Botao from "../../components/Botao/botao";

const FecharPedido: FC = () => {
  const { id } = useParams<{ id: string }>(); // Certifique-se de que id seja do tipo string
  const [endereco, setEndereco] = useState<IEndereco[]>([]);
  const [clienteStore, setClienteStore] = useState<any>()

  const carregarEndereco = async () => {
    console.log("entrou");
    const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
    try {
      if (!cliente?.id) {
        console.log("ID não definido");
        return;
      }

      const clienteId = parseInt(cliente.id); // Converte o id para número inteiro, se necessário
      const response = await apiGet(`/enderecos/carregarEnderecoByCliente/${clienteId}`);
      
      if (response.status === STATUS_CODE.OK) {
        console.log("Dados de endereço carregados com sucesso:", response.data);
        if (response.data && response.data.length > 0) {
          setEndereco(response.data);
        } else {
          console.log("Nenhum endereço encontrado");
        }
      } else {
        console.error("Erro ao carregar endereços, status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao carregar endereço:", error);
    }
  };

  useEffect(() => {
      carregarEndereco();
    
  }, []);

  useEffect(() => {
    console.log("Estado de endereco atualizado:", endereco);
  }, [endereco]);

  return (
    <>
      {endereco.length > 0 ? (
        endereco.map((endereco: IEndereco) => (
          <div className="container-fechar-pedido" key={endereco.id}>
            <fieldset className="endereco">
              <legend>Endereço de entrega</legend>
              <div>
                <input type="checkbox" id="endereco" name="endereco" />
                <label htmlFor="endereco">Enviar no meu endereço atual</label>
                <p>{endereco.rua}, {endereco.bairro}, {endereco.cidade}, {endereco.estado}</p>
              </div>
              <hr />
              <div className="novo-endereco">
                <p>
                  <a href="/novoEndereco">Adicionar novo endereço</a>
                
                </p>
              </div>
            </fieldset>
            <fieldset className="forma-pagamento">
              <legend>Forma de pagamento</legend>
              <div>
                <input type="checkbox" id="pix" name="pix" />
                <label htmlFor="pix">Pix</label>
              </div>
              <div>
                <input type="checkbox" id="debito" name="debito" />
                <label htmlFor="debito">Débito</label>
              </div>
              <div>
                <input type="checkbox" id="credito" name="credito" />
                <label htmlFor="credito">Crédito</label>
              </div>
            </fieldset>
          </div>
        ))
      ) : (
        <div>Carregando dados...</div>
      )}
    </>
  );
};

export default FecharPedido;
