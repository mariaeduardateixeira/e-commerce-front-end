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
  console.log("Descrição pesquisada:", descricao); // Verifique o valor

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await apiGet(`produtos/?descricao=${descricao}`);
          console.log("Resposta da API:", response); // Verifique a resposta completa
            if (response.status === 200) {
              console.log("Dados recebidos:", response.data); // Verifique os dados especificamente
                setProdutos(response.data);
              } else {
                console.log("Nenhum produto encontrado");
                setProdutos([]); // Garantir que a lista está sendo limpa
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
          {produtos.map((produto: any) => (
            <div key={produto.id} className="produto">
              <a className="produto_imagem" href={`/produtos/${produto.id}`}>
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
}  

export default SearchResults;
