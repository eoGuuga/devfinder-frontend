// src/components/SearchBar.jsx

function SearchBar() {
  return (
    <section id="search">
      <form>
        <input type="text" placeholder="Buscar usuário do GitHub..." required />
        <button type="submit">Buscar</button>
      </form>
    </section>
  );
}

export default SearchBar;