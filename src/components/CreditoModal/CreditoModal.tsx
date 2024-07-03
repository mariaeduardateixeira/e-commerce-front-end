import React, { ChangeEvent, FC, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import { CreditoModalProps } from './types';

const CreditoModal: FC<CreditoModalProps> = ({ open, onClose, clienteId }) => {
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeTitular, setNomeTitular] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [mesValidade, setMesValidade] = useState('');
  const [anoValidade, setAnoValidade] = useState('');
  const [cvv, setCvv] = useState('');

  

  const formatarNumeroCartao = (value: string) => {
    const apenasDigitos = value.replace(/\D/g, '');
    const digitosLimitados = apenasDigitos.substring(0, 16);
    return digitosLimitados.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleNumeroCartaoChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const valorFormatado = formatarNumeroCartao(event.target.value);
    setNumeroCartao(valorFormatado);
  };

  const dataValidadeCompleta = `${mesValidade.padStart(2, '0')}/${anoValidade}`;

  const handleSubmit = async (): Promise<void> => {
    if(!clienteId){
      console.error('ID do cliente não fornecido');
      return;
    }
    const dadosCartao = {
      numero: numeroCartao.replace(/\s/g, ''),
      titular: nomeTitular,
      dataValidade: dataValidadeCompleta,
      cvv,
      clienteId: clienteId,
    };

    const response = await apiPost('/cartoes/cadastrar', dadosCartao);

    if (response.status === STATUS_CODE.OK || response.status === STATUS_CODE.CREATED) {
      console.log('Cartão cadastrado com sucesso:', response.data);
      localStorage.setItem('cartaoId', response.data.id);
      onClose(); // Fecha o modal
    } else {
      console.error('Falha ao cadastrar cartão:', response.message);
    }
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
        <Grid container spacing={2}>
          <Grid item xs ={6}>
            <FormControl fullWidth>
              <InputLabel id="mes-validade-label">Mês de Validade</InputLabel>
              <Select
                labelId='mes-validade=label'
                value={mesValidade}
                onChange={(e) => setMesValidade(e.target.value)}
                label="Mês de Validade"
              >
                {[...Array(12)].map((_, index) => {
      const mes = (index + 1).toString().padStart(2, '0'); // Adiciona um zero se necessário
      return (
        <MenuItem key={index} value={mes}>
          {mes}
        </MenuItem>
      );
    })}
              </Select>
            </FormControl>
          </Grid>


        <Grid item xs={6}>      
            <FormControl fullWidth>
              <InputLabel id="ano-validade-label">Ano de Validade</InputLabel>
              <Select
                labelId="ano-validade-label"
                value={anoValidade}
                onChange={(e) => setAnoValidade(e.target.value)}
                label="Ano de Validade"
              >
                {[...Array(10)].map((_, index) => {
                  const anoCompleto = new Date().getFullYear() + index;
                  const doisUltimosDigitos = anoCompleto.toString().substr(-2);
                  return(
                  <MenuItem key={index} value={doisUltimosDigitos}>
                    {doisUltimosDigitos}
                  </MenuItem>); 
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <TextField
          label="CVV"
          type='password'
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{maxLength: 3}}
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
