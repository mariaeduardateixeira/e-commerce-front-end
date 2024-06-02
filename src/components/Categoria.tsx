import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet, STATUS_CODE } from '../api/RestClient';
import Botao from './Botao/botao';
import { IProduto } from './slider/types';


const Categoria: FC = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const { categoria } = useParams<{ categoria: string }>();

  const carregarProdutos = async (categoria: string) => {
    const response = await apiGet(`/produtos/categoria/${categoria}`);
    if (response.status === STATUS_CODE.OK) {
      console.log(response);
      setProdutos(response.data);
    }
  };
  console.log(categoria)

  useEffect(() => {
    if (categoria) {
      carregarProdutos(categoria);
    }
  }, [categoria]);

  const redirecionarDetalhesProduto = (idProduto: number) => {
    if (idProduto) {
      window.location.href = `/produtos/detalhes/${idProduto}`;
    }
  };

  return (
    <>
      {produtos?.length ? (
        <div className="container">
          {produtos.map((produto: IProduto) => (
            <div key={produto.id} className="produto">
              <a className="produto_imagem" href={`/produtos/detalhes/${produto.id}`}>
                <img src={produto.imagemPequena} alt={produto.nome} />
              </a>
              <div className="produto_nome">
                <p>{produto.descricao}</p>
              </div>
              <div className="produto_preco">
                <p>{produto.preco}</p>
              </div>
              <Botao
                label="Comprar"
                onClick={() => {
                  redirecionarDetalhesProduto(produto.id);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>teste</div>
      )}
    </>
  );
};

export default Categoria;
