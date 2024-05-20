import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import Slider from './components/slider/slider';
import "./style.css" 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Propaganda from './components/propaganda/propaganda';
import { productData, responsive } from './data';
import Router from './router';
import produtosData from './aneis';
import Aneis from './pages/Aneis/aneis';


function App() {
  
  const produtos = produtosData.map(item => (
    <Aneis 
    nome={item.nome} 
    imagemAnel={item.imagemAnel} 
    preco={item.preco} 
    descricao={item.descricao}/>
  ))

  const product = productData.map(item => (
    <Slider 
    name={item.name} 
    url={item.imageurl} 
    price={item.price} 
    description={item.description}/>
  ))

  return (
    <div className="body">
      <div className='corpo'>
        <header className="App-header">
          <MenuBar/>
        </header>
        <main>
        <Propaganda/>
          <h1 className='card-lancamentos'>Lançamentos</h1>
         <Carousel responsive={responsive}>
          {product}
          </Carousel>
          <h1 className='card-lancamentos'>Destaques</h1>
          <Carousel responsive={responsive}>
          {product}
          </Carousel>
          
        </main>
        <Router/>
        <footer>
          <div className='footer'>
            <p>Projeto criado por Mariana, Maria Eduarda e Isac da 4º fase da turma de Análise e Desenvolvimento de Sistemas</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
