export interface IEndereco {
    id: number;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    clienteId?: number;
  }
  