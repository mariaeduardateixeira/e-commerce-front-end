import { AlternateEmail, Key, VisibilityOff, Visibility } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FC } from "react";
import "./novoEndereco.css";

const NovoEndereco: FC = () => {
  return<>
    <div className="div-endereco">
      <div className="div-endereco-linha">
        <TextField 
          fullWidth
          label="Rua"
          type="text" 
        />
      </div>
      <div className="div-endereco-linha">
        <TextField 
          fullWidth
          label="Bairro"
          type="text"
        />
      </div>
      <div className="estado-cidade">
        <div className="div-endereco-linha">
          <div className="cidade">
            <TextField
            fullWidth
            label="Cidade"
            type="text"
            />
          </div>
        </div>
        <div className="div-endereco-linha">
          <div className="estado">
            <fieldset>
            <legend>Estado</legend>
            <select className="select">
              <option value="someOption">Acre</option>
              <option value="otherOption">Alagoas</option>
              <option value="someOption">Amapá</option>
              <option value="otherOption">Amazonas</option>
              <option value="someOption">Bahia</option>
              <option value="otherOption">Ceará</option>
              <option value="otherOption">Distrito Federal</option>
              <option value="someOption">Espírito Santo</option>
              <option value="otherOption">Goiás</option>
              <option value="otherOption">Maranhão</option>
              <option value="otherOption">Mato Grosso</option>
              <option value="otherOption">Mato Grosso do Sul</option>
              <option value="otherOption">Minas Gerais</option>
              <option value="otherOption">Pará</option>
              <option value="otherOption">Paraíba</option>
              <option value="otherOption">Paraná</option>
              <option value="otherOption">Pernambuco</option>
              <option value="otherOption">Piauí</option>
              <option value="otherOption">Rio de Janeiro</option>
              <option value="otherOption">Rio Grande do Norte</option>
              <option value="otherOption">Rio Grande do Sul</option>
              <option value="otherOption">Rondônia</option>
              <option value="otherOption">Roraima</option>
              <option value="otherOption">Santa Catarina</option>
              <option value="otherOption">São Paulo</option>
              <option value="otherOption">Sergipe</option>
              <option value="otherOption">Tocantins</option>
            </select>
            </fieldset>
          </div>
        </div>
      </div>
      </div>
  </>
}

export default NovoEndereco;