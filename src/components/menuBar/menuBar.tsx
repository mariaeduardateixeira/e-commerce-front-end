import { FC } from "react";
import "./menuBar.css"

const MenuBar: FC = () => {
  return <>
    <div className="menu">
      <h1>Nome da loja</h1>
      <div className="teste">
        <ul>
          <li><a href="#">Anéis</a></li>
          <li><a href="#">Brincos</a></li>
          <li><a href="#">Pulseiras</a></li>
          <li><a href="#">Correntes</a></li>
        </ul>
          <input type="text" placeholder="Digite o que você procura"/>
      </div>
    </div>
  </>
}

export default MenuBar;