import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard,
  Box, 
  Pin, 
  PinOff,
  Boxes,
  Rocket,
  Upload,
  Star,
  Settings,
  Gauge
} from 'lucide-react';
import { useStarred } from '../hooks/useStarred';

interface NavigationProps {
  isOpen: boolean;
  isPinned: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPinChange: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  isOpen, 
  isPinned, 
  onOpenChange, 
  onPinChange 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { starredItems } = useStarred();

  const handleMouseEnter = useCallback(() => {
    if (!isPinned) {
      onOpenChange(true);
    }
  }, [isPinned, onOpenChange]);

  const handleMouseLeave = useCallback(() => {
    if (!isPinned) {
      onOpenChange(false);
    }
  }, [isPinned, onOpenChange]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: Gauge
    },
    {
      name: 'Applications',
      path: '/applications',
      icon: LayoutDashboard
    },
    {
      name: 'Components',
      path: '/components',
      icon: Box
    },
    {
      name: 'Builds',
      path: '/builds',
      icon: Boxes
    },
    {
      name: 'Releases',
      path: '/releases',
      icon: Rocket
    },
    {
      name: 'Deployments',
      path: '/deployments',
      icon: Upload
    }
  ];

  return (
    <div
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } z-40 flex flex-col`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-14 border-b border-gray-200 dark:border-gray-800">
        {isOpen ? (
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-gray-700 dark:text-gray-200">Resources</span>
            <div className="flex items-center">
              {isPinned ? (
                <button
                  onClick={onPinChange}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md mr-2"
                  title="Unpin navigation"
                >
                  <PinOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              ) : (
                <button
                  onClick={onPinChange}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md mr-2"
                  title="Pin navigation"
                >
                  <Pin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <button
              onClick={() => onOpenChange(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              title="Expand navigation"
            >
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/dashboard' && location.pathname === '/');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {starredItems.length > 0 && (
          <>
            <div className={`mt-8 mb-2 flex items-center ${isOpen ? '' : 'justify-center'}`}>
              <Star className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              {isOpen && (
                <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Starred
                </span>
              )}
            </div>
            <div className="space-y-1">
              {starredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/${item.type}/${item.id}`)}
                  className="w-full flex items-center px-2 py-2 text-sm rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.type === 'application' ? (
                    <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Box className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
            location.pathname === '/settings'
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          <span className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navigation;