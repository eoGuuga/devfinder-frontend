// src/App.jsx

import { useState } from 'react';
import { motion } from 'framer-motion'; // <-- 1. IMPORTAR O MOTION
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import './index.css';

// 2. DEFINIR AS VARIANTES (RECEITAS) DE ANIMAÇÃO
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Anima cada filho com 0.1s de atraso
    }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 }, // Começa invisível e 20px abaixo
  show: { opacity: 1, y: 0 }     // Termina visível e na posição original
};

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const handleSearch = async (username) => {
    setIsLoading(true);
    setResults([]);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/v1/neural-search?q=${username}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erro ao realizar a busca');
      }
      
      setResults(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
          
          {isLoading && <p className="loading-message">Buscando na galáxia de talentos...</p>}
          
          {error && <p className="error-message">{error}</p>}
          
          {/* 3. APLICAR AS ANIMAÇÕES NA GRADE */}
          {!isLoading && !error && results.length > 0 && (
            <motion.div 
              className="profile-grid"
              variants={gridContainerVariants}
              initial="hidden"
              animate="show"
            >
              {results.map((user) => (
                <motion.div
                  key={user.username}
                  variants={gridItemVariants}
                >
                  <ProfileCard user={user} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && !error && results.length === 0 && (
            <p className="loading-message">Faça uma busca semântica para encontrar desenvolvedores.</p>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;