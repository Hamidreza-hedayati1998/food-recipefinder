import { createContext, useContext, useState, ReactNode } from "react";
import { Food } from "../types/Foodtypes";

interface FavoriteContextType {
  favorites: Food[];
  toggleFavorite: (food: Food) => void;
  isFavorite: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Food[]>([]);

  const toggleFavorite = (food: Food) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === food.id)
        ? prev.filter((f) => f.id !== food.id)
        : [...prev, food]
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
