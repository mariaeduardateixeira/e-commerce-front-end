import { TextField } from "@mui/material";
import { FC } from "react";
import "./fecharPedido.css"
import Botao from "../../components/Botao/botao";

const Compra: FC = () => {
  return<>
    <div className="container-fechar-pedido">
    <fieldset className="endereco">
      <legend>Endereço de entrega</legend>
      <div>
        <input type="checkbox" id="endereco" name="endereco" />
        <label htmlFor="endereco">Enviar no meu endereço atual</label>
      </div>
      <hr />
      <div className="novo-endereco">
          <p><a href="/novoEndereco">Adicionar novo endereço</a></p>
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
  </>
}

export default Compra;