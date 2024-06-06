import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//import Aneis from './pages/Aneis/aneis';
import Router from './router'; // Remove a importação do BrowserRouter
import CarrinhoDrawer from './components/CarrinhoDrawer/carrinhoDrawer';

function App() {
  return (
    <div className="body">
      <div className='corpo'>
        <header className="App-header">
          <div className='logo'>
            <h1>Nome da loja</h1>
            <div className='item-carrinho'>
              <CarrinhoDrawer />
            </div>
          </div>
          <MenuBar />
        </header>
        <Router /> {/* Renderize o componente Router diretamente */}
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
