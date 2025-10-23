// src/components/ProfileCard.jsx

import { motion } from 'framer-motion'; // <-- 1. IMPORTAR O MOTION

function ProfileCard({ user }) {
  const relevanceScore = (user.score * 100).toFixed(1);

  return (
    // 2. APLICAR O MOTION E A ANIMAÇÃO DE HOVER
    <motion.div 
      className="profile-card" 
      style={{
        opacity: 0.5 + (user.score * 0.5), 
        border: `2px solid rgba(0, 123, 255, ${0.1 + user.score})`
      }}
      whileHover={{ y: -5, scale: 1.03 }} // Anima para -5px e 103% do tamanho
    >
      <img src={user.avatar_url} alt={`Avatar de ${user.name}`} className="profile-avatar" />
      
      <div className="profile-info">
        <h2>{user.name || user.username}</h2>
        <p className="profile-username">
          {/* A correção que fizemos está aqui: user.username */}
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            @{user.username}
          </a>
        </p>
        
        <p className="profile-score">
          Relevância: <strong>{relevanceScore}%</strong>
        </p>

        <p className="profile-bio">{user.bio || 'Este usuário não possui uma bio.'}</p>
      </div>
    </motion.div>
  );
}

export default ProfileCard;