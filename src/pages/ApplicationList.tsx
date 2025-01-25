import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import { mockApplications, mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Header from '../components/Header';

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

  const EmptyState = ({ title, message }: { title: string; message: string }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <PackageSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch searchValue={searchTerm} onSearchChange={setSearchTerm} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Applications Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications</h2>
          {filteredApplications.length > 0 ? (
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
          ) : (
            <EmptyState
              title={searchTerm ? "No matching applications found" : "No applications available"}
              message={searchTerm 
                ? "Try adjusting your search terms or clearing the search to see all applications"
                : "There are currently no applications in the system"}
            />
          )}
        </section>

        {/* Components Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Components</h2>
          {filteredComponents.length > 0 ? (
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
          ) : (
            <EmptyState
              title={searchTerm ? "No matching components found" : "No components available"}
              message={searchTerm 
                ? "Try adjusting your search terms or clearing the search to see all components"
                : "There are currently no components in the system"}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default ApplicationList;