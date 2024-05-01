import { FC } from "react";
import "./menuBar.css"

const MenuBar: FC = () => {
  return <>
    <div className="menu">
      <h1>Nome da loja</h1>
      <div className="teste">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/aneis">Anéis</a></li>
          <li><a href="/brincos">Brincos</a></li>
          <li><a href="/pulseiras">Pulseiras</a></li>
          <li><a href="/correntes">Correntes</a></li>
        </ul>
          <input type="text" placeholder="Digite o que você procura"/>
      </div>
    </div>
  </>
}

export default MenuBar;