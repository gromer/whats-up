import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Rocket, Github, ArrowLeft } from 'lucide-react';
import { mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Header from '../components/Header';

function ComponentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const component = mockComponents.find(comp => comp.id === id);
  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Component not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const RepoIcon = () => {
    if (component.repository.type === 'GHE') {
      return <Github className="h-5 w-5 text-gray-900 dark:text-white" />;
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#0078D4] dark:text-[#4CC2FF]"
      >
        <path d="M21.77 11.08L15 4.31V2l-1.85.5L5.61 9.03 3 7.89v8.22l2.61-1.14 7.54 6.53L15 22v-2.31l6.77-6.77L24 11.08zM15 19.31l-7.39-6.39 7.39-6.39zm-8.15-6.39L3.77 14.08l-1-1v-2.15l1-1zm8.15-7.85v2.77l-6 5.2L6.23 9.92z" />
      </svg>
    );
  };

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
        onBackClick={() => navigate(-1)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{component.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{component.description}</p>
            </div>
            <StatusBadge status={component.health} className="scale-110" />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Repository</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <RepoIcon />
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{component.repository.type}</span>
                <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                <a
                  href={component.repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {component.repository.url}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Box className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              Build Pipelines
            </h3>
            <div className="space-y-4">
              {component.buildPipelines.map(pipeline => (
                <div
                  key={pipeline.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{pipeline.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${getStatusClasses(pipeline.status)}`}>
                      {pipeline.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last run: {new Date(pipeline.lastRun).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Rocket className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              Release Pipelines
            </h3>
            <div className="space-y-4">
              {component.releasePipelines.map(pipeline => (
                <div
                  key={pipeline.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{pipeline.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${getStatusClasses(pipeline.status)}`}>
                      {pipeline.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last deployment: {new Date(pipeline.lastDeployment).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deployments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Environment
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {component.deployments.map(deployment => (
                  <tr key={deployment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {deployment.environment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm px-2 py-1 rounded-full ${getStatusClasses(deployment.status)}`}>
                        {deployment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(deployment.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ComponentDetails;