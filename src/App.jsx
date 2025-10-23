// src/App.jsx

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard.jsx'; // Importamos com .jsx
import './index.css';

function App() {
  // Nossos "pedaços de memória" (States)
  const [results, setResults] = useState([]);   // <-- MUDANÇA: Agora é uma lista (array)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // A URL da nossa API (usando a variável de ambiente que configuramos)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const handleSearch = async (username) => {
    setIsLoading(true); // Começa a carregar
    setResults([]);     // Limpa os resultados antigos
    setError(null);     // Limpa os erros antigos

    try {
      // MUDANÇA: Chamamos nosso novo endpoint de BUSCA NEURAL
      // Note que agora usamos um "query parameter" (?q=)
      const response = await fetch(`${apiUrl}/api/v1/neural-search?q=${username}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erro ao realizar a busca');
      }
      
      // MUDANÇA: Guardamos a LISTA de resultados no state
      setResults(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Termina de carregar, não importa se deu certo ou errado
    }
  };

  return (
    <div className="container">
      <header>
        <h1>DevFinder Frontend</h1>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} />

        <div className="results-container">
          {/* MUDANÇA: Lógica de renderização */}
          
          {/* 1. Se estiver carregando... */}
          {isLoading && <p className="loading-message">Buscando na galáxia de talentos...</p>}
          
          {/* 2. Se tiver um erro... */}
          {error && <p className="error-message">{error}</p>}
          
          {/* 3. Se não estiver carregando, não tiver erro, e tivermos resultados... */}
          {!isLoading && !error && results.length > 0 && (
            <div className="profile-grid">
              {/* Mapeamos a lista de resultados e criamos um card para CADA um */}
              {results.map((user) => (
                <ProfileCard key={user.username} user={user} />
              ))}
            </div>
          )}

          {/* 4. Se não estiver carregando, não tiver erro, e a lista estiver vazia... */}
          {!isLoading && !error && results.length === 0 && (
            <p className="loading-message">Faça uma busca semântica para encontrar desenvolvedores.</p>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;