import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC, ReactNode } from "react";

interface ConfirmarModalProperties{
  openMensagem: boolean,
  titulo: ReactNode,
  mensagem: ReactNode,
  onConfirmar: () => void,
  onCancelar: () => void,
}

const ConfirmarModal: FC <ConfirmarModalProperties> = ({
  openMensagem,
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
}) =>{
  return <>
    <Dialog open={openMensagem}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>{mensagem}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancelar}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirmar}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  </>
};

export default ConfirmarModal;