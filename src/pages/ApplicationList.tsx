import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'lucide-react';
import { mockApplications, mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import SearchBar from '../components/SearchBar';

function ApplicationList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredApplications = mockApplications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredComponents = mockComponents.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="w-96">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search applications and components..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Applications Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map(app => (
              <div
                key={app.id}
                onClick={() => navigate(`/application/${app.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{app.name}</h3>
                  <StatusBadge status={app.health} />
                </div>
                <p className="text-gray-600 mb-4">{app.description}</p>
                <div className="text-sm text-gray-500">
                  {app.componentIds.length} Components
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Components Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map(component => (
              <div
                key={component.id}
                onClick={() => navigate(`/component/${component.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{component.name}</h3>
                  <StatusBadge status={component.health} />
                </div>
                <p className="text-gray-600 mb-4">{component.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">
                    {component.repository.type}
                  </span>
                  <span>
                    {component.buildPipelines.length} Pipelines
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ApplicationList;