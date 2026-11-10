import type { Recipe, Difficulty } from '../../entities/recipe/model/types';

export type SortOption = 'rating-desc' | 'time-asc' | 'calories-asc';

export function filterAndSortRecipes(
  recipes: Recipe[],
  searchQuery: string,
  selectedDifficulty: Difficulty | 'All',
  selectedTag: string | 'All',
  sortBy: SortOption
): Recipe[] {
  return recipes
    .filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDifficulty =
        selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;

      const matchesTag = selectedTag === 'All' || recipe.tags.includes(selectedTag);

      return matchesSearch && matchesDifficulty && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'time-asc')
        return a.prepTimeMinutes + a.cookTimeMinutes - (b.prepTimeMinutes + b.cookTimeMinutes);
      if (sortBy === 'calories-asc') return a.caloriesPerServing - b.caloriesPerServing;
      return 0;
    });
}
