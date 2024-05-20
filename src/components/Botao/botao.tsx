import { FC } from "react";
import "./botao.css"
//import ProdutosDetalhes from "../../pages/ProdutosDetalhes/produtosDetalhes";


interface BotaoProperties{
  label: string;
  onClick: () => void;
}
const Botao: FC <BotaoProperties> = ({
  label,
  onClick
}) => {
  return <>
    <div className="container-botao">
        <button onClick={onClick}>
           {label}
        </button>
    </div>
  
  </>
}

export default Botao;