// src/components/ProfileCard.jsx

function ProfileCard({ user, error }) {
  // Cenário 1: Se existir uma mensagem de erro, mostre o erro.
  if (error) {
    return (
      <section id="profile-display">
        <p className="error-message">{error}</p>
      </section>
    );
  }

  // Cenário 2: Se não houver nem usuário nem erro (estado inicial), mostre a mensagem padrão.
  if (!user) {
    return (
      <section id="profile-display">
        <p>Busque por um usuário para ver as informações.</p>
      </section>
    );
  }

  // Cenário 3: Se o objeto 'user' existir, mostre os dados!
  return (
    <section id="profile-display">
      <div className="profile-card">
        <img src={user.avatar_url} alt={`Avatar de ${user.name}`} className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name || user.login}</h2>
          <p className="profile-username">
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              @{user.login}
            </a>
          </p>
          <p className="profile-bio">{user.bio || 'Este usuário não possui uma bio.'}</p>
          <div className="profile-stats">
            <p><strong>Seguidores:</strong> {user.followers}</p>
            <p><strong>Seguindo:</strong> {user.following}</p>
            <p><strong>Repositórios:</strong> {user.public_repos}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;