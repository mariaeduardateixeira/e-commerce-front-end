import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menuBar.css";

const MenuBar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  const executeSearch = () => {
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="menu">
      <div className="teste">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/ANEL">Anéis</a></li>
          <li><a href="/BRINCOS">Brincos</a></li>
          <li><a href="/PULSEIRAS">Pulseiras</a></li>
          <li><a href="/COLARES">Colares</a></li>
        </ul>
        <input
          type="text"
          placeholder="Digite o que você procura"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default MenuBar;
