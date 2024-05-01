import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aneis from "./pages/Aneis/aneis";
import Brincos from "./pages/Brincos/brincos";
import Pulseiras from "./pages/Pulseiras/pulseiras";
import Home from "./pages/Home/home";
import Correntes from "./pages/Correntes/correntes";

const Router: FC = () => {
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home/>}/>
        <Route path="/aneis" element={<Aneis/>}/>
        <Route path="/brincos" element={<Brincos/>}/>
        <Route path="/pulseiras" element={<Pulseiras/>}/>
        <Route path="/correntes" element={<Correntes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;