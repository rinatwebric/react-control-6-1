import { useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';

interface HeaderProps {
  currentTab: 'catalog' | 'favorites';
  favoritesCount: number;
  onNavigate: (tab: 'catalog' | 'favorites') => void;
}

export function Header({ currentTab, favoritesCount, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Книга Рецептов</h1>

        <nav className="hidden md:flex gap-4">
          <Button
            variant={currentTab === 'catalog' ? 'primary' : 'secondary'}
            onClick={() => onNavigate('catalog')}
          >
            Каталог
          </Button>
          <Button
            variant={currentTab === 'favorites' ? 'primary' : 'secondary'}
            onClick={() => onNavigate('favorites')}
          >
            Избранное ({favoritesCount})
          </Button>
        </nav>

        <button
          className="md:hidden text-2xl p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-2 bg-white">
          <Button
            variant={currentTab === 'catalog' ? 'primary' : 'secondary'}
            onClick={() => {
              onNavigate('catalog');
              setIsOpen(false);
            }}
          >
            Каталог
          </Button>
          <Button
            variant={currentTab === 'favorites' ? 'primary' : 'secondary'}
            onClick={() => {
              onNavigate('favorites');
              setIsOpen(false);
            }}
          >
            Избранное ({favoritesCount})
          </Button>
        </div>
      )}
    </header>
  );
}
