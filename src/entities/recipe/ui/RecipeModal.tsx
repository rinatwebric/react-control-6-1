import { useEffect } from 'react';
import type { Recipe } from '../model/types';
import { Badge } from '../../../shared/ui/Badge/Badge';
import { Button } from '../../../shared/ui/Button/Button';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function RecipeModal({ recipe, onClose, isFavorite, onToggleFavorite }: RecipeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (recipe) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [recipe, onClose]);

  if (!recipe) return null;

  const difficultyVariant =
    recipe.difficulty === 'Easy'
      ? 'easy'
      : recipe.difficulty === 'Medium'
      ? 'medium'
      : 'hard';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden z-10">
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
            <Badge variant={difficultyVariant}>{recipe.difficulty}</Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 pb-4 mb-4 border-b">
            <div>
              <span className="font-semibold text-gray-800">Кухня:</span> {recipe.cuisine}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Подготовка:</span> {recipe.prepTimeMinutes} мин.
            </div>
            <div>
              <span className="font-semibold text-gray-800">Приготовление:</span> {recipe.cookTimeMinutes} мин.
            </div>
            <div>
              <span className="font-semibold text-gray-800">Калорийность:</span> {recipe.caloriesPerServing} ккал
            </div>
            <div>
              <span className="font-semibold text-gray-800">Рейтинг:</span> {recipe.rating}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ингредиенты</h3>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700 text-sm">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Инструкция по приготовлению</h3>
            <ol className="space-y-2 list-decimal list-inside text-gray-700 text-sm">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex items-center justify-end gap-3">
          <Button
            variant={isFavorite ? 'danger' : 'secondary'}
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? 'В избранном' : 'В избранное'}
          </Button>
          <Button variant="primary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
}
