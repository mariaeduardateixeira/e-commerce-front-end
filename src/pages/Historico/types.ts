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
  status: string | null;
  formaPagamento: string;
  clienteId: number;
  enderecoId: number;
  valorTotal: number | null;
  carrinho: {
    id: number;
    clienteId: number;
    quantidadeProdutos: number;
    valorTotal: number;
    produtos: {
      produto: {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
        quantidade: number;
        imagemPequena: string;
        imagemGrande: string;
        categoria: string;
      };
      quantidade: number;
    }[];
  };
}

