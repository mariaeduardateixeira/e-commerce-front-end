import './LoginModal.css'

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Login</h2>
          <form>
            <label htmlFor="usuário">Usuário:</label>
            <input type="text" id="usuário" name="usuário" required />
  
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />
  
            <button type="submit">Entrar</button>
          </form>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    );
  };
  
  export default LoginModal;