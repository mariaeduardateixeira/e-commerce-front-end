import { FC } from "react";
import "./botao.css"
//import ProdutosDetalhes from "../../pages/ProdutosDetalhes/produtosDetalhes";


interface BotaoProperties{
  label: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
const Botao: FC <BotaoProperties> = ({
  label,
  onClick,
  disabled = false, 
  style
}) => {
  return <>
    <div className="container-botao">
        <button onClick={onClick} disabled={disabled} style={style}>
           {label}
        </button>
    </div>
  
  </>
}

export default Botao;