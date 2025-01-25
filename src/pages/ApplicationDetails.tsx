import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockApplications, mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Header from '../components/Header';

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = mockApplications.find(app => app.id === id);
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Application not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  const applicationComponents = mockComponents.filter(component =>
    application.componentIds.includes(component.id)
  );

  const aggregateHealth = (): 'healthy' | 'warning' | 'critical' => {
    if (applicationComponents.some(comp => comp.health === 'critical')) {
      return 'critical';
    }
    if (applicationComponents.some(comp => comp.health === 'warning')) {
      return 'warning';
    }
    return 'healthy';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header 
        showBackButton 
        onBackClick={() => navigate('/')} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{application.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{application.description}</p>
            </div>
            <StatusBadge status={aggregateHealth()} className="scale-110" />
          </div>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Health Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  {applicationComponents.filter(c => c.health === 'healthy').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Healthy Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                  {applicationComponents.filter(c => c.health === 'warning').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Warning Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
                  {applicationComponents.filter(c => c.health === 'critical').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Critical Components</div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationComponents.map(component => (
              <div
                key={component.id}
                onClick={() => navigate(`/component/${component.id}`)}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{component.name}</h4>
                  <StatusBadge status={component.health} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{component.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Repository:</span>
                    {component.repository.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Build Pipelines:</span>
                    {component.buildPipelines.length}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Release Pipelines:</span>
                    {component.releasePipelines.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ApplicationDetails;