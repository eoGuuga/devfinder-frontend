// src/components/ProfileCard.jsx

function ProfileCard({ user }) {
  // A lógica de 'error' e 'isLoading' agora vive no App.jsx.
  // Este componente só é renderizado se houver um 'user'.

  // Arredonda o score para 2 casas decimais
  const relevanceScore = (user.score * 100).toFixed(1);

  return (
    // "TCHAN" Nível 1: Aplicamos um estilo dinâmico baseado no score.
    // Usamos 'style' inline aqui para uma lógica dinâmica simples.
    <div 
      className="profile-card" 
      style={{
        // Scores mais altos terão uma opacidade maior
        opacity: 0.5 + (user.score * 0.5), 
        // Scores mais altos terão uma borda mais forte
        border: `2px solid rgba(0, 123, 255, ${0.1 + user.score})`
      }}
    >
      <img src={user.avatar_url} alt={`Avatar de ${user.name}`} className="profile-avatar" />
      
      <div className="profile-info">
        <h2>{user.name || user.login}</h2>
        <p className="profile-username">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            @{user.username}
          </a>
        </p>
        
        {/* "TCHAN" Nível 2: Mostramos o score da IA! */}
        <p className="profile-score">
          Relevância: <strong>{relevanceScore}%</strong>
        </p>

        <p className="profile-bio">{user.bio || 'Este usuário não possui uma bio.'}</p>
        
        {/* NOTA: Removemos followers/repos, pois nossa API de IA não os fornece
            para manter a busca rápida. Foco total na busca semântica! */}
      </div>
    </div>
  );
}

export default ProfileCard;