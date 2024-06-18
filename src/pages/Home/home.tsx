import React, { FC, useEffect, useState } from "react";
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import { IProduto } from "./types";
import "./home.css";
import Carousel from "react-multi-carousel";
import Slider from "../../components/slider/slider";
import { responsive } from "../../data";
import "react-multi-carousel/lib/styles.css";

const Home: FC = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await apiGet("/produtos/");
        if (response.status === STATUS_CODE.OK) {
          setProdutos(response.data);
        } else {
          console.error(`Erro ao carregar produtos: ${response.message}`);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    carregarProdutos();
  }, []);

  if (produtos.length === 0) {
    return <div>Carregando...</div>;
  }

  const half = Math.ceil(produtos.length / 2);
  const primeiraMetade = produtos.slice(0, half);
  const segundaMetade = produtos.slice(half);

  return (
    <>
      <div className="div-lancamentos custom-carousel">
        <h1 className="card-lancamentos">Lançamentos</h1>
        <Carousel responsive={responsive}>
          {primeiraMetade.map((item) => (
            <Slider
              key={item.id}
              id={item.id}
              name={item.nome}
              url={item.imagemPequena}
              price={item.preco}
              description={item.descricao}
            />
          ))}
        </Carousel>
      </div>

      <div className="div-destaques custom-carousel">
        <h1 className="card-lancamentos">Destaques</h1>
        <Carousel responsive={responsive}>
          {segundaMetade.map((item) => (
            <Slider
              key={item.id}
              id={item.id}
              name={item.nome}
              url={item.imagemPequena}
              price={item.preco}
              description={item.descricao}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
