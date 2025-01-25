import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, ArrowLeft } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  showBackButton?: boolean;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  onBackClick
}) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Layout className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">What's Up</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {showSearch ? (
              <div className="w-96">
                <SearchBar
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder="Search applications and components..."
                />
              </div>
            ) : (
              <div className="w-96" />
            )}
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;