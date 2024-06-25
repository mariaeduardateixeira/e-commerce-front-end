import { FC, useEffect, useState } from "react";
import { IProdutoDetalhe } from "../ProdutosDetalhes/types";
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import { useParams } from "react-router-dom";
import { addCarrinho, carregarCarrinho, removerItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { Delete } from "@mui/icons-material";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import InputQuantidade from "../../components/InputQuantidade/input";
import { IEndereco } from "../FecharPedido/types";

const Resumo: FC = () =>{
  const [clienteStore, setClienteStore] = useState<any>(null);
  const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
  const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(carregarCarrinho());
  const endereco = JSON.parse(localStorage.getItem("endereco") || "{}");
  const totalCarrinho = JSON.parse(localStorage.getItem("calcularTotal") || "{}");
  const { id } = useParams();

  const salvarPedido = () => {
    const data = {
      clienteId: clienteStore.id,
      enderecoId: enderecos,
     
      itens: carrinho.map((carrinho: ICarrinhoStore) => {
        return {
          produtoId: carrinho.id,
          quantidade: carrinho.quantidade,
          valor: carrinho.valor,
        }
      })

    }
  }

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };

  useEffect(() => {
    const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
     if (cliente?.id) {
      setClienteStore(cliente);
    } else {
     console.log("Cliente não autenticado ou ID não definido");
     }
  }, []);

  useEffect(() => {
    if (clienteStore?.id) {
      carregarPedido();
    }
  }, [clienteStore]);

  const carregarPedido = async () => {
    const response = await apiGet(`/pedidos/criar/${clienteStore.id}`);
    if (response.status === STATUS_CODE.OK) {
      setCarrinho(response.data);
    } else {
      console.error("Erro ao carregar produtos, status:", response.status);
    }
  };
  
  useEffect(() => {
    apiGet(`/criarPedido/`).then((response) => {
      if(response.status === STATUS_CODE.OK){
        console.log(">>>", response.data);
        setCarrinho(response.data);
             
      }
    });
  }, []);

    return <>
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
                                        {c.quantidade}
                                </Grid>
                               
                                <Grid className="box-preco" item>
                                    <Box>
                                        <strong>{((c.quantidade) * (c.preco)).toFixed(2)}</strong>
                                    </Box>
                                </Grid>
   
                            </Grid>
                        ))
                    )}
                </Box>
                <fieldset className="forma-pagamento">
                <legend>Endereço de entrega</legend>
                <div>
                <fieldset className="forma-pagamento">
                <legend>Endereço de entrega</legend>
                <div>
                {enderecos.length > 0 ? (
                    enderecos.map((endereco: IEndereco) => (
                    <div className="container-fechar-pedido" key={endereco.id}>
                      <fieldset className="endereco">
                        <div>
                          <input type="checkbox" id="endereco" name="endereco" />
                          <p>{endereco.rua}, {endereco.bairro}, {endereco.cidade}, {endereco.estado}</p>
                    </div>
                </fieldset>
        
              </div>
            ) )
          ) : (
            <div>Carregando dados...</div>
          )}
                </div>
                
      
            </fieldset>
                </div>
                
      
            </fieldset>
            {carrinho.length > 0 && (
                        <Box paddingLeft="10px" paddingRight="10px">    
                        <Typography variant="h6">
                            Total: {calcularTotal().toFixed(2)}
                        </Typography>
                      </Box>
                      )}
    
    </>;
}

export default Resumo;