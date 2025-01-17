import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, ArrowLeft, Box, Rocket, Github } from 'lucide-react';
import { mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

function ComponentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const component = mockComponents.find(comp => comp.id === id);
  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Component not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
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
      return <Github className="h-5 w-5 text-gray-900" />;
    }
    // Azure DevOps icon (using a custom SVG path with the Lucide icon style)
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
        className="text-[#0078D4]"
      >
        <path d="M21.77 11.08L15 4.31V2l-1.85.5L5.61 9.03 3 7.89v8.22l2.61-1.14 7.54 6.53L15 22v-2.31l6.77-6.77L24 11.08zM15 19.31l-7.39-6.39 7.39-6.39zm-8.15-6.39L3.77 14.08l-1-1v-2.15l1-1zm8.15-7.85v2.77l-6 5.2L6.23 9.92z" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">What's Up</h1>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Component Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{component.name}</h2>
              <p className="text-gray-600 mt-2">{component.description}</p>
            </div>
            <StatusBadge status={component.health} className="scale-110" />
          </div>

          {/* Repository Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Repository</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <RepoIcon />
                <span className="text-sm font-medium text-gray-900 ml-2">{component.repository.type}</span>
                <span className="mx-2 text-gray-500">•</span>
                <a
                  href={component.repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {component.repository.url}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pipelines and Deployments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Build Pipelines */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Box className="h-5 w-5 text-gray-500 mr-2" />
              Build Pipelines
            </h3>
            <div className="space-y-4">
              {component.buildPipelines.map(pipeline => (
                <div
                  key={pipeline.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{pipeline.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      pipeline.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                      pipeline.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pipeline.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Last run: {new Date(pipeline.lastRun).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Release Pipelines */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Rocket className="h-5 w-5 text-gray-500 mr-2" />
              Release Pipelines
            </h3>
            <div className="space-y-4">
              {component.releasePipelines.map(pipeline => (
                <div
                  key={pipeline.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{pipeline.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      pipeline.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                      pipeline.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pipeline.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Last deployment: {new Date(pipeline.lastDeployment).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recent Deployments */}
        <section className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Deployments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Environment
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {component.deployments.map(deployment => (
                  <tr key={deployment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {deployment.environment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        deployment.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                        deployment.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deployment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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