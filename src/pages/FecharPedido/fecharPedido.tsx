import { TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./fecharPedido.css";
import Botao from "../../components/Botao/botao";
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import { IEndereco } from "./types";
import { useParams } from 'react-router-dom';

const FecharPedido: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [endereco, setEndereco] = useState<IEndereco[]>([]);

  const carregarEndereco = async () => {
    try {
      const response = await apiGet(`/carregarEnderecoByCliente/${id}`);
      if (response.status === STATUS_CODE.OK) {
        console.log(response);
        setEndereco(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar endereço:", error);
    }
  };

  useEffect(() => {
    carregarEndereco();
  }, []);

  return (
    <>
      {endereco?.length ? (
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
        <div>Lista de dados</div>
      )}
    </>
  );
};

export default FecharPedido;
