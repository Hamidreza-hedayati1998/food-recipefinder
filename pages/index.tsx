import ListFood from '../components/ListFood';
import { Food, FoodApiResponse } from '../types/Foodtypes';
import { GetStaticProps, NextPage } from 'next';
import styles from '../styles/home.module.scss';
import { useFavorite } from '../context/FavoriteContext';

interface HomeProps {
  foods: Food[];
  error?: string;
}

const Home: NextPage<HomeProps> = ({ foods, error }) => {
  const { favorites, toggleFavorite } = useFavorite();

  const handleLike = (foodId: number) => {
    const food = foods.find((f) => f.id === foodId);
    if (food) toggleFavorite(food);
  };

  const handleShare = async (foodId: number) => {
    const food = foods.find(f => f.id === foodId);
    try {
      const shareUrl = `${window.location.origin}/food/${foodId}`;
      if (navigator.share) {
        await navigator.share({
          title: `Check out: ${food?.title}`,
          text: 'I found this amazing recipe',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Featured Recipes</h1>
      <ListFood
        foods={foods}
        onLike={handleLike}
        onShare={handleShare}
        favorites={favorites.map((f) => f.id)}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
        error: error instanceof Error ? error.message : 'Server Error',
      },
      revalidate: 300,
    };
  }
};

export default Home;
