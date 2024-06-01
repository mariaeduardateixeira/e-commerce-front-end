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

  return (
      <div className="card">
        <img className="
        product--image" src={props.url} alt="" />
        <h2>{props.description}</h2>
        <p className="price">{props.price}</p>
        {/* <p>
          {props.description}
        </p> */}
        <Botao
                label = "Comprar"
                // onClick = {() => {
                //   redirecionarDetalhesProduto(produto.id);
                // }}
              />
      </div>
  );
}
