import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/home";
import ProdutosDetalhes from "./pages/ProdutosDetalhes/produtosDetalhes";
import Categoria from "./components/Categoria";
import Produtos from "./pages/Produtos/produto";
import SearchResults from "./pages/SearchResults";
import FecharPedido from "./pages/FecharPedido/fecharPedido";
import Clientes from "./components/Clientes/clientes";
import Resumo from "./pages/ResumoCompra/resumo";


const Router: FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProdutosDetalhes />} />
      <Route path="/categoria/:categoria" element={<Categoria />} />
      <Route path="/search" element={<SearchResults />} /> {/* Rota para os resultados de pesquisa */}
      <Route path="/fecharPedido/" element={<FecharPedido />} />
      <Route path="/clientes/" element={<Clientes/>}/>
      <Route path="/resumo/" element={<Resumo/>}/>
    </Routes>
  );
};

export default Router;
