import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ModalErroProps } from './types';

const ModalErro: FC<ModalErroProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Atenção</DialogTitle>
      <DialogContent>
        <p>Parece que você não está logado.</p>
      </DialogContent>
      <DialogActions>
  <Button onClick={onClose}>Fechar</Button>
</DialogActions>
    </Dialog>
  );
};

export default ModalErro;