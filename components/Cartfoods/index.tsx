import Link from 'next/link';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import styles from './cartfoods.module.scss';
import { CartFoodsProps } from '../../types/Foodtypes';

const CartFoods = ({ 
  id, 
  title,
  image,
  readyInMinutes,
  servings,
  summary,
  veryPopular,
  cheap,
  dairyFree,
  vegetarian,
  veryHealthy,
  vegan,
  onLike, 
  onShare, 
  isLiked,
}: CartFoodsProps) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(id);
  };

  return (
    <div className={styles.Cart}>
      <Link href={`/food/${id}`}>
      <div className={styles.imageWraper}>
        <img 
          src={image} 
          alt={title} 
          className={styles.imagefood}
          loading="lazy"
        />
        
    <div className={styles.badgesContainer}>
      {veryPopular && <span className={styles.badge}>Popular</span>}
      {cheap && <span className={styles.badge}>Cheap</span>}
      {veryHealthy && <span className={styles.badge}>Healthy💚</span>}
    
      {vegan ? (
        <span className={styles.badge}>Vegan🌿</span>
      ) : vegetarian ? (
        <span className={styles.badge}>Vegetarian🥗</span>
      ) : dairyFree ? (
        <span className={styles.badge}>Dairy-Free🥛</span>
      ) : null}
    </div>
      </div>

      <div className={styles.metaInfo}>
        ⏱ {readyInMinutes} min&nbsp;&nbsp;|&nbsp;&nbsp;🍽 {servings} servings
      </div>

      <h3 className={styles.foodTitle}>{title}</h3>
      </Link>
      {summary && (
        <div className={styles.summaryContainer}>
          <div
            className={styles.foodSummary}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
          <Link href={`/food/${id}`} className={styles.moreLink}>
         More...
        </Link>

          
        </div>
      )}
     
      <div className={styles.actionButtons}>
        <button 
          onClick={handleLikeClick}
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
         {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        
        <button 
          onClick={handleShareClick}
          className={styles.shareButton}
          aria-label="Share this food"
          >
         <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default CartFoods;