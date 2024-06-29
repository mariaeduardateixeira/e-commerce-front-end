import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Router from './router';
import CarrinhoDrawer from './components/CarrinhoDrawer/carrinhoDrawer';
import LoginModal from './components/Login/LoginModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setAuthenticatedUser(parsedUser.username); // Corrigido: Acessa o campo username
      setClienteId(parsedUser.id);
    }
  }, []);

  const handleAuthentication = (username: string, idCliente: any) => {
    setAuthenticatedUser(username);

    localStorage.setItem('authenticatedUser', JSON.stringify({ username, id: idCliente }));

    setClienteId(idCliente);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setClienteId(null);
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('clienteId');
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="body">
      <div className='corpo'>
        <div className="div-corpo">
          <header className="App-header">
            <div className='logo'>
              <h1 onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Trio de Brilho</h1>
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
        </div>
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
