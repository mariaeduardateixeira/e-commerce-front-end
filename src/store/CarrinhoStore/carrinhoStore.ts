import { ICarrinhoStore } from "./type";

const CARRINHO_STORE = "Carrinho"

export const addCarrinho = (item: ICarrinhoStore): ICarrinhoStore[] => {
  const carrinho: ICarrinhoStore[] = carregarCarrinho();

  if(carrinho && carrinho.length){
    const index = carrinho.findIndex((c:ICarrinhoStore) => c.id === item.id);
    //(c:ICarrinhoStore) ----> tipo um for que percorre os id do ICarrinhoStore
    //se o id do c for igual o id do item ----> positivo(+1), senão ----> negativo (-1)
    if(index > -1) {
      carrinho[index] = item;
    }else{
      carrinho.push(item);
    }
  }else{
    carrinho.push(item);
  }
  addCarrinhoStore(carrinho);

  return carrinho;
}

export const carregarCarrinho = (): ICarrinhoStore[] => {
  const carrinho: ICarrinhoStore[] = JSON.parse(localStorage.getItem(CARRINHO_STORE) || "[]");

  return carrinho;
}
const addCarrinhoStore = (carrinho: ICarrinhoStore[]) => {
  localStorage.setItem(CARRINHO_STORE, JSON.stringify(carrinho));

  //stringfy transforma o objeto numa string
}

export const obterQuantidadeCarrinho = (): number => {
  const carrinho: ICarrinhoStore[] =  carregarCarrinho();

  return carrinho.length;
}

export const removerItemCarrinho = (id: number): ICarrinhoStore[] => {
  const carrinho = carregarCarrinho()

  const indexCarrinho = carrinho.findIndex((c:ICarrinhoStore) => c.id === id);
  if(indexCarrinho > -1){
    carrinho.splice(indexCarrinho,1);
  }

    addCarrinhoStore(carrinho);
    return carrinho;
}