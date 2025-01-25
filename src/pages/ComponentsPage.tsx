import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';
import { mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import StarButton from '../components/StarButton';
import Header from '../components/Header';
import { useStarred } from '../hooks/useStarred';

function ComponentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isStarred, toggleStar } = useStarred();

  const filteredComponents = mockComponents.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStarToggle = useCallback((e: React.MouseEvent, component: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleStar(component, 'component');
  }, [toggleStar]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header showSearch searchValue={searchTerm} onSearchChange={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Components</h1>
        </div>

        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredComponents.map(component => (
              <div
                key={component.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start flex-1 min-w-0">
                    <div className="flex items-start flex-1 min-w-0">
                      <Box className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="ml-2 min-w-0">
                        <div className="flex items-start space-x-2">
                          <h3 
                            onClick={() => navigate(`/component/${component.id}`)}
                            className="text-lg font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 truncate"
                          >
                            {component.name}
                          </h3>
                          <StarButton
                            isStarred={isStarred(component.id)}
                            onClick={(e) => handleStarToggle(e, component)}
                            className="flex-shrink-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={component.health} className="ml-2 flex-shrink-0" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 flex-grow line-clamp-2">{component.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span className="mr-4">{component.repository.type}</span>
                  <span>{component.buildPipelines.length} Pipelines</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
            <Box className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No components found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search terms or clearing the search</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ComponentsPage;