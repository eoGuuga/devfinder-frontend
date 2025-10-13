// src/App.jsx
import SearchBar from './components/SearchBar';
import './index.css'; // Garantindo que nosso CSS seja importado

function App() {
  // 1. Esta função será chamada pelo componente filho (SearchBar)
  const handleSearch = (username) => {
    // Por enquanto, vamos apenas mostrar a informação no console
    console.log('O componente App (pai) recebeu a ordem para buscar por:', username);
    
    // NO FUTURO: A chamada à nossa API Python virá aqui!
  };

  return (
    <div className="container">
      <header>
        <h1>DevFinder Frontend</h1>
      </header>
      <main>
        {/* 2. Passamos a função 'handleSearch' para o filho através de uma "prop" chamada 'onSearch' */}
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  );
}

export default App;