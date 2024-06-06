import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiGet } from "../api/RestClient";
import Botao from "../components/Botao/botao";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults: FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]); // Usando 'any' para representar os produtos
  const query = useQuery();
  const descricao = query.get("descricao") || "";

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await apiGet(`/?descricao=${descricao}`);
        if (response.status === 200) {
          setProdutos(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    carregarProdutos();
  }, [descricao]);

  const redirecionarDetalhesProduto = (idProduto: number) => {
    if (idProduto) {
      window.location.href = `/produtos/${idProduto}`;
    }
  };

  return (
    <div className="search-results">
      <h1>Resultados da Pesquisa</h1>
      {produtos.length > 0 ? (
        <div className="container">
          {produtos.map((produto: any) => ( // Usando 'any' para representar cada produto
            <div key={produto.id} className="produto">
              <a className="produto_imagem" href={`/produtos/${produto.id}`}>
                <img src={produto.imagemPequena} alt={produto.nome} />
              </a>
              <div className="produto_nome">
                <p>{produto.nome}</p>
              </div>
              <div className="produto_preco">
                <p>{produto.preco}</p>
              </div>
              <Botao
                label="Comprar"
                onClick={() => redirecionarDetalhesProduto(produto.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Nenhum produto encontrado</div>
      )}
    </div>
  );
};

export default SearchResults;
