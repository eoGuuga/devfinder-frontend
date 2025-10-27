import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links"; // Importa o preset
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import './index.css';

const gridContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const gridItemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

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

  const particlesOptions = {
    preset: "links",
    background: {
      color: {
        value: 'var(--bg-color)', // Usa nossa cor de fundo do CSS
      },
    },
    particles: {
      color: {
        value: "#ffffff", // Cor das partículas
      },
      links: {
        color: "#ffffff", // Cor das linhas
        distance: 150,
        enable: true,
        opacity: 0.2, // Linhas bem sutis
        width: 1,
      },
      move: {
        enable: true,
        speed: 1, // Movimento lento
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50, // Menos partículas
      },
      opacity: {
        value: 0.3, // Partículas sutis
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Tamanho pequeno
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // Afasta as partículas ao passar o mouse
        },
        onClick: {
            enable: false, // Desabilita interação no clique
        }
      },
      modes: {
        repulse: {
          distance: 100, // Distância da repulsão
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  if (!particlesLoaded) {
    return <div style={{ background: 'var(--bg-color)', height: '100vh' }} />; // Tela de carregamento simples
  }

  return (
    <>
      <Particles
        id="tsparticles"
        options={particlesOptions}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1 // Garante que fique atrás de todo o conteúdo
        }}
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

          <div className="results-container">
            {isLoading && <p className="loading-message">Buscando...</p>}
            {error && <p className="error-message">{error}</p>}
            
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

            {!isLoading && !error && results.length === 0 && (
              <p className="loading-message">
                {searchMode === 'neural' ? 'Descreva o perfil desejado...' : 'Digite o username exato...'}
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;