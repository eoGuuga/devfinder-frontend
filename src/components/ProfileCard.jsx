// src/components/ProfileCard.jsx (Versão Híbrida)

import { motion } from 'framer-motion';

// Recebe a nova prop 'isDirectSearch'
function ProfileCard({ user, isDirectSearch }) {
  
  // Calcula o score apenas se não for busca direta e se o score existir
  const relevanceScore = !isDirectSearch && user.score ? (user.score * 100).toFixed(1) : null;
  
  // Pega o login/username corretamente (API direta usa 'login', Pinecone usa 'username')
  const username = user.username || user.login;
  const name = user.name || username; // Usa login se nome não existir
  const bio = user.bio || 'Este usuário não possui uma bio.';
  const avatarUrl = user.avatar_url;
  const htmlUrl = user.html_url;

  return (
    <motion.div
      className="profile-card"
      // Estilo dinâmico só se aplica à busca neural
      style={!isDirectSearch ? {
        opacity: 0.5 + (user.score * 0.5),
        border: `2px solid rgba(0, 123, 255, ${0.1 + user.score})`
      } : {}} // Nenhum estilo dinâmico para busca direta
      whileHover={{ y: -5, scale: 1.03 }}
    >
      <img src={avatarUrl} alt={`Avatar de ${name}`} className="profile-avatar" />
      
      <div className="profile-info">
        <h2>{name}</h2>
        <p className="profile-username">
          <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
            @{username}
          </a>
        </p>
        
        {/* Mostra o score apenas na busca neural */}
        {relevanceScore !== null && (
          <p className="profile-score">
            Relevância: <strong>{relevanceScore}%</strong>
          </p>
        )}

        <p className="profile-bio">{bio}</p>

        {/* BÔNUS: Mostra repositórios se for busca direta e eles existirem */}
        {isDirectSearch && user.repositories && user.repositories.length > 0 && (
          <div className="profile-repos">
            <h4>Repositórios Recentes:</h4>
            <ul>
              {user.repositories.map(repo => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  {repo.language && <span> ({repo.language})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProfileCard;