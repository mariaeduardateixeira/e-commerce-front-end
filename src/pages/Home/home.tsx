import { FC, useEffect, useState } from "react";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { IProduto } from "./types";
import "./home.css"
import Botao from "../../components/Botao/botao";
import productData from "../../data";


const Home: FC = () =>{
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const carregarProdutos = async () =>{
    const response = await apiGet("/produtos/");
    if(response.status === STATUS_CODE.OK){
      console.log(response);
      setProdutos(response.data);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, [])

  const redirecionarDetalhesProduto = (idProduto : number) => {
    if(idProduto){
      window.location.href = `/produtos/detalhes/${idProduto}`;
    }
  }

  return <>
  {produtos?.length ? <>
    <div className="container">
      {produtos.map((produto: IProduto) =>{
        return<>
          <div className="produto">
            <a className="produto_imagem" href={`/produtos/detalhes/${produto.id}`}>
              <img src={produto.imagemPequena} alt="" />
              </a>
          <div className="produto_nome">
            <p>{produto.nome}</p>
          </div>
          <div className="produto_preco">
            <p>{produto.preco}</p>
          </div>
              <Botao
                label = "Comprar"
                onClick = {() => {
                  redirecionarDetalhesProduto(produto.id);
                }}
              />
          </div>
       </>
      })}
      
      </div> 
  </> : <div>Lista de dados</div>}

  </>
}

export default Home;