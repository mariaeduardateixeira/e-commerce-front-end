export interface IEndereco {
  id: number,
  rua: string,
  bairro: string,
  cidade: string,
  estado: string,
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