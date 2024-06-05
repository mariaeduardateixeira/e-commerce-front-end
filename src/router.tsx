import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aneis from "./pages/Aneis/aneis";
import Brincos from "./pages/Brincos/brincos";
import Pulseiras from "./pages/Pulseiras/pulseiras";
import Home from "./pages/Home/home";
import Correntes from "./pages/Correntes/correntes";
import ProdutosDetalhes from "./pages/ProdutosDetalhes/produtosDetalhes";
import Categoria from "./components/Categoria";
import Produtos from "./pages/Produtos/produto";

const Router: FC = () => {
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/home" element = {<Home/>}/>
        <Route path="/" element = {<Home/>}/>
        <Route path="/produtos" element = {<Produtos/>}/>
        <Route path="/produtos/:id" element = {<ProdutosDetalhes/>}/>
        <Route path="/:categoria" element={<Categoria/>}/>
        <Route path="/search" element={<SearchResults/>}/> {/* Adicione a rota de pesquisa */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
