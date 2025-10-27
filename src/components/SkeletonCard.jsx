import './SkeletonCard.css'; // Vamos criar este CSS já já

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-line"></div>
      <div className="skeleton-text skeleton-line short"></div>
    </div>
  );
}

export default SkeletonCard;