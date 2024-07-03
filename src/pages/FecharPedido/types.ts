export interface IEndereco {
  id: number,
  rua: string,
  bairro: string,
  cidade: string,
  estado: string,
}

export interface DadosCartao{
  clienteId: string;
  id: string
  numero: string;
  titular: string;
  dataValidade: String;
}

export const formasPagamento = [
  {
    valor: "BOLETO",
    texto: "Boleto"
  },
  {
    valor: "PIX",
    texto: "Pix"
  },
  {
    valor: "CREDITO",
    texto: "Crédito"
  }
]