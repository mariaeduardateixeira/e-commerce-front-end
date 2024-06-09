import { FC, useEffect, useState } from "react";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { IProduto } from "./types";
import "./home.css"
import Botao from "../../components/Botao/botao";
import productData, { produtosImagens, responsive } from "../../data";
import Carousel from "react-multi-carousel";
import Slider from "../../components/slider/slider";


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
      window.location.href = `/produtos/${idProduto}`;
    }
  }
  const half = Math.ceil(produtos.length / 2);
  const primeiraMetade = produtos.slice(0, half);
  const segundaMetade = produtos.slice(half);

  return <>
  
    <>
    
    {produtos.length && <>
      <h1 className='card-lancamentos'>Lançamentos</h1>
      <Carousel responsive={responsive}>
        {primeiraMetade.map(item => (
            <Slider
              id={item.id}
              name={item.nome} 
              url={item.imagemPequena} 
              price={item.preco} 
              description={item.descricao}/>
          ))}
          
    </Carousel>
    </>}
    

    {produtos.length && <>
      <h1 className='card-lancamentos'>Destaques</h1>
      <Carousel responsive={responsive}>
        {segundaMetade.map(item => (
            <Slider
              id={item.id}
              name={item.nome} 
              url={item.imagemPequena} 
              price={item.preco} 
              description={item.descricao}/>
          ))}
    </Carousel>
    
    </>}
    
  </>
  {/* {produtos?.length ? <>
    <div className="container">
      {produtos.map((produto: IProduto) =>{
        //const imagem = produtosImagens.find((img) => img.id === produto.id);
        return<>
          <div className="produto">
            <a className="produto_imagem" href={`/produtos/${produto.id}`}>
              <img src={produto.imagemPequena} alt="" />
              </a>
          <div className="produto_nome">
            <p>{produto.descricao}</p>
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
  </> : <div>Lista de dados</div>} */}

  </>
}

export default Home;