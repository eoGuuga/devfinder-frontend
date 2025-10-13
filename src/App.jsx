// src/App.jsx

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard'; // Importando nosso novo componente
import './index.css';

function App() {
  // Criamos os "pedaços de memória" para guardar os dados do usuário e os erros
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Esta é a função principal que chama nossa API Python
  const handleSearch = async (username) => {
    setUserData(null); // Limpa os resultados antigos a cada nova busca
    setError(null);    // Limpa os erros antigos

    try {
      // Chamamos nossa API Python (que está na porta 8000)
      const response = await fetch(`http://127.0.0.1:8000/api/v1/search/${username}`);
      const data = await response.json();

      if (!response.ok) {
        // Se a API retornar um erro (ex: 404), a mensagem de erro vem em 'data.detail'
        throw new Error(data.detail || 'Erro ao buscar usuário');
      }
      
      // Se deu tudo certo, guardamos os dados do usuário no state
      setUserData(data);

    } catch (err) {
      // Se algo deu errado na busca, guardamos a mensagem de erro no state
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>DevFinder Frontend</h1>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} />
        {/* Passamos os dados (ou o erro) para o componente ProfileCard exibir */}
        <ProfileCard user={userData} error={error} />
      </main>
    </div>
  );
}

export default App;