import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import "./produtosDetalhes.css";
import { IProdutoDetalhe } from "./types";
import Botao from "../../components/Botao/botao";
import InputQuantidade from "../../components/InputQuantidade/input";
import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import { addCarrinho } from "../../store/CarrinhoStore/carrinhoStore";

const ProdutosDetalhes: FC = () =>{
  const { codigoProduto } = useParams(); //estudar sobre hook e useParams
  const [produto, setProduto] = useState<IProdutoDetalhe>(); //states
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0)
  useEffect(() => {
    console.log(codigoProduto);
    apiGet(`/produtos/${codigoProduto}`).then((response) => {
      if(response.status === STATUS_CODE.OK){
        console.log(">>>", response.data);
        setProduto(response.data);
      }
    });
   

  }, []);
  return<>
    <div className="container-produto">
      <div className="produto-detalhe">
        <div className="imagem-produto">
          <img src={produto?.imagemGrande} />
        </div>
        <div className="dados-produto">
          <div className="nome-produto">{produto?.nome}</div>
          <hr />
          <div className="descricao-produto">{produto?.descricao}</div>
          <div className="codigo-produto">{`Código do produto: ${produto?.codigoProduto}`}</div>
          <div className="preco-produto">
            <div className="preco">{`Preço: R$ ${produto?.preco}`}</div>
          </div>
          <div className="botao-produto">
            <InputQuantidade 
              quantidade={quantidadeProduto} 
              onChange={(quantidade:number) => {
              setQuantidadeProduto(quantidade);
            }}
            />
            <Botao
              label="Adicionar"
              onClick={() => {
                if(produto){
                  const carrinhoItem: ICarrinhoStore = {...produto,       quantidade: quantidadeProduto || 0}

                  addCarrinho(carrinhoItem);
                }
            }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default ProdutosDetalhes;