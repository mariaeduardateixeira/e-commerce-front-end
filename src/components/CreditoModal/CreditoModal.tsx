import React, { FC, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { CreditoModalProps } from './types';

const CreditoModal: FC<CreditoModalProps> = ({ open, onClose }) => {
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeTitular, setNomeTitular] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [mesValidade, setMesValidade] = useState('');
  const [anoValidade, setAnoValidade] = useState('');
  const [cvv, setCvv] = useState('');
  
  
  
  const formatarNumeroCartao = (value: string) => {
    const apenasDigitos = value.replace(/\D/g, '');
    const digitosLimitados = apenasDigitos.substring(0,16);
    return digitosLimitados.replace(/(.{4})/g, '$1 ').trim();
  }
 
const handleNumeroCartaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarNumeroCartao(event.target.value);
    setNumeroCartao(valorFormatado);
  };

  const handleSubmit = () => {
    console.log({
      numeroCartao,
      nomeTitular,
      dataValidade,
      cvv
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Informações do Cartão de Crédito</DialogTitle>
      <DialogContent>
        <TextField
          label="Número do Cartão"
          value={numeroCartao}
          onChange={handleNumeroCartaoChange}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 19 }}
        />
        <TextField
          label="Nome do Titular"
          value={nomeTitular}
          onChange={(e) => setNomeTitular(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data de Validade"
          value={dataValidade}
          onChange={(e) => setDataValidade(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreditoModal;
