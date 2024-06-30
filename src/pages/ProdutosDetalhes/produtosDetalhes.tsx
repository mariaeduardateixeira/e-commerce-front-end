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
import { Label } from "@mui/icons-material";

const ProdutosDetalhes: FC = () =>{
  const { id } = useParams(); //estudar sobre hook e useParams
  const [produto, setProduto] = useState<IProdutoDetalhe>(); //states
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const carrinho: ICarrinhoStore[] = carregarCarrinho();
  const [emEstoque, setEmEstoque] = useState<boolean>(true);

  console.log(id);
  useEffect(() => {
    console.log(id);
    apiGet(`/produtos/${id}`).then((response) => {
      if(response.status === STATUS_CODE.OK){
        console.log(">>>", response.data);
        setProduto(response.data);

        const carrinhoItem = carrinho.find((c: ICarrinhoStore) => c.id == response.data.id)

        if(carrinhoItem){
          setQuantidadeProduto(carrinhoItem.quantidade);
        }
        setEmEstoque(response.data.quantidade > 0);
      }
    });
     }, []);

    //  const validacaoEstoque = () => {
    //   if (produto && produto.quantidade === 0) {
    //     alert("Não tem estoque");
    //     return false;
    //   }
    //   return true;
    // };

    const handleCompra = () => {
      if (emEstoque && produto) {
        setOpenModal(true);
      }
    };

  return<>
    <div className="container-produto">
      <div className="produto-detalhe">
        { <div className="imagem-produto">
          <img src={produto?.imagemGrande} />
        </div> }
        <div className="dados-produto">
          { <div className="nome-produto">{produto?.nome}</div> }
          <hr />
          <div className="descricao-produto">{produto?.descricao}</div>
          {/* <div className="codigo-produto">{`Código do produto: ${produto?.codigoProduto}`}</div> */}
          <div className="preco-produto">
            <div className="preco">{`Preço: R$ ${produto?.preco}`}</div>
          </div>
          
            <div className="input-quantidade">
              <InputQuantidade
                quantidade={quantidadeProduto}
                onChange={(quantidade:number) => {
                setQuantidadeProduto(quantidade);
              }}
              />
            </div>
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
            style={{ backgroundColor: 'gray', cursor: 'not-allowed' }}
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
         if(produto){
           const carrinhoItem: ICarrinhoStore = {...produto,       quantidade: quantidadeProduto || 0}

           addCarrinho(carrinhoItem);
           window.location.href="/home";
         }
         setOpenModal(false);
      }}
    />
  </>
}

export default ProdutosDetalhes;