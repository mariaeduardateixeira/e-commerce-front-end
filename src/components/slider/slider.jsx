import { FC } from "react";
import "./slider.css";
import Botao from "../Botao/botao";
import { IProduto } from "./types";
import image from "./image.jpg";

export default function Slider(props) {

  const redirecionarDetalhesProduto = (idProduto) => {
    if (idProduto) {
      window.location.href = `/produtos/${idProduto}`;
    }
  }

  return (
    <div className="card">
      <img className="product--image" src={props.url} alt="" />
      <h2>{props.name}</h2> {/* Exibindo o nome do produto */}
      <p className="price">R$ {props.price}</p>
      {/* <p>{props.description}</p> */}
      <Botao
        label="Comprar"
        onClick={() => {
          redirecionarDetalhesProduto(props.id);
        }}
      />
    </div>
  );
}
