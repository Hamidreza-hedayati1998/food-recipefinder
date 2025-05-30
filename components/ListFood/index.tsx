import { Food } from '../../types/Foodtypes';
import styles from './listfood.module.scss';
import CartFoods from '../Cartfoods';

interface ListFoodProps {
  foods: Food[];
  onLike?: (id: number) => void;
  onShare?: (id: number) => void;
  
  favorites?: number[];
}

const ListFood = ({ foods = [],
   onLike = () => {},
   onShare = () => {},
   
   favorites = [] }: ListFoodProps) => {
  return (
    <div className={styles.container}>
      {foods.map((food) => (
        <div key={food.id} className={styles.foodItem}>
          <CartFoods
            id={food.id}
            image={food.image}
            title={food.title}
            summary={food.summary}
            servings={food.servings}
            veryPopular={food.veryPopular}
            cheap={food.cheap}
            dairyFree={food.dairyFree}
            vegetarian={food.vegetarian}   
            vegan={food.vegan}    
            readyInMinutes={food.readyInMinutes}
            veryHealthy={food.veryHealthy}
            onLike={onLike}
            onShare={onShare}
            isLiked={favorites.includes(food.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ListFood;