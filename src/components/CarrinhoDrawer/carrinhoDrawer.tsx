// import { Close, Delete, ShoppingCart } from "@mui/icons-material";
// import { FC, useState } from "react";
// import { Badge, IconButton, Box, Button, Drawer, Grid, Typography } from "@mui/material";
// import { addCarrinho, carregarCarrinho, obterQuantidadeCarrinho, removerItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
// import InputQuantidade from "../InputQuantidade/input";
// import Botao from "../Botao/botao";
// import "./carrinhoDrawer.css";
// import { ICarrinhoStore } from "../../store/CarrinhoStore/type";

// const CarrinhoDrawer: FC = () => {
//     const [openDrawer, setOpenDrawer] = useState(false);
//     const [id, setId] = useState<number | null>(null);
//     const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(carregarCarrinho());

//     const atualizarQuantidadeCarrinho = (item: ICarrinhoStore) => {
//         const carrinhoAtualizado = addCarrinho(item);
//         setCarrinho(carrinhoAtualizado);
//     };

//     const removerProdutoCarrinho = (id: number) => {
//         const carrinhoAtualizado = removerItemCarrinho(id);
//         setCarrinho(carrinhoAtualizado);
//     };

//     const redirecionarCarrinho = (id) => {
//         if(id){
//           window.location.href = `/fecharPedido/${id}`;
//         }
//       }

//     const calcularTotal = () => {
//         return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
//     };

//     return (
//         <>
//             <div className="carrinho" onClick={() => setOpenDrawer(true)}>
//                 <Badge
//                     badgeContent={obterQuantidadeCarrinho()}
//                     color="primary"
//                     anchorOrigin={{ vertical: "top", horizontal: "left" }}
//                 >
//                     <ShoppingCart color="action" />
//                 </Badge>
//             </div>
//             <Drawer 
//                 open={openDrawer} 
//                 anchor="right" 
//                 classes={{ paper: "tamanho-paper-drawer" }}
//             >
//                 <Box paddingLeft="10px" paddingRight="10px">
//                     <Button variant="text" startIcon={<Close />} onClick={() => setOpenDrawer(false)}>
//                         Fechar
//                     </Button>
//                 </Box>
//                 <Box paddingLeft="10px" paddingRight="10px">
//                     {!carrinho?.length ? (
//                         <Box>
//                             <Typography variant="body1">
//                                 <strong> Seu carrinho está vazio. </strong>
//                             </Typography>
//                         </Box>
//                     ) : (
//                         carrinho.map((c: ICarrinhoStore) => (
//                             <Grid container key={c.id} alignItems="center">
//                                 <Grid className="box-imagem" item>
//                                     <img className="imagem" src={c.imagemPequena} alt="produto" />
//                                 </Grid>
//                                 <Grid className="box-detalhes" item>
//                                     <Box>
//                                         <strong>{c.descricao}</strong>
//                                     </Box>
//                                 </Grid>
//                                 <Grid className="box-quantidade" item>
//                                     <InputQuantidade 
//                                         quantidade={c.quantidade}
//                                         onChange={(quantidade: number) => {
//                                             const carrinhoAtualizado = { ...c, quantidade };
//                                             atualizarQuantidadeCarrinho(carrinhoAtualizado);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid className="box-preco" item>
//                                     <Box>
//                                         <strong>{((c.quantidade) * (c.preco)).toFixed(2)}</strong>
//                                     </Box>
//                                 </Grid>
//                                 <Grid className="box-remover" item>
//                                     <IconButton onClick={() => removerProdutoCarrinho(c.id)}>
//                                         <Delete color="error" />
//                                     </IconButton>
//                                 </Grid>
//                             </Grid>
//                         ))
//                     )}
//                 </Box>
//                 {carrinho.length > 0 && (
//                     <Box paddingLeft="10px" paddingRight="10px">
//                         <Typography variant="h6">
//                             Total: {calcularTotal().toFixed(2)}
//                         </Typography>
//                         <div className="botao-carrinho">
//                         <Botao
//                             label = "Comprar"
//                     onClick = {() => {
//                    redirecionarCarrinho(id);
//                  }}
//               />
//                         </div>
//                     </Box>
//                 )}
//             </Drawer>
//         </>
//     );
// };

