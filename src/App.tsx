import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import Slider from './components/slider/slider';
import "./style.css" 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Propaganda from './components/propaganda/propaganda';

function App() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const productData = [
    {
      id:1,
      imageurl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "nome",
      price: "29,90",
      description: "Descrição"
    },
    {
      id:2,
      imageurl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "nome",
      price: "29,90",
      description: "Descrição"
    },
    {
      id:3,
      imageurl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "nome",
      price: "29,90",
      description: "Descrição"
    },
    {
      id:4,
      imageurl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "nome",
      price: "29,90",
      description: "Descrição"
    },
    {
      id:5,
      imageurl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "nome",
      price: "29,90",
      description: "Descrição"
    }
  ]
  
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
          <Propaganda/>
          <h1 className='card-lancamentos'>Lançamentos</h1>
         <Carousel responsive={responsive}>
          {product}
          </Carousel>
          <h1 className='card-lancamentos'>Destaques</h1>
          <Carousel responsive={responsive}>
          {product}
          </Carousel>
        </header>
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
