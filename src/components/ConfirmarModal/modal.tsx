import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC, ReactNode } from "react";
import './modal.css'

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
        <Button className="login-linha button" variant="contained" onClick={onCancelar}>Cancelar</Button>
        <Button className="login-linha button" variant="contained" onClick={onConfirmar}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  </>
};

export default ConfirmarModal;