// src/components/SearchBar.jsx (Com Seletor de Modo)

import { useState } from 'react';

// 1. O componente agora recebe MAIS props: o modo atual e a função para mudá-lo
function SearchBar({ onSearch, currentMode, onModeChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm, currentMode); // 2. Enviamos o modo junto com o termo
  };

  return (
    <section id="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder={currentMode === 'neural' ? 'Descreva o perfil (ex: dev python SP com IA)...' : 'Digite o username exato do GitHub...'}
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      
      {/* 3. Adicionamos os botões de rádio para selecionar o modo */}
      <div className="search-mode-selector">
        <label>
          <input
            type="radio"
            name="searchMode"
            value="neural"
            checked={currentMode === 'neural'}
            onChange={() => onModeChange('neural')}
          />
          Busca Semântica (IA)
        </label>
        <label>
          <input
            type="radio"
            name="searchMode"
            value="direct"
            checked={currentMode === 'direct'}
            onChange={() => onModeChange('direct')}
          />
          Busca por Username
        </label>
      </div>
    </section>
  );
}

export default SearchBar;