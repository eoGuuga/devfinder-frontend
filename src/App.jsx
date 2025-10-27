import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import SkeletonCard from './components/SkeletonCard.jsx'; // <-- Importa o Skeleton
import './index.css';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('neural');
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setParticlesLoaded(true);
    });
  }, []);

  const handleSearch = async (query, mode) => {
    setIsLoading(true);
    setResults([]);
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
      // Simula um pequeno delay para ver o skeleton (remova em produção)
      // await new Promise(resolve => setTimeout(resolve, 1500)); 
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || `Erro ao buscar (Modo: ${mode})`);
      }
      if (isListResult) {
        setResults(data);
      } else {
        setResults([data]);
      }
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (newMode) => {
    setSearchMode(newMode);
    setResults([]);
    setError(null);
  };

  const particlesOptions = { /* ... (código igual ao anterior) ... */ };

  if (!particlesLoaded) {
    return <div style={{ background: 'var(--bg-color)', height: '100vh' }} />;
  }

  return (
    <>
      <Particles
        id="tsparticles"
        options={particlesOptions}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      />
      <div className="container">
        <header>
          <h1>DevFinder Frontend</h1>
        </header>
        <main>
          <SearchBar
            onSearch={handleSearch}
            currentMode={searchMode}
            onModeChange={handleModeChange}
          />

          <motion.div
            className="results-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* --- LÓGICA DE RENDERIZAÇÃO ATUALIZADA --- */}

            {/* 1. Se estiver carregando, mostra SKELETONS */}
            {isLoading && (
              <div className="profile-grid">
                {/* Renderiza vários skeletons (ex: 3) */}
                {[...Array(3)].map((_, index) => (
                   <SkeletonCard key={index} />
                ))}
              </div>
            )}

            {/* 2. Se tiver um erro (e não estiver carregando)... */}
            {!isLoading && error && <p className="error-message">{error}</p>}

            {/* 3. Se não estiver carregando, não tiver erro, e tivermos resultados... */}
            {!isLoading && !error && results.length > 0 && (
              <motion.div
                className="profile-grid"
                variants={gridContainerVariants}
                initial="hidden"
                animate="show"
              >
                {results.map((user) => (
                  <motion.div
                    key={user.username || user.login}
                    variants={gridItemVariants}
                  >
                    <ProfileCard user={user} isDirectSearch={searchMode === 'direct'} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* 4. Se não estiver carregando, não tiver erro, e a lista estiver vazia... */}
            {!isLoading && !error && results.length === 0 && (
              <p className="loading-message">
                {searchMode === 'neural' ? 'Descreva o perfil desejado...' : 'Digite o username exato...'}
              </p>
            )}
            {/* --- FIM DA LÓGICA DE RENDERIZAÇÃO --- */}
          </motion.div>
        </main>
      </div>
    </>
  );
}

export default App;

const particlesOptions = { preset: "links", background: { color: { value: 'var(--bg-color)' } }, particles: { color: { value: "#ffffff" }, links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 }, move: { enable: true, speed: 1 }, number: { density: { enable: true, area: 800 }, value: 50 }, opacity: { value: 0.3 }, shape: { type: "circle" }, size: { value: { min: 1, max: 3 } }, }, interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false } }, modes: { repulse: { distance: 100, duration: 0.4 } }, }, detectRetina: true, };