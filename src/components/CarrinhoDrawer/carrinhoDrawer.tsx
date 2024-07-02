import { Close, Delete, ShoppingCart } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { Badge, IconButton, Box, Button, Drawer, Grid, Typography } from "@mui/material";
import { addCarrinho, carregarCarrinho, obterQuantidadeCarrinho, removerItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import InputQuantidade from "../InputQuantidade/input";
import Botao from "../Botao/botao";
import "./carrinhoDrawer.css";
import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import { IProdutoDetalhe } from "../../pages/ProdutosDetalhes/types";
import LoginModal from "../Login/LoginModal";

const CarrinhoDrawer: FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(carregarCarrinho());
    const totalCarrinho = JSON.parse(localStorage.getItem("calcularTotal") || "{}");
    const atingiuMaximoEstoqueStorage = JSON.parse(localStorage.getItem("atingiuMaximoEstoque") || "{}");
    const quantidadeProdutoStorage = JSON.parse(localStorage.getItem("quantidadeProduto") || "{}");
    const [emEstoque, setEmEstoque] = useState<boolean>(true);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(1);
    const [atingiuMaximoEstoque, setAtingiuMaximoEstoque] = useState<boolean>(false);
    const [produto, setProduto] = useState<IProdutoDetalhe>();
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


    const atualizarQuantidadeCarrinho = (item: ICarrinhoStore) => {
        const carrinhoAtualizado = addCarrinho(item);
        setCarrinho(carrinhoAtualizado);

        
    };

    
    // const handleQuantidadeChange = (quantidade: number) => {
    //     if (produto && quantidade <= produto.quantidade) {
    //       setQuantidadeSelecionada(quantidade);
    //       setQuantidadeProduto(quantidade);
    //       setAtingiuMaximoEstoque(quantidade === produto.quantidade);
    //     } else {
    //       alert("Estoque insuficiente para a quantidade solicitada");
    //       setQuantidadeProduto(1);
    //     }
    //   };

    const removerProdutoCarrinho = (id: number) => {
        const carrinhoAtualizado = removerItemCarrinho(id);
        setCarrinho(carrinhoAtualizado);
    };

    const calcularTotal = () => {
        return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };
    const handleOpenDrawer = () => {
        const usuarioAutenticado = localStorage.getItem('authenticatedUser');
        if(usuarioAutenticado){
            setOpenDrawer(true)

        }else{
            setIsLoginModalOpen(true);

        }
    };

    const handleFecharPedido = () => {
        const usuarioAutenticado = localStorage.getItem('authenticatedUser');
        if(!usuarioAutenticado){
            setIsLoginModalOpen(true);
        }else{
            window.location.href = '/fecharPedido'
        }
    }
    



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
                onClose={() => setOpenDrawer(false)}  // Adicionando onClose
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
                            <Grid container key={c.id} alignItems="center" className="carrinho-item">
                                <Grid className="box-imagem" item>
                                    <img className="imagem" src={c.imagemPequena} alt="produto" />
                                </Grid>
                                <Grid className="box-detalhes" item>
                                    <Box>
                                        <strong>{c.nome}</strong>
                                    </Box>
                                </Grid>
                                <Grid className="box-quantidade" item>
                                    <InputQuantidade 
                                        quantidade={c.quantidade}
                                        onChange={(quantidade: number) => {
                                            if(c.estoque < quantidade){
                                                alert("ESTOQUE INSUFICIENTE")
                                                return;
                                            }
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
                    <Box paddingLeft="10px" paddingRight="10px" className="total-carrinho">
                        <Typography variant="h6">
                            Total: {calcularTotal().toFixed(2)}
                        </Typography>
                        <div className="frete-info-botao">
                            <Typography variant="body2" color="textSecondary" className="frete-info">
                                O valor da entrega será calculado na sacola
                            </Typography>
                            <div className="botao-carrinho">
                                <Botao
                                    label="Fechar pedido"
                                    onClick={handleFecharPedido}
                                    />
                            </div>
                        </div>
                    </Box>
                )}
            </Drawer>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onAuthenticated={(username, idCliente) => {
                    
                }}
            />
        </>
    );
};

export default CarrinhoDrawer;
