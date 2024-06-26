// import { FC, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { STATUS_CODE, apiGet } from "../../api/RestClient";
// import "./produtosDetalhes.css";
// import { IProdutoDetalhe } from "./types";
// import Botao from "../../components/Botao/botao";
// import InputQuantidade from "../../components/InputQuantidade/input";
// import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
// import { addCarrinho, carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
// import ConfirmarModal from "../../components/ConfirmarModal/modal";
// import { Label } from "@mui/icons-material";

// const ProdutosDetalhes: FC = () =>{
//   const { id } = useParams(); //estudar sobre hook e useParams
//   const [produto, setProduto] = useState<IProdutoDetalhe>(); //states
//   const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1)
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const carrinho: ICarrinhoStore[] = carregarCarrinho();
//   const [valida, setValida] = useState<IProdutoDetalhe>();

//   console.log(id);
//   useEffect(() => {
//     console.log(id);
//     apiGet(`/produtos/${id}`).then((response) => {
//       if(response.status === STATUS_CODE.OK){
//         console.log(">>>", response.data);
//         setProduto(response.data);

//         const carrinhoItem = carrinho.find((c: ICarrinhoStore) => c.id == response.data.id)

//         if(carrinhoItem){
//           setQuantidadeProduto(carrinhoItem.quantidade);
//         }
//       }
//     });
//      }, []);

//      const validacaoEstoque = () => {
//       if (produto && produto.quantidade === 0) {
//         alert("Não tem estoque");
//         return false;
//       }
//       return true;
//     };

//   return<>
//     <div className="container-produto">
//       <div className="produto-detalhe">
//         { <div className="imagem-produto">
//           <img src={produto?.imagemGrande} />
//         </div> }
//         <div className="dados-produto">
//           { <div className="nome-produto">{produto?.nome}</div> }
//           <hr />
//           <div className="descricao-produto">{produto?.descricao}</div>
//           {/* <div className="codigo-produto">{`Código do produto: ${produto?.codigoProduto}`}</div> */}
//           <div className="preco-produto">
//             <div className="preco">{`Preço: R$ ${produto?.preco}`}</div>
//           </div>
          
//             <div className="input-quantidade">
//               <InputQuantidade
//                 quantidade={quantidadeProduto}
//                 onChange={(quantidade:number) => {
//                 setQuantidadeProduto(quantidade);
//               }}
//               />
//             </div>
//             <div className="botao-produto">
//             <Botao
//               label="Adicionar"
//               onClick={() => {
//                 if (validacaoEstoque()===false) {
//                   <Botao
//                     label="Sem estoque"
//                     onClick={() =>{
                      
//                     }}
//                   />
//                 }else{
//                   setOpenModal(true);
//                 }
               
//             }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <ConfirmarModal 
//       openMensagem={openModal}
//       titulo="Adicionar no carrinho"
//       mensagem="Confirma adição do produto no carrinho?"
//       onCancelar={() => {
//         setOpenModal(false);

//       }}
//       onConfirmar={() => {
//          if(produto){
//            const carrinhoItem: ICarrinhoStore = {...produto,       quantidade: quantidadeProduto || 0}

//            addCarrinho(carrinhoItem);
//            window.location.href="/home";
//          }
//          setOpenModal(false);
//       }}
//     />
//   </>
// }

// export default ProdutosDetalhes;
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import "./produtosDetalhes.css";
import { IProdutoDetalhe } from "./types";
import Botao from "../../components/Botao/botao";
import InputQuantidade from "../../components/InputQuantidade/input";
import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import { addCarrinho, carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import ConfirmarModal from "../../components/ConfirmarModal/modal";

const ProdutosDetalhes: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<IProdutoDetalhe>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const carrinho: ICarrinhoStore[] = carregarCarrinho();
  const [emEstoque, setEmEstoque] = useState<boolean>(true);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(1);
  const [atingiuMaximoEstoque, setAtingiuMaximoEstoque] = useState<boolean>(false);

  useEffect(() => {
    apiGet(`/produtos/${id}`).then((response) => {
      if (response.status === STATUS_CODE.OK) {
        setProduto(response.data);

        const carrinhoItem = carrinho.find((c: ICarrinhoStore) => c.id == response.data.id);

        if (carrinhoItem) {
          setQuantidadeProduto(carrinhoItem.quantidade);
        }
        setEmEstoque(response.data.quantidade > 0);
      }
    });
  }, [id]);

  const handleQuantidadeChange = (quantidade: number) => {
    if (produto && quantidade <= produto.quantidade) {
      setQuantidadeSelecionada(quantidade);
      setQuantidadeProduto(quantidade);
      setAtingiuMaximoEstoque(quantidade === produto.quantidade);
    } else {
      alert("Estoque insuficiente para a quantidade solicitada");
      return;
    }
  };

  const handleCompra = () => {
    if (produto && quantidadeSelecionada <= produto.quantidade) {
      setOpenModal(true);
    } else {
      alert("Estoque insuficiente para a quantidade solicitada");
    }
  };

  return (
    <div className="container-produto">
      <div className="produto-detalhe">
        <div className="imagem-produto">
          <img src={produto?.imagemGrande} alt="Imagem do produto" />
        </div>
        <div className="dados-produto">
          <div className="nome-produto">{produto?.nome}</div>
          <hr />
          <div className="descricao-produto">{produto?.descricao}</div>
          <div className="preco-produto">
            <div className="preco">{`Preço: R$ ${produto?.preco}`}</div>
          </div>
          <p>Quantidade disponível: {produto?.quantidade}</p>
            {atingiuMaximoEstoque && <p>Você selecionou todo o estoque disponível deste produto.</p>}
          <div className="input-quantidade">
            <InputQuantidade
              quantidade={quantidadeProduto}
              onChange={(quantidade: number) => {
                handleQuantidadeChange(quantidade);
              }}
            />
            <div className="botao-produto">
              {emEstoque ? (
                <Botao
                  label="Adicionar"
                  onClick={handleCompra}
                />
              ) : (
                <Botao
                  label="Sem estoque"
                  onClick={() => {}}
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  disabled
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmarModal
        openMensagem={openModal}
        titulo="Adicionar no carrinho"
        mensagem="Confirma adição do produto no carrinho?"
        onCancelar={() => {
          setOpenModal(false);
        }}
        onConfirmar={() => {
          if (produto) {
            const carrinhoItem: ICarrinhoStore = { ...produto, quantidade: quantidadeProduto || 0 , estoque:produto.quantidade};
            addCarrinho(carrinhoItem);
            window.location.href = "/home";
          }
          setOpenModal(false);
        }}
      />
    </div>
  );
};

export default ProdutosDetalhes;
