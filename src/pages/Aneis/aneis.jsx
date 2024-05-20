import { FC } from "react";
import "./aneis.css" 
import imagemAnel from "./imagemAnel.png"


export default function Aneis(propss) {
  return (
      <div className="cardProdutos">
        <div className="cardProduct">
          <img className="
          product--image" src={propss.imagemAnel} alt="" />
          <h2>{propss.nome}</h2>
          <p className="price">{propss.preco}</p>
          <p>
            {propss.descricao}
          </p>
          <p>
            <button>Ver mais</button>
          </p>
        </div>
      </div>
  );
}
