import { FC } from "react";
import "./input.css";
import { Box, IconButton, TextField } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

interface InputQuantidadeProperties{
  quantidade: number,
  onChange: (quantidade: number) => void;
}

const InputQuantidade: FC <InputQuantidadeProperties>= ({
  quantidade,
  onChange
}) => {
  return<>
    <div className="div-input-quantidade">
      <Box className="box">
        <IconButton 
        className="remover-quantidade" 
        size="small" 
        onClick={(event) => { //valida se a váriavel não está indefinida, se estiver sai fora do if
            const qtde = quantidade - 1;
            if(qtde){
              onChange(qtde);
            }
        }}>

          <Remove/>
        </IconButton>
        <TextField 
          className="input-quantidade"
          margin="normal"
          type="number"
          size="small"
          value={quantidade}
          onChange={(event => {
            const quantidade = Number(event.target.value);

            if(quantidade){
              onChange(quantidade);
            }
          })}
        />
      <IconButton 
        className="add-quantidade"
        size="small"
        onClick={(event) => {
          const qtde = quantidade + 1;
          console.log(qtde);
            if(qtde){
              onChange(qtde);
            }
        }}>
          <Add />
      </IconButton>
      </Box>
    </div>
  </>
}

export default InputQuantidade;