import { useState } from 'react';

function SearchBar({ onSearch, currentMode, onModeChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) { // Evita busca vazia (além do required)
        onSearch(searchTerm.trim(), currentMode);
    }
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

      {/* --- NOVO CONTROLE SEGMENTADO --- */}
      <div className="segmented-control" role="group" aria-label="Modo de busca">
        <button
           type="button"
           role="radio"
           aria-checked={currentMode === 'neural'}
           className={`segment-button ${currentMode === 'neural' ? 'active' : ''}`}
           onClick={() => onModeChange('neural')}
        >
          Busca Semântica (IA)
        </button>
        <button
           type="button"
           role="radio"
           aria-checked={currentMode === 'direct'}
           className={`segment-button ${currentMode === 'direct' ? 'active' : ''}`}
           onClick={() => onModeChange('direct')}
        >
          Busca por Username
        </button>
      </div>
      {/* --- FIM DO CONTROLE SEGMENTADO --- */}
    </section>
  );
}

export default SearchBar;