import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ComponentsPage from './pages/ComponentsPage';
import BuildsPage from './pages/BuildsPage';
import ReleasesPage from './pages/ReleasesPage';
import DeploymentsPage from './pages/DeploymentsPage';
import SettingsPage from './pages/SettingsPage';
import ApplicationDetails from './pages/ApplicationDetails';
import ComponentDetails from './pages/ComponentDetails';
import BuildDetails from './pages/BuildDetails';
import ReleaseDetails from './pages/ReleaseDetails';
import DeploymentDetails from './pages/DeploymentDetails';
import Navigation from './components/Navigation';
import Header from './components/Header';
import { useNavigation } from './hooks/useNavigation';

function App() {
  const { isOpen, isPinned, handleOpen, togglePin } = useNavigation();
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header showSearch searchValue={searchTerm} onSearchChange={setSearchTerm} />
      <div className="pt-16">
        <div className={`flex transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
          <Navigation 
            isOpen={isOpen} 
            isPinned={isPinned}
            onOpenChange={handleOpen}
            onPinChange={togglePin}
          />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/applications" element={<ApplicationsPage searchTerm={searchTerm} />} />
              <Route path="/components" element={<ComponentsPage searchTerm={searchTerm} />} />
              <Route path="/builds" element={<BuildsPage searchTerm={searchTerm} />} />
              <Route path="/releases" element={<ReleasesPage searchTerm={searchTerm} />} />
              <Route path="/deployments" element={<DeploymentsPage searchTerm={searchTerm} />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/application/:id" element={<ApplicationDetails />} />
              <Route path="/component/:id" element={<ComponentDetails />} />
              <Route path="/build/:componentId/:buildId" element={<BuildDetails />} />
              <Route path="/release/:componentId/:releaseId" element={<ReleaseDetails />} />
              <Route path="/deployment/:componentId/:deploymentId" element={<DeploymentDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;