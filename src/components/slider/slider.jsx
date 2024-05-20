import { FC } from "react";
import "./slider.css"
import imagemAnel from "./imagemAnel.png";


export default function Slider(props) {
  return (
      <div className="card">
        <img className="
        product--image" src={props.url} alt="" />
        <h2>{props.name}</h2>
        <p className="price">{props.price}</p>
        <p>
          {props.description}
        </p>
        <p>
          <button>Ver mais</button>
        </p>
      </div>
  );
}
