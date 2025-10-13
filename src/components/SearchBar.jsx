// src/components/SearchBar.jsx
import { useState } from 'react';

// 1. O componente agora recebe "props", e nós pegamos a função 'onSearch' de dentro delas
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 2. Em vez do alert, chamamos a função que recebemos do pai,
    // enviando o termo da busca de volta para ele.
    onSearch(searchTerm); 
  };

  return (
    <section id="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar usuário do GitHub..."
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </section>
  );
}

export default SearchBar;