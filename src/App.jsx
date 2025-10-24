// src/App.jsx (Versão Híbrida)

import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import './index.css';

// Variantes de animação (mantidas)
const gridContainerVariants = { /* ... (código igual ao anterior) ... */ };
const gridItemVariants = { /* ... (código igual ao anterior) ... */ };

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 1. NOVO STATE: Guarda o modo de busca atual ('neural' ou 'direct')
  const [searchMode, setSearchMode] = useState('neural'); // Começa com busca neural

  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  // 2. A função handleSearch agora recebe o MODO também
  const handleSearch = async (query, mode) => {
    setIsLoading(true);
    setResults([]);
    setError(null);

    let url = '';
    let isListResult = false; // Flag para saber se esperamos uma lista ou um objeto

    // 3. Decide qual URL chamar baseado no modo
    if (mode === 'neural') {
      url = `${apiUrl}/api/v1/neural-search?q=${encodeURIComponent(query)}`;
      isListResult = true;
    } else { // mode === 'direct'
      url = `${apiUrl}/api/v1/user/${encodeURIComponent(query)}`;
      isListResult = false;
    }

    try {
      console.log(`Buscando em: ${url} (Modo: ${mode})`); // Log para depuração
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Erro ao buscar (Modo: ${mode})`);
      }

      // 4. Guarda o resultado (lista ou objeto único)
      if (isListResult) {
        setResults(data);
      } else {
        // Se for busca direta, colocamos o objeto único dentro de uma lista
        // para que o .map() funcione consistentemente
        setResults([data]); 
      }

    } catch (err) {
      setError(err.message);
      setResults([]); // Limpa resultados em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Função para mudar o modo de busca (passada para SearchBar)
  const handleModeChange = (newMode) => {
    setSearchMode(newMode);
    setResults([]); // Limpa resultados ao mudar de modo
    setError(null);
  };

  return (
    <div className="container">
      <header>
        <h1>DevFinder Frontend</h1>
      </header>
      <main>
        {/* 6. Passamos as novas props para SearchBar */}
        <SearchBar
          onSearch={handleSearch}
          currentMode={searchMode}
          onModeChange={handleModeChange}
        />

        <div className="results-container">
          {isLoading && <p className="loading-message">Buscando...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {/* A lógica de renderização com .map() continua funcionando,
              pois agora 'results' é sempre uma lista (vazia, com 1 item ou com vários) */}
          {!isLoading && !error && results.length > 0 && (
            <motion.div
              className="profile-grid"
              variants={gridContainerVariants}
              initial="hidden"
              animate="show"
            >
              {results.map((user) => (
                // Adicionamos a prop 'isDirectSearch' para o card saber como se exibir
                <motion.div
                  key={user.username || user.login} // Usa username (do pinecone) ou login (do github api)
                  variants={gridItemVariants}
                >
                  <ProfileCard user={user} isDirectSearch={searchMode === 'direct'} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && !error && results.length === 0 && (
             // Mensagem inicial dinâmica
            <p className="loading-message">
              {searchMode === 'neural' ? 'Descreva o perfil desejado...' : 'Digite o username exato...'}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;