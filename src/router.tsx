import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import ProdutosDetalhes from "./pages/ProdutosDetalhes/produtosDetalhes";
import Categoria from "./components/Categoria";
import Produtos from "./pages/Produtos/produto";
import SearchResults from "./pages/SearchResults";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProdutosDetalhes />} />
      <Route path="/:categoria" element={<Categoria />} />
      <Route path="/search" element={<SearchResults />} /> {/* Rota para os resultados de pesquisa */}
    </Routes>
  );
};

export default Router;
