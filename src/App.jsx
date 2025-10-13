// src/App.jsx
import SearchBar from './components/SearchBar'; // 1. Importamos nosso novo componente

function App() {
  return (
    <div className="container"> {/* Atenção: em JSX, 'class' se escreve 'className' */}
      <header>
        <h1>DevFinder Frontend</h1>
      </header>
      <main>
        <SearchBar /> {/* 2. Usamos o componente como se fosse uma tag HTML */}
      </main>
    </div>
  );
}

export default App;