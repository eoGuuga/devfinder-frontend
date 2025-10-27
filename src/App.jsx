import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import './index.css';

const gridContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const gridItemVariants = { hidden: { opacity: 0, y: 50, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } };

const MIN_RELEVANCE_SCORE = 0.1; // <-- NOSSO LIMIAR DE RELEVÂNCIA

function App() {
  const [allResults, setAllResults] = useState([]); // Guarda TODOS os resultados da API
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('neural');
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    initParticlesEngine(async (engine) => { await loadLinksPreset(engine); }).then(() => { setParticlesLoaded(true); });
  }, []);

  const handleSearch = async (query, mode) => {
    setHasSearched(false);
    setIsLoading(true);
    setAllResults([]); // Limpa resultados brutos
    setError(null);
    let url = '';
    let isListResult = false;

    if (mode === 'neural') {
      url = `${apiUrl}/api/v1/neural-search?q=${encodeURIComponent(query)}`;
      isListResult = true;
    } else {
      url = `${apiUrl}/api/v1/user/${encodeURIComponent(query)}`;
      isListResult = false;
    }

    try {
      console.log(`Buscando em: ${url} (Modo: ${mode})`);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) { throw new Error(data.detail || `Erro ao buscar (Modo: ${mode})`); }

      if (isListResult) {
        setAllResults(data); // Guarda todos os resultados, mesmo os de score baixo
      } else {
        setAllResults([data]); // Guarda o resultado único como lista
      }
    } catch (err) {
      setError(err.message);
      setAllResults([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const handleModeChange = (newMode) => {
    setSearchMode(newMode);
    setAllResults([]);
    setError(null);
    setHasSearched(false);
  };

  const particlesOptions = { /* ... (código igual ao anterior) ... */ };

  // FILTRAGEM DOS RESULTADOS BASEADO NO SCORE (APENAS PARA MODO NEURAL)
  const relevantResults = searchMode === 'neural'
    ? allResults.filter(user => user.score >= MIN_RELEVANCE_SCORE)
    : allResults;

  if (!particlesLoaded) {
    return <div style={{ background: 'var(--bg-color)', height: '100vh' }} />;
  }

  return (
    <>
      <Particles id="tsparticles" options={particlesOptions} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
      <div className="container">
        <header><h1>DevFinder Frontend</h1></header>
        <main>
          <SearchBar onSearch={handleSearch} currentMode={searchMode} onModeChange={handleModeChange} />
          <motion.div className="results-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {isLoading && (
              <div className="profile-grid">
                {[...Array(3)].map((_, index) => (<SkeletonCard key={index} />))}
              </div>
            )}
            {!isLoading && error && <p className="error-message">{error}</p>}

            {/* Renderiza a grade APENAS se houver resultados RELEVANTES */}
            {!isLoading && !error && relevantResults.length > 0 && (
              <motion.div className="profile-grid" variants={gridContainerVariants} initial="hidden" animate="show">
                {relevantResults.map((user) => (
                  <motion.div key={user.username || user.login} variants={gridItemVariants}>
                    <ProfileCard user={user} isDirectSearch={searchMode === 'direct'} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Mostra "Nenhum resultado" SE busca foi feita E a lista de RELEVANTES está vazia */}
            {!isLoading && !error && hasSearched && relevantResults.length === 0 && (
               <p className="loading-message">Nenhum perfil relevante encontrado para sua busca.</p>
            )}

            {/* Mostra mensagem inicial SE NENHUMA busca foi feita ainda */}
            {!isLoading && !error && !hasSearched && (
              <p className="loading-message">
                {searchMode === 'neural' ? 'Descreva o perfil desejado...' : 'Digite o username exato...'}
              </p>
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
}

export default App;

const particlesOptions = { preset: "links", background: { color: { value: 'var(--bg-color)' } }, particles: { color: { value: "#ffffff" }, links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 }, move: { enable: true, speed: 1 }, number: { density: { enable: true, area: 800 }, value: 50 }, opacity: { value: 0.3 }, shape: { type: "circle" }, size: { value: { min: 1, max: 3 } }, }, interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false } }, modes: { repulse: { distance: 100, duration: 0.4 } }, }, detectRetina: true, };