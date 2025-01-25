import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockComponents } from '../data/mockData';
import Header from '../components/Header';

function DeploymentDetails() {
  const { componentId, deploymentId } = useParams();
  const navigate = useNavigate();

  const component = mockComponents.find(comp => comp.id === componentId);
  const deployment = component?.deployments.find(deployment => deployment.id === deploymentId);

  if (!component || !deployment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Deployment not found</h2>
          <button
            onClick={() => navigate('/deployments')}
            className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deployments
          </button>
        </div>
      </div>
    );
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header 
        showBackButton 
        onBackClick={() => navigate('/deployments')} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{deployment.environment}</h1>
              <button
                onClick={() => navigate(`/component/${component.id}`)}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {component.name}
              </button>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(deployment.status)}`}>
              {deployment.status}
            </span>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(deployment.timestamp).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Deployment ID</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{deployment.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DeploymentDetails;