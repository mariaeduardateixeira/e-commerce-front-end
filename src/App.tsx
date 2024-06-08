import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Router from './router';
import Aneis from './pages/Aneis/aneis';
import CarrinhoDrawer from './components/CarrinhoDrawer/carrinhoDrawer';
import LoginModal from './components/Login/LoginModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="body">
      <div className='corpo'>
        <header className="App-header">
          <div className='logo'>
            <h1>Nome da loja</h1>
            <div className='item-carrinho'>
              <CarrinhoDrawer />
              <button onClick={openModal}>Login</button>
            </div>
          </div>
          <MenuBar />
        </header>
        <Router />
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
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
