import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";

interface InputSelectProperties{
    lista: any[],
    valor: any,
    onChange: (valor: any) => void,
    label: string,
}
const InputSelect : FC<InputSelectProperties> = ({
    lista,
    valor,
    onChange,
    label
}) => {
  return <>
    <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
      <Select 
        label={label}
        value={valor}
        onChange={(evento) => {
          if(evento){
            onChange(evento.target.value);
          }
        }}>
        {lista.map((list : any) => (
          <MenuItem 
          value={list.valor}
          key={list.valor}>
          {list.texto}
        </MenuItem>
        ))}

      </Select>

    </FormControl>
  </>
}

export default InputSelect;