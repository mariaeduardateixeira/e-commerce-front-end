import { FC } from "react";
import "./menuBar.css"

const MenuBar: FC = () => {
  return <>
    <div className="menu">
      <div className="teste">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/ANEL">Anéis</a></li>
          <li><a href="/BRINCOS">Brincos</a></li>
          <li><a href="/PULSEIRAS">Pulseiras</a></li>
          <li><a href="/COLARES">Colares</a></li>
        </ul>
          <input type="text" placeholder="Digite o que você procura"/>
      </div>
    </div>
  </>
}

export default MenuBar;