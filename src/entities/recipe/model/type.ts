export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Ingredients = string[];
export type Instructions = string[];
export type Tags = string[];

export interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  difficulty: Difficulty;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  tags: Tags;
  ingredients: Ingredients;
  instructions: Instructions;
}

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}