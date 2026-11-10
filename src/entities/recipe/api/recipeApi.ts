import type { RecipeResponse, Recipe, Tags } from '../model/type';

export const getRecipes = async (): Promise<RecipeResponse> => {
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=0');
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const getRecipeById = async (id: number) : Promise<Recipe> => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const getRecipeTags = async () : Promise<Tags> => {
  try {
    const response = await fetch('https://dummyjson.com/recipes/tags');
    if (!response.ok) {
      throw new Error('Failed to fetch recipe tags');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}