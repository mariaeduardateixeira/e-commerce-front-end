import { FC } from "react";
import "./slider.css"
import imagemAnel from "./imagemAnel.png";
import Botao from "../Botao/botao";
import { IProduto } from "./types";
import image from "./image.jpg";


export default function Slider(props) {
  <div className="image">
  <img src= {image} alt="" />
</div>
  // const [produtos, setProdutos] = useState<IProduto[]>([]);
  // const carregarProdutos = async () =>{
  //   const response = await apiGet("/produtos/");
  //   if(response.status === STATUS_CODE.OK){
  //     console.log(response);
  //     setProdutos(response.data);
  //   }
  // }

  // useEffect(() => {
  //   carregarProdutos();
  // }, [])


  // const redirecionarDetalhesProduto = (idProduto : number) => {
  //   if(idProduto){
  //     window.location.href = `/produtos/detalhes/${idProduto}`;
  //   }
  // }
  return (
      <div className="card">
        <img className="
        product--image" src={props.url} alt="" />
        <h2>{props.name}</h2>
        <p className="price">{props.price}</p>
        <p>
          {props.description}
        </p>
        <Botao
                label = "Comprar"
                // onClick = {() => {
                //   redirecionarDetalhesProduto(produto.id);
                // }}
              />
      </div>
  );
}
