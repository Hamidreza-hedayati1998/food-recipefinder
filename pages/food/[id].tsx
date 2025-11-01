"use client"
import { GetStaticPaths, GetStaticProps } from 'next';
import { Food } from '../../types/Foodtypes';
import styles from './detail.module.scss';

interface FoodDetailProps {
  food: Food;
  foods: Food[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseUrl}/recipes/complexSearch?apiKey=${apiKey}&number=52&addRecipeInformation=true`
  );
  const data = await res.json();
  const foods = data.results || [];

  const paths = foods.map((food: Food) => ({
    params: { id: food.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const id = params?.id;

  const foodRes = await fetch(`${baseUrl}/recipes/${id}/information?apiKey=${apiKey}`);
  if (!foodRes.ok) return { notFound: true };
  const food = await foodRes.json();

  const foodsRes = await fetch(
    `${baseUrl}/recipes/complexSearch?apiKey=${apiKey}&number=52&addRecipeInformation=true`
  );
  if (!foodsRes.ok) return { notFound: true };
  const foodsData = await foodsRes.json();
  const foods = foodsData.results || [];

  return {
    props: { food, foods }, 
    revalidate: 3600,
  };
};

const FoodDetailPage = ({ food }: FoodDetailProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{food.title}</h1>
        <div className={styles.meta}>
          ⏱ {food.readyInMinutes} min | 🍽 {food.servings} servings
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <img src={food.image} alt={food.title} className={styles.image} />

          <div className={styles.badges}>
            {food.vegetarian && <span className={styles.badge}>🥗 Vegetarian</span>}
            {food.vegan && <span className={styles.badge}>🌿 Vegan</span>}
            {food.glutenFree && <span className={styles.badge}>🌾 Gluten-Free</span>}
            {food.dairyFree && <span className={styles.badge}>🥛 Dairy-Free</span>}
            {food.veryHealthy && <span className={styles.badge}>💚 Healthy</span>}
            {food.cheap && <span className={styles.badge}>💰 Cheap</span>}
            {food.sustainable && <span className={styles.badge}>Sustainable</span>}
          </div>

          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: food.summary || '' }}
          />
        </div>

        <div className={styles.column}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>📊 Nutritional information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🔥 Likes:</span>
                <span className={styles.infoValue}>{food.aggregateLikes}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💪 Health Score:</span>
                <span className={styles.infoValue}>{food.healthScore}/100</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💸 Price:</span>
                <span className={styles.infoValue}>${food.pricePerServing?.toFixed(2)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⭐ SmartPoints:</span>
                <span className={styles.infoValue}>{food.weightWatcherSmartPoints}</span>
              </div>
            </div>

            <div className={styles.source}>
              <span className={styles.infoLabel}>🔗 Source:</span>
              {food.sourceUrl ? (
                <a
                  href={food.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoValue}
                >
                  {food.sourceName || food.creditsText || 'Unknown'}
                </a>
              ) : (
                <span className={styles.infoValue}>
                  {food.sourceName || food.creditsText || 'Unknown'}
                </span>
              )}
            </div>
          </div>

          {Array.isArray(food.extendedIngredients) && food.extendedIngredients.length > 0 && (
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>🧂 Ingredients</h3>
              <ul className={styles.ingredients}>
                {food.extendedIngredients
                  .filter((ing) => ing && ing.original)
                  .map((ing) => (
                    <li key={ing.id || ing.original} className={styles.ingredient}>
                      <span className={styles.ingredientName}>{ing.original}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {Array.isArray(food.analyzedInstructions) && food.analyzedInstructions.length > 0 && (
        <div className={styles.instructionsSection}>
          <h2 className={styles.sectionTitle}>👨‍🍳 Instructions</h2>
          {food.analyzedInstructions
            .filter((instruction) => Array.isArray(instruction.steps) && instruction.steps.length > 0)
            .map((instruction, index) => (
              <ol key={index} className={styles.instructions}>
                {instruction.steps
                  .filter((step) => step && step.step)
                  .map((step) => (
                    <li key={step.number || step.step} className={styles.step}>
                      <span className={styles.stepNumber}>{step.number}</span>
                      <span className={styles.stepText}>{step.step}</span>
                    </li>
                  ))}
              </ol>
            ))}
        </div>
      )}
    </div>
  );
};

export default FoodDetailPage;
