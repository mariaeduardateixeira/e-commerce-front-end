import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aneis from "./pages/Aneis/aneis";

const Router: FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/aneis" element={<Aneis/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;