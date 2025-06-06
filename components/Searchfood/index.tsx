import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './searchfood.module.scss';
import { Food } from '../../types/Foodtypes';
import Link from 'next/link';
interface SearchComponentProps {
  foods: Food[];
  id: number;
  onSearchResults: (results: Food[]) => void;
}

const Searchfood = ({ foods, onSearchResults }: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    let results: Food[] = [];
  
    if (query !== '') {
      results = foods.filter((food) => {
        const inTitle = food.title.toLowerCase().includes(query);
        const inSummary = food.summary?.toLowerCase().includes(query) ?? false;
  
        const inIngredients = food.extendedIngredients?.some(ingredient =>
          ingredient.name.toLowerCase().includes(query)
        ) ?? false;
  
        const matchesVegan = query === 'vegan' && food.vegan === true;
        const matchesVegetarian = query === 'vegetarian' && food.vegetarian === true;
        const matchesDairyFree = (query === 'dairy-free' || query === 'dairyfree') 
        && food.dairyFree === true;
        const matchesHealthy = (query === 'healthy' || query === 'very healthy') 
        && food.veryHealthy === true;
  
        return (
          inTitle ||
          inSummary ||
          inIngredients ||
          matchesVegan ||
          matchesVegetarian ||
          matchesDairyFree ||
          matchesHealthy
        );
      });
    }
  
    setSearchResults(results);
    onSearchResults(results);
  }, [searchQuery, foods]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setSearchResults([]);
    onSearchResults([]);
  };

  return (
    <div className={styles.searchContainer}>
      {!isSearchActive && (
        <button
          onClick={handleSearchClick}
          className={styles.searchIconButton}
          aria-label="Open search"
        >
          <FiSearch className={styles.searchIcon} />
        </button>
      )}

      {isSearchActive && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchInputContainer}>
            <FiSearch className={styles.searchIconInside} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recipes, ingredients..."
              className={styles.searchInput}
            />
              <button
              onClick={handleCloseSearch}
              className={styles.closeButton}
              aria-label="Close search"
            >
             <FiX />
            </button>
          </div>


          <div className={styles.resultsContainer}>
            <div className={styles.resultsCount}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </div>

            {searchResults.map((food) => (
  <div key={food.id} className={styles.resultItem}>
    <Link href={`/food/${food.id}`} className={styles.resultContent} onClick={handleCloseSearch}>
      
      <div className={styles.textContent}>
        <h3>{food.title}</h3>
        {food.summary && (
          <p
            dangerouslySetInnerHTML={{
              __html:
                food.summary.substring(0, 150) +
                (food.summary.length > 150 ? '...' : ''),
            }}
          />
        )}
        <div className={styles.badgesContainer}>
          {food.veryPopular && <span className={styles.badge}>Popular</span>}
          {food.cheap && <span className={styles.badge}>Cheap</span>}
          {food.veryHealthy && <span className={styles.badge}>Healthy💚</span>}
          {food.vegan ? (
            <span className={styles.badge}>Vegan🌿</span>
          ) : food.vegetarian ? (
            <span className={styles.badge}>Vegetarian🥗</span>
          ) : food.dairyFree ? (
            <span className={styles.badge}>Dairy-Free🥛</span>
          ) : null}
        </div>
      </div>

      
      <div className={styles.imageLink}>
        <img
          src={food.image}
          alt={food.title}
          className={styles.resultImage}
        />
      </div>
    </Link>
  </div>
))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchfood;
