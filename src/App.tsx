import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Router from './router';
import CarrinhoDrawer from './components/CarrinhoDrawer/carrinhoDrawer';
import LoginModal from './components/Login/LoginModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    if (user) {
      setAuthenticatedUser(user);
    }
  }, []);

  const handleAuthentication = (username: string) => {
    setAuthenticatedUser(username);
    localStorage.setItem('authenticatedUser', username);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  const handleLogout = () => {
    setAuthenticatedUser('');
    localStorage.removeItem('authenticatedUser');
    setShowDropdown(false); // Esconde o dropdown ao deslogar
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="body">
      <div className='corpo'>
        <header className="App-header">
          <div className='logo'>
            <h1>Nome da loja</h1>
            {authenticatedUser ? (
              <div className="user-section">
                <span className="user-name" onClick={toggleDropdown}>
                  {authenticatedUser}
                </span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <ul>
                      <li>Perfil</li>
                      <li>Configurações</li>
                      <li onClick={handleLogout}>Sair</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openModal} className="login-button">Entre ou Registre-se</button>
            )}
            <div className='item-carrinho'>
              <CarrinhoDrawer />
            </div>
          </div>
          <MenuBar />
        </header>
        <Router />
        {!authenticatedUser && (
          <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAuthenticated={handleAuthentication} />
        )}
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