// export default CarrinhoDrawer;

import { FC, useState } from "react";
import { Badge, IconButton, Box, Button, Drawer, Grid, Typography } from "@mui/material";
import { addCarrinho, carregarCarrinho, obterQuantidadeCarrinho, removerItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import InputQuantidade from "../InputQuantidade/input";
import Botao from "../Botao/botao";
import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import { useNavigate } from "react-router-dom";
import "./carrinhoDrawer.css";
import { Close, Delete, ShoppingCart } from "@mui/icons-material";

interface CarrinhoDrawerProps {
  clienteId: number | null;
}

const CarrinhoDrawer: FC<CarrinhoDrawerProps> = ({ clienteId }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(carregarCarrinho());
  const navigate = useNavigate(); // Instância do useNavigate para redirecionamento

  const atualizarQuantidadeCarrinho = (item: ICarrinhoStore) => {
    const carrinhoAtualizado = addCarrinho(item);
    setCarrinho(carrinhoAtualizado);
  };

  const removerProdutoCarrinho = (id: number) => {
    const carrinhoAtualizado = removerItemCarrinho(id);
    setCarrinho(carrinhoAtualizado);
  };

  const redirecionarCarrinho = () => {
    if (clienteId) {
      navigate(`/fecharPedido/${clienteId}`); // Redireciona para a rota com o ID do cliente
    } else {
      alert("Você precisa estar logado para fechar o pedido.");
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  return (
    <>
      <div className="carrinho" onClick={() => setOpenDrawer(true)}>
        <Badge
          badgeContent={obterQuantidadeCarrinho()}
          color="primary"
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <ShoppingCart color="action" />
        </Badge>
      </div>
      <Drawer
        open={openDrawer}
        anchor="right"
        classes={{ paper: "tamanho-paper-drawer" }}
      >
        <Box paddingLeft="10px" paddingRight="10px">
          <Button variant="text" startIcon={<Close />} onClick={() => setOpenDrawer(false)}>
            Fechar
          </Button>
        </Box>
        <Box paddingLeft="10px" paddingRight="10px">
          {!carrinho?.length ? (
            <Box>
              <Typography variant="body1">
                <strong> Seu carrinho está vazio. </strong>
              </Typography>
            </Box>
          ) : (
            carrinho.map((c: ICarrinhoStore) => (
              <Grid container key={c.id} alignItems="center">
                <Grid className="box-imagem" item>
                  <img className="imagem" src={c.imagemPequena} alt="produto" />
                </Grid>
                <Grid className="box-detalhes" item>
                  <Box>
                    <strong>{c.descricao}</strong>
                  </Box>
                </Grid>
                <Grid className="box-quantidade" item>
                  <InputQuantidade
                    quantidade={c.quantidade}
                    onChange={(quantidade: number) => {
                      const carrinhoAtualizado = { ...c, quantidade };
                      atualizarQuantidadeCarrinho(carrinhoAtualizado);
                    }}
                  />
                </Grid>
                <Grid className="box-preco" item>
                  <Box>
                    <strong>{((c.quantidade) * (c.preco)).toFixed(2)}</strong>
                  </Box>
                </Grid>
                <Grid className="box-remover" item>
                  <IconButton onClick={() => removerProdutoCarrinho(c.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          )}
        </Box>
        {carrinho.length > 0 && (
          <Box paddingLeft="10px" paddingRight="10px">
            <Typography variant="h6">
              Total: {calcularTotal().toFixed(2)}
            </Typography>
            <div className="botao-carrinho">
              <Botao
                label="Comprar"
                onClick={redirecionarCarrinho}
              />
            </div>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default CarrinhoDrawer;
