import type { Recipe } from '../model/types';
import { Badge } from '../../../shared/ui/Badge/Badge';
import { Button } from '../../../shared/ui/Button/Button';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (id: number) => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, onSelect }: RecipeCardProps) {
  const difficultyVariant =
    recipe.difficulty === 'Easy'
      ? 'easy'
      : recipe.difficulty === 'Medium'
      ? 'medium'
      : 'hard';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => onSelect(recipe.id)}
      />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="font-bold text-lg cursor-pointer hover:text-blue-600 line-clamp-1"
            onClick={() => onSelect(recipe.id)}
          >
            {recipe.name}
          </h3>
          <Badge variant={difficultyVariant}>{recipe.difficulty}</Badge>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {recipe.prepTimeMinutes + recipe.cookTimeMinutes} мин. | {recipe.caloriesPerServing} ккал | Рейтинг: {recipe.rating}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <Button variant="primary" className="flex-1" onClick={() => onSelect(recipe.id)}>
            Рецепт
          </Button>
          <Button
            variant={isFavorite ? 'danger' : 'secondary'}
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? 'В избранном' : 'В избранное'}
          </Button>
        </div>
      </div>
    </div>
  );
}
