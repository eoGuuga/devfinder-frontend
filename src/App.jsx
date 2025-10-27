import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import './index.css';

const gridContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const gridItemVariants = { hidden: { opacity: 0, y: 50, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } };
const MIN_RELEVANCE_SCORE = 0.1;

function App() {
  const [allResults, setAllResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('neural');
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { theme } = useTheme();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    initParticlesEngine(async (engine) => { await loadLinksPreset(engine); }).then(() => { setParticlesLoaded(true); });
  }, []);

  // <<<--- FUNÇÕES CORRIGIDAS, DENTRO DO COMPONENTE --->>>
  const handleSearch = async (query, mode) => {
    setHasSearched(false);
    setIsLoading(true);
    setAllResults([]);
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
        setAllResults(data);
      } else {
        setAllResults([data]);
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
  // <<<--- FIM DAS FUNÇÕES CORRIGIDAS --->>>

  const particlesOptions = {
    preset: "links",
    background: { color: { value: 'transparent' } },
    particles: {
      color: { value: theme === 'light' ? '#333333' : '#ffffff' },
      links: { color: theme === 'light' ? '#666666' : '#ffffff', distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1 },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false } },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    detectRetina: true,
  };

  const relevantResults = searchMode === 'neural'
    ? allResults.filter(user => user.score >= MIN_RELEVANCE_SCORE)
    : allResults;

  if (!particlesLoaded) {
    return <div style={{ background: 'var(--bg-color)', height: '100vh' }} />;
  }

  return (
    <>
      {particlesLoaded && (
          <Particles
            id="tsparticles"
            options={particlesOptions}
            key={theme}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
          />
      )}
      <ThemeToggle />
      <div className="container">
        <header><h1>DevFinder Frontend</h1></header>
        <main>
          <SearchBar onSearch={handleSearch} currentMode={searchMode} onModeChange={handleModeChange} />
          <motion.div className="results-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} aria-live="polite">
            {isLoading && (
              <div aria-label="Carregando resultados">
                <div className="profile-grid">
                  {[...Array(3)].map((_, index) => (<SkeletonCard key={index} />))}
                </div>
              </div>
            )}
            {!isLoading && error && <p role="alert" className="error-message">Erro na busca: {error}</p>}

            {!isLoading && !error && relevantResults.length > 0 && (
              <div aria-label={`${relevantResults.length} ${relevantResults.length === 1 ? 'perfil encontrado' : 'perfis encontrados'}.`}>
                <motion.div className="profile-grid" variants={gridContainerVariants} initial="hidden" animate="show">
                  {relevantResults.map((user) => (
                    <motion.div
                      key={user.username || user.login}
                      variants={gridItemVariants}
                      role="article"
                      aria-labelledby={`heading-${user.username || user.login}`}
                    >
                      <ProfileCard user={user} isDirectSearch={searchMode === 'direct'} headingId={`heading-${user.username || user.login}`} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {!isLoading && !error && hasSearched && relevantResults.length === 0 && (
               <p role="status" className="loading-message">Nenhum perfil relevante encontrado para sua busca.</p>
            )}

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