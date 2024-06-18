// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import MenuBar from './components/menuBar/menuBar';
// import './style.css';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import Router from './router';
// import CarrinhoDrawer from './components/CarrinhoDrawer/carrinhoDrawer';
// import LoginModal from './components/Login/LoginModal';

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [authenticatedUser, setAuthenticatedUser] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('authenticatedUser');
//     if (user) {
//       setAuthenticatedUser(user);
//     }
//   }, []);

//   //const id = JSON.parse("idCliente") || "{}";
//   const handleAuthentication = (username: string, idCliente: Number ) => {
//     setAuthenticatedUser(username);
//     localStorage.setItem('authenticatedUser', JSON.stringify({username, id: idCliente}));
//     setIsModalOpen(false);
//   };

//   const openModal = () => setIsModalOpen(true);

//   const handleLogout = () => {
//     setAuthenticatedUser('');
//     localStorage.removeItem('authenticatedUser');
//     setShowDropdown(false); // Esconde o dropdown ao deslogar
//   };

//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   return (
//     <div className="body">
//       <div className='corpo'>
//         <header className="App-header">
//           <div className='logo'>
//             <h1>Nome da loja</h1>
//             {authenticatedUser ? (
//               <div className="user-section">
//                 <span className="user-name" onClick={toggleDropdown}>
//                   {authenticatedUser}
//                 </span>
//                 {showDropdown && (
//                   <div className="dropdown-menu">
//                     <ul>
//                       <li>Perfil</li>
//                       <li>Configurações</li>
//                       <li onClick={handleLogout}>Sair</li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button onClick={openModal} className="login-button">Entre ou Registre-se</button>
//             )}
//             <div className='item-carrinho'>
//               <CarrinhoDrawer />
//             </div>
//           </div>
//           <MenuBar />
//         </header>
//         <Router />
//         {!authenticatedUser && (
//           <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAuthenticated={handleAuthentication} />
//         )}
//         <footer>
//           <div className='footer'>
//             <p>Projeto criado por Mariana, Maria Eduarda e Isac da 4º fase da turma de Análise e Desenvolvimento de Sistemas</p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Importe o BrowserRouter e useNavigate
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import './style.css';
import Router from './router';
import CarrinhoDrawer from './components/CarrinhoDrawer/carrinhoDrawer';
import LoginModal from './components/Login/LoginModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    const id = localStorage.getItem('clienteId');
    if (user) {
      setAuthenticatedUser(user);
    }
    if (id) {
      setClienteId(Number(id));
    }
  }, []);

  const handleAuthentication = (username: string, idCliente: any) => {
    setAuthenticatedUser(username);
    localStorage.setItem('authenticatedUser', JSON.stringify({ username, id: idCliente?.id }));
    setClienteId(idCliente);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setClienteId(null);
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('clienteId');
    setShowDropdown(false); // Esconde o dropdown ao deslogar
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Função para redirecionar para a página inicial
  const handleHomeClick = () => {
    navigate('/'); // Redireciona para a home
  };

  return (
    <div className="body">
      <div className='corpo'>
        <header className="App-header">
          <div className='logo'>
            <h1 onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Nome da loja</h1> {/* Adiciona o evento de clique */}
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
