import { useState } from 'react';

function SearchBar({ onSearch, currentMode, onModeChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm, currentMode);
  };

  return (
    <section id="search" aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">Controle de Busca</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="searchInput" className="sr-only">
          {currentMode === 'neural' ? 'Descreva o perfil desejado' : 'Digite o username exato do GitHub'}
        </label>
        <input
          type="text"
          id="searchInput"
          placeholder={currentMode === 'neural' ? 'Descreva o perfil (ex: dev python SP com IA)...' : 'Digite o username exato do GitHub...'}
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <fieldset className="search-mode-selector" role="radiogroup" aria-labelledby="search-mode-legend">
         <legend id="search-mode-legend" className="sr-only">Selecione o modo de busca</legend>
        <label>
          <input
            id="neuralMode"
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
            id="directMode"
            type="radio"
            name="searchMode"
            value="direct"
            checked={currentMode === 'direct'}
            onChange={() => onModeChange('direct')}
          />
          Busca por Username
        </label>
      </fieldset>
    </section>
  );
}

export default SearchBar;