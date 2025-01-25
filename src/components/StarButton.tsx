import React from 'react';
import { Star } from 'lucide-react';

interface StarButtonProps {
  isStarred: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

const StarButton: React.FC<StarButtonProps> = ({ isStarred, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      title={isStarred ? 'Remove from starred' : 'Add to starred'}
    >
      <Star
        className={`h-5 w-5 ${
          isStarred
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-400 dark:text-gray-500'
        }`}
      />
    </button>
  );
};

export default StarButton;