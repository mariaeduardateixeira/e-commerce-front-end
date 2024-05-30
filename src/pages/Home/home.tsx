import { FC, useEffect, useState } from "react";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { IProduto } from "./types";
import "./home.css"
import Botao from "../../components/Botao/botao";
import productData, { responsive } from "../../data";
import Carousel from "react-multi-carousel";
import Slider from "../../components/slider/slider";



const product = productData.map(item => (
  <Slider 
  name={item.name} 
  url={item.imageurl} 
  price={item.price} 
  description={item.description}/>
))

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
  
    <>
    
    {produtos.length && <>
      <h1 className='card-lancamentos'>Lançamentos</h1><Carousel responsive={responsive}>
        {produtos.map(item => (
            <Slider 
              name={item.nome} 
              url={item.imagemPequena} 
              price={item.preco} 
              description={item.descricao}/>
          ))}
    </Carousel>
    </>}
    <h1 className='card-lancamentos'>Destaques</h1><Carousel responsive={responsive}>
        {product}
    </Carousel>
  </>

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