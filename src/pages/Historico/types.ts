// types.ts
export interface IProduto {
  id: number;
  nome: string;
  imagem: string;
  quantidade: number;
  valorUnitario: number;
}

export interface IPedido {
  id: number;
  status: string;
  valorTotal: number;
  produtos: IProduto[];
}
