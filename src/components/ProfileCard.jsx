import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function ProfileCard({ user, isDirectSearch, headingId }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [glareOpacity, setGlareOpacity] = useState(0);

  const relevanceScore = !isDirectSearch && user.score ? (user.score * 100).toFixed(1) : null;
  const username = user.username || user.login;
  const name = user.name || username;
  const bio = user.bio || 'Este usuário não possui uma bio.';
  const avatarUrl = user.avatar_url;
  const htmlUrl = user.html_url;

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const rotateY = (x - width / 2) / width * 30;
    const rotateX = (height / 2 - y) / height * 30;
    setRotate({ x: rotateX, y: rotateY });
    const glareX = (x / width) * 100;
    const glareY = (y / height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
    setGlareOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlareOpacity(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="profile-card profile-card-3d"
      style={{
        opacity: !isDirectSearch ? 0.5 + (user.score * 0.5) : 1,
        '--glare-x': `${glarePosition.x}%`,
        '--glare-y': `${glarePosition.y}%`,
        '--glare-opacity': glareOpacity
      }}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-glare" />
      <div className="card-content">
        <div className="card-avatar-wrapper">
          <img
            src={avatarUrl}
            alt={`Avatar de ${name}`}
            className="profile-avatar"
          />
        </div>
        <div className="profile-info">
          <div className="card-title-wrapper">
            <h2 id={headingId}>{name}</h2>
            <p className="profile-username">
              <a href={htmlUrl} target="_blank" rel="noopener noreferrer" aria-label={`Perfil de ${username} no GitHub`}>
                @{username}
              </a>
            </p>
          </div>
          {relevanceScore !== null && (
            <p className="profile-score">
              Relevância: <strong>{relevanceScore}%</strong>
            </p>
          )}
          <div className="card-bio-wrapper">
            <p className="profile-bio">{bio}</p>
          </div>
          {isDirectSearch && user.repositories && user.repositories.length > 0 && (
            <div className="profile-repos card-repos-wrapper">
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
      </div>
    </motion.div>
  );
}

export default ProfileCard;