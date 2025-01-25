import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, GripVertical, X } from 'lucide-react';
import Header from '../components/Header';
import { useStarred } from '../hooks/useStarred';
import { mockApplications, mockComponents } from '../data/mockData';

function SettingsPage() {
  const navigate = useNavigate();
  const { starredItems, updateStarredItems } = useStarred();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedItem(null);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newItems = [...starredItems];
    const [movedItem] = newItems.splice(draggedItem, 1);
    newItems.splice(dropIndex, 0, movedItem);
    updateStarredItems(newItems);
  }, [draggedItem, starredItems, updateStarredItems]);

  const removeItem = useCallback((index: number) => {
    const newItems = [...starredItems];
    newItems.splice(index, 1);
    updateStarredItems(newItems);
  }, [starredItems, updateStarredItems]);

  const getItemDetails = useCallback((item: typeof starredItems[0]) => {
    if (item.type === 'application') {
      return mockApplications.find(app => app.id === item.id);
    }
    return mockComponents.find(comp => comp.id === item.id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header showBackButton onBackClick={() => navigate(-1)} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Starred Items</h1>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Drag and drop items to reorder them, or click the remove button to unstar an item.
            </p>
          </div>

          {starredItems.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {starredItems.map((item, index) => {
                const details = getItemDetails(item);
                return (
                  <li
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-move group"
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-1">
                      <button
                        onClick={() => navigate(`/${item.type}/${item.id}`)}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {item.name}
                      </button>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {details?.description}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                      title="Remove from starred"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <Star className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No starred items
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Star applications and components to see them here
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;