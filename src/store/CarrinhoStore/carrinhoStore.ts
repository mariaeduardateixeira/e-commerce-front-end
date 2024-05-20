import { ICarrinhoStore } from "./type";

const CARRINHO_STORE = "Carrinho"

export const addCarrinho = (item: ICarrinhoStore) => {
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
}

export const carregarCarrinho = (): ICarrinhoStore[] => {
  const carrinho: ICarrinhoStore[] = JSON.parse(localStorage.getItem(CARRINHO_STORE) || "[]");

  return carrinho;
}
const addCarrinhoStore = (carrinho: ICarrinhoStore[]) => {
  localStorage.setItem(CARRINHO_STORE, JSON.stringify(carrinho));

  //stringfy transforma o objeto numa string


}