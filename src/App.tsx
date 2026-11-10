import { useState, useEffect } from 'react';
import type { Recipe, Difficulty } from './entities/recipe/model/types';
import { getRecipes, getRecipeTags } from './entities/recipe/api/recipeApi';
import { filterAndSortRecipes, type SortOption } from './shared/lib/recipeFilters';
import { Header } from './widgets/Header/Header';
import { RecipeCard } from './entities/recipe/ui/RecipeCard';
import { Input } from './shared/ui/Input/Input';
import { Select } from './shared/ui/Select/Select';

export function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = useState<'catalog' | 'favorites'>('catalog');

  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [tag, setTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getRecipes(), getRecipeTags()]).then(([data, tagsData]) => {
      setRecipes(data.recipes);
      setTags(tagsData);
      setLoading(false);
    });
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const displayedRecipes = filterAndSortRecipes(
    currentTab === 'favorites'
      ? recipes.filter((r) => favorites.includes(r.id))
      : recipes,
    search,
    difficulty,
    tag,
    sortBy
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        currentTab={currentTab}
        favoritesCount={favorites.length}
        onNavigate={setCurrentTab}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-col md:flex-row gap-3">
          <Input
            placeholder="Поиск по названию или ингредиентам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty | 'All')}
              options={[
                { label: 'Вся сложность', value: 'All' },
                { label: 'Easy', value: 'Easy' },
                { label: 'Medium', value: 'Medium' },
                { label: 'Hard', value: 'Hard' },
              ]}
            />

            <Select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              options={[
                { label: 'Все теги', value: 'All' },
                ...tags.map((t) => ({ label: t, value: t })),
              ]}
            />

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              options={[
                { label: 'По рейтингу', value: 'rating-desc' },
                { label: 'По времени', value: 'time-asc' },
                { label: 'По калориям', value: 'calories-asc' },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Загрузка рецептов...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={toggleFavorite}
                onSelect={(id) => alert(`Открытие деталки рецепта #${id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
