import { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { apiGet, apiPost, STATUS_CODE } from "../../api/RestClient";
import { IEndereco } from "./types";
import "./fecharPedido.css";
import EnderecoModal from "../../components/EnderecoModal/EnderecoModal";
import { Button } from "@mui/material";

const FecharPedido: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
  const [clienteStore, setClienteStore] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
    if (cliente?.id) {
      setClienteStore(cliente);
    } else {
      console.log("Cliente não autenticado ou ID não definido");
    }
  }, []);

  useEffect(() => {
    if (clienteStore?.id) {
      carregarEnderecos();
    }
  }, [clienteStore]);

  const carregarEnderecos = async () => {
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

  return (
    <>
      <div className="div-central-fieldset">
        <fieldset className="fieldset">
          <legend>Endereço de entrega</legend>
          {enderecos.length > 0 ? (
            enderecos.map((endereco: IEndereco) => (
              <div className="container-fechar-pedido" key={endereco.id}>
                <fieldset className="endereco">
                  <div>
                    <input type="checkbox" id="endereco" name="endereco" />
                    <p>{endereco.rua}, {endereco.bairro}, {endereco.cidade}, {endereco.estado}</p>
                  </div>
                </fieldset>
        
              </div>
            ) )
          ) : (
            <div>Carregando dados...</div>
          )}
        </fieldset>
      </div>
      <div className="novo-endereco">
                <Button variant="contained" onClick={handleOpenModal}>Adicionar novo endereço</Button>
              </div>
     <div className="container-fechar-pedido">
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
      <EnderecoModal
        aberto={isModalOpen}
        onFechar={handleCloseModal}
        onSalvar={handleSaveAddress}
      />
    </>
  );
};

export default FecharPedido;
