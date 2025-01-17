import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, ArrowLeft } from 'lucide-react';
import { mockApplications, mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = mockApplications.find(app => app.id === id);
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Application not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
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
              onClick={() => navigate('/')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Applications
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
              <p className="text-gray-600 mt-2">{application.description}</p>
            </div>
            <StatusBadge status={aggregateHealth()} className="scale-110" />
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Health Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600">
                  {applicationComponents.filter(c => c.health === 'healthy').length}
                </div>
                <div className="text-sm text-gray-500">Healthy Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-yellow-600">
                  {applicationComponents.filter(c => c.health === 'warning').length}
                </div>
                <div className="text-sm text-gray-500">Warning Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-red-600">
                  {applicationComponents.filter(c => c.health === 'critical').length}
                </div>
                <div className="text-sm text-gray-500">Critical Components</div>
              </div>
            </div>
          </div>
        </div>

        {/* Components List */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationComponents.map(component => (
              <div
                key={component.id}
                onClick={() => navigate(`/component/${component.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{component.name}</h4>
                  <StatusBadge status={component.health} />
                </div>
                <p className="text-gray-600 mb-4">{component.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Repository:</span>
                    {component.repository.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Build Pipelines:</span>
                    {component.buildPipelines.length}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
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