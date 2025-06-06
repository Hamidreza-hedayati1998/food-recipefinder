// types/food.ts

  
  export interface FoodApiResponse {
    results: Food[];
    offset: number;
    number: number;
    totalResults: number;
    response:number;
    status?: string | number;


  }

  export interface CartFoodsProps {
    id: number;
    title: string;
    image: string;
    readyInMinutes?: number;
    servings?: number;
    summary?: string ;
    veryPopular?: boolean;
    cheap?: boolean;
    dairyFree?: boolean;
    healthScore?: number;
    vegetarian?: boolean;  
    vegan?: boolean;  
    veryHealthy?: boolean;     
    aggregateLikes?: number;
    onLike?: (id: number) => void;
    onShare?: (id: number) => void;
    isLiked?: boolean;
  }




  export interface Ingredient {
    id: number;
    name: string;
    original: string;
    amount: number;
    unit: string;
  }
  
  export interface InstructionStep {
    number: number;
    step: string;
    ingredients?: {
      id: number;
      name: string;
      image?: string;
    }[];
    equipment?: {
      id: number;
      name: string;
      image?: string;
    }[];
  }
  
  export interface InstructionBlock {
    name: string;
    steps: InstructionStep[];
  }
  export interface Food {
    id: number;
    title: string;
    image: string;
    readyInMinutes?: number;
    servings?: number;
    summary?: string;
    veryPopular?: boolean;
    cheap?: boolean;
    dairyFree?: boolean;
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    veryHealthy?: boolean;
    sustainable?: boolean;
    lowFodmap?: boolean;
    aggregateLikes?: number;
    healthScore?: number;
    weightWatcherSmartPoints?: number;
    pricePerServing?: number;
    creditsText?: string;
    sourceName?: string;
    extendedIngredients?: Ingredient[] |[]; 
    analyzedInstructions?: InstructionBlock[] | []; 
    nutrition?: NutritionInfo;
    sourceUrl?: string;
  };


  export interface NutritionInfo {
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
  }
  
  
  