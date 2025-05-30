import { GetStaticProps } from 'next';
import { useFavorite } from '../../context/FavoriteContext';
import ListFood from '../../components/ListFood';
import styles from './favoritefood.module.scss';
import { FoodApiResponse } from '../../types/Foodtypes';

const FavoriteFoods = () => {
  const { favorites, toggleFavorite } = useFavorite();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Favorite Recipes</h1>

      {favorites.length > 0 ? (
        <ListFood 
          foods={favorites}
          onLike={(id) => {
            const food = favorites.find(f => f.id === id);
            if (food) toggleFavorite(food);
          }}
          onShare={() => {}}
          favorites={favorites.map(f => f.id)}
        />
      ) : (
        <div className={styles.empty}>
          <p>You not have liked any recipes yet.</p>
          <p>Start exploring and add some favorites!</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteFoods;


export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(
      `${baseUrl}/recipes/complexSearch?apiKey=${apiKey}&number=52&addRecipeInformation=true`
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data: FoodApiResponse = await res.json();

    return {
      props: {
        foods: data.results || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        foods: [],
      },
      revalidate: 300,
    };
  }
};
