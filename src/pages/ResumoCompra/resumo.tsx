import { FC, useEffect, useState } from "react";
import { apiGet, apiPost, STATUS_CODE } from "../../api/RestClient";
import { ICarrinhoStore } from "../../store/CarrinhoStore/type";
import { useParams, useNavigate } from "react-router-dom";
import { carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { Box, Typography, Grid, Button, Radio } from "@mui/material";
import { IEndereco } from "../FecharPedido/types";
import Botao from "../../components/Botao/botao";
import "./resumo.css";
import { DadosCartao } from "./types";
import CreditoModal from "../../components/CreditoModal/CreditoModal";

const Resumo: FC = () => {
  const [clienteStore, setClienteStore] = useState<any>(null);
  const [enderecos, setEnderecos] = useState<IEndereco | undefined>();
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(carregarCarrinho());
  const [dadosCartao, setDadosCartao] = useState<DadosCartao | null>(null);
  const [isCartaoModalOpen, setIsCartaoModalOpen] = useState(false);
  const [cartoes, setCartoes] = useState<DadosCartao[]>([]);
  const [pagamento, setPagamento] = useState<string | null>(null);

  const handleOpenCartaoModal = () => {
    setIsCartaoModalOpen(true);
  };

  const handlePaymentChange = (valor: string) => {
    setPagamento(valor);
  };

  const navigate = useNavigate();

  const salvarPedido = async () => {
    const data = {
      clienteId: clienteStore?.id,
      enderecoId: enderecos?.id || 0,
      formaPagamento: formaPagamento,
      carrinho: carrinho.map((item: ICarrinhoStore) => ({
        produtoId: item.id,
        quantidade: item.quantidade,
      })),
    };

    console.log("DATA>>>>", data);

    const response = await apiPost(`/pedidos/criar`, data);
    if (response.status === STATUS_CODE.CREATED) {
      alert("Pedido gerado com sucesso");
      navigate('/confirmar-pedido');
    } else {
      alert("Erro ao gerar pedido");
    }

    console.log(">>>>>", data);
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  useEffect(() => {
    const cliente = JSON.parse(localStorage.getItem("authenticatedUser") || "{}");
    if (cliente?.id) {
      setClienteStore(cliente);
      buscarDadosCartaoPorCliente(cliente.id);
      console.log("Cliente carregado:", cliente);
    } else {
      console.log("Cliente não autenticado ou ID não definido");
    }

    const carregarEnderecos = async (enderecoId: number, cliente: any) => {
      try {
        const response = await apiGet(`/enderecos/carregarEnderecoByCliente/${cliente.id}`);
        if (response.status === STATUS_CODE.OK) {
          const enderecoEncontrado = response.data.find((endereco: IEndereco) => endereco.id === enderecoId);
          if (enderecoEncontrado) {
            setEnderecos(enderecoEncontrado);
          } else {
            console.error("Endereço não encontrado.");
          }
        } else {
          console.error("Erro ao carregar endereços, status:", response.status);
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    };

    const storedResumo = JSON.parse(localStorage.getItem("resumo") || "{}");
    if (storedResumo.enderecoId) {
      carregarEnderecos(storedResumo.enderecoId, cliente);
    } else {
      console.log("Nenhum endereço armazenado encontrado");
    }

    if (storedResumo.forma_pagamento) {
      setFormaPagamento(storedResumo.forma_pagamento);
    } else {
      console.log("Nenhuma forma de pagamento armazenada encontrada");
    }
  }, []);

  const buscarDadosCartaoPorCliente = async (clienteId: string) => {
    const response = await apiGet(`/cartoes/carregarPorCliente/${clienteId}`);
    if (response.status === STATUS_CODE.OK && response.data.length > 0) {
      setCartoes(response.data);
    } else {
      console.error('Erro ao buscar dados do cartão:', response.message);
    }
  };

  return (
    <div className="div-principal">
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
              <Grid className="box-detalhes-resumo" item>
                <Box>
                  <strong>{c.descricao}</strong>
                </Box>
              </Grid>
              <Grid className="box-quantidade" item>
                {c.quantidade}
              </Grid>
              <Grid className="box-preco" item>
                <Box>
                  <strong>R${((c.quantidade) * (c.preco)).toFixed(2)}</strong>
                </Box>
              </Grid>
              <hr className="hr-produtos"/>
            </Grid>
          ))
        )}
        <fieldset className="endereco-entrega">
          <legend>Endereço de entrega</legend>
          <div>
            {enderecos?.id ? (
              <div className="container-fechar-pedido" key={enderecos.id}>
                <div>
                  <p>{enderecos.rua}, {enderecos.bairro}, {enderecos.cidade}, {enderecos.estado}</p>
                </div>
              </div>
            ) : (
              <div>Carregando dados...</div>
            )}
          </div>
        </fieldset>
        <fieldset className="forma-pagamento">
          <Button onClick={handleOpenCartaoModal}>Adicionar um novo cartão</Button>
          <legend>Forma de pagamento</legend>
          <div>
            <p>{formaPagamento ? formaPagamento : "Carregando forma de pagamento..."}</p>
            {formaPagamento === 'CREDITO' && (
              <div>
                {cartoes.length > 0 ? (
                  cartoes.map((cartao: DadosCartao) => (
                    <div className="container-endereco-cadastrado" key={cartao.id}>
                      <div className="endereco-content">
                        <Radio
                          className="radio"
                          checked={cartao.id === (dadosCartao?.id || 0)}
                          onChange={() => setDadosCartao(cartao)}
                          sx={{
                            color: "#888", // Cor quando não está selecionado
                            '&.Mui-checked': {
                              color: "#9088ba", // Cor quando está selecionado
                            },
                          }}
                        />
                        <p>{`${cartao.titular}, ${cartao.numero} - ${cartao.dataValidade}`}</p>
                      </div>
                      <hr/>
                    </div>
                  ))
                ) : (
                  <div>Carregando dados...</div>
                )}
              </div>
            )}
          </div>
        </fieldset>
        {carrinho.length > 0 && (
          <Box paddingLeft="10px" paddingRight="10px">
            <Typography variant="h6">
              Total: R${calcularTotal().toFixed(2)}
            </Typography>
          </Box>
        )}
        <div className="botao-resumo">
          <span className="span-resumo">
            <Botao
              label="Confirmar pedido"
              onClick={salvarPedido}
            />
          </span>
        </div>
      </Box>
      <CreditoModal
        open={isCartaoModalOpen}
        onClose={() => setIsCartaoModalOpen(false)}
      />
    </div>
  );
}

export default Resumo;
