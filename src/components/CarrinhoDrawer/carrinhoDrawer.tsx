import { Close, Delete, ShoppingCart } from "@mui/icons-material";
import { FC, useState } from "react";
import "./carrinhoDrawer.css"
import { Badge, IconButton } from "@mui/material";
import { addCarrinho, carregarCarrinho, obterQuantidadeCarrinho, removerItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { Box, Button, Drawer, Grid, Paper, Typography } from "@mui/material";

import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import InputQuantidade from "../InputQuantidade/input";
import Botao from "../Botao/botao";

const CarrinhoDrawer: FC = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [carrinho, setCarrinho]= useState<ICarrinhoStore[]>(carregarCarrinho());
      
    
    const atualizarQuantidadeCarrinho = (item: ICarrinhoStore) => {
     const carrinhoAtualizado = addCarrinho(item);
     setCarrinho(carrinhoAtualizado);
    }
    const removerprodutocarrinho = (id: number) => {
      const carrinhoAtualizado = removerItemCarrinho(id);

      setCarrinho(carrinhoAtualizado);
        
      }

      const calcularTotal = () => {
        return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }
    
    return <>
        <div className="carrinho" onClick={() =>{
            setOpenDrawer(true)
        }}>
            <Badge
                badgeContent={obterQuantidadeCarrinho()}
                color="primary"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}>
                <ShoppingCart color="action" />
            </Badge>
        </div>
        <Drawer 
            open={openDrawer} 
            anchor="right" 
            // na segunda chave será a descrição do objeto passado
            classes={{
                paper: "tamanho-paper-drawer"
            }}>
            <Box paddingLeft={"10px"} paddingRight={"10px"}>
                <Button 
                    variant="text" 
                    startIcon={<Close />} 
                    onClick={()=>{
                        setOpenDrawer(false)
                    }}>
                    Fechar
                </Button>
            </Box>
            <Box 
                paddingLeft={"10px"}
                paddingRight={"10px"}>
                {/* o símbolo "?" significa para utilização de validação de não definição do objeto e equivale ao if sem else  */}
                {!carrinho?.length && <>
                    <Box>
                        {/*utilizado mais para variável de texto */}
                         <Typography variant="body1"> 
                            <strong> Seu carrinho está vazio. </strong>
                        </Typography>
                    </Box>
                </>}
                {/* aqui basicamente será um for para percorrer os itens do carrinho, o map percorre por linha e retorna algo */}
                {carrinho?.map((c: ICarrinhoStore) => {
                    return <>
                        <Grid
                            container={true}
                            alignItems={"center"}
                            >
                            <Grid className="box-imagem" item={true}>
                                <img className="imagem" src={c.imagemPequena} />
                            </Grid>
                            <Grid className="box-detalhes" item={true}>
                                <Box>
                                  <strong>{c.descricao}</strong>
                                </Box>
                            </Grid>
                           <Grid className="box-quantidade">
                              <InputQuantidade 
                                quantidade={c.quantidade}
                                onChange={(quantidade: number) => {
                                  const carrinhoAtualizado: ICarrinhoStore = {
                                      ...c,
                                      quantidade: quantidade,
                                  }
                                  atualizarQuantidadeCarrinho(carrinhoAtualizado)
                                }}
                              />
                           </Grid>
                           <Grid className="box-preco" item={true}>
                                <Box>
                                  <strong>{((c.quantidade)*(c.preco)).toFixed(2)}</strong>
                                </Box>
                            </Grid>
                           <Grid className="box-remover" item={true}>
                              <IconButton
                                onClick={() =>{
                                  removerprodutocarrinho(c.id);
                                }}>
                                <Delete color="error"/>
                              </IconButton>
                           </Grid>
                        </Grid>
                    </>
                    
                })}
                
            </Box>
           
            {carrinho.length > 0 && (
                    <Box paddingLeft={"10px"} paddingRight={"10px"}>
                        <Typography variant="h6">
                            Total: {calcularTotal().toFixed(2)}
                        </Typography>
                        <div className="botao-carrinho">
                            <Botao
                                label="Fechar pedido"
                                onClick={() => {
                                    window.location.href = `/fecharPedido`;
                                }}
                            />
                        </div>
                    </Box>
                    )}
        </Drawer>
    </>;
}

// sem esta linha abaixo, o componente não é visto em lugar algum
export default CarrinhoDrawer;