import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, Filter, LayoutDashboard, Box } from 'lucide-react';
import { mockApplications, mockComponents } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Header from '../components/Header';

function DashboardPage() {
  const navigate = useNavigate();
  const [deploymentFilter, setDeploymentFilter] = useState<'all' | 'succeeded' | 'failed' | 'in_progress'>('all');

  // Get all unhealthy resources
  const issues = useMemo(() => {
    const unhealthyApps = mockApplications.filter(app => app.health !== 'healthy').map(app => ({
      ...app,
      type: 'application' as const
    }));
    
    const unhealthyComponents = mockComponents.filter(comp => comp.health !== 'healthy').map(comp => ({
      ...comp,
      type: 'component' as const
    }));

    return [...unhealthyApps, ...unhealthyComponents];
  }, []);

  // Get recent deployments (last 24 hours)
  const recentDeployments = useMemo(() => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return mockComponents
      .flatMap(component => 
        component.deployments.map(deployment => ({
          ...deployment,
          componentId: component.id,
          componentName: component.name
        }))
      )
      .filter(deployment => {
        const deploymentDate = new Date(deployment.timestamp);
        return deploymentDate >= twentyFourHoursAgo;
      })
      .filter(deployment => 
        deploymentFilter === 'all' || deployment.status === deploymentFilter
      )
      .sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [deploymentFilter]);

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
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>

        {/* Issues Section */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Issues</h2>
          </div>

          {issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {issues.map(issue => (
                <div
                  key={issue.id}
                  onClick={() => navigate(`/${issue.type}/${issue.id}`)}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start flex-1 min-w-0">
                      <div className="flex items-start flex-1 min-w-0">
                        {issue.type === 'application' ? (
                          <LayoutDashboard className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Box className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="ml-2 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{issue.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{issue.type}</p>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={issue.health} className="ml-2 flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-4 flex-grow line-clamp-2">{issue.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">No issues found. All systems are healthy!</p>
            </div>
          )}
        </section>

        {/* Recent Deployments Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Latest Deployments</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <select
                value={deploymentFilter}
                onChange={(e) => setDeploymentFilter(e.target.value as any)}
                className="text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1 px-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="succeeded">Succeeded</option>
                <option value="failed">Failed</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>

          {recentDeployments.length > 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Component
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Environment
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {recentDeployments.map(deployment => (
                    <tr 
                      key={`${deployment.componentId}-${deployment.id}`}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => navigate(`/deployment/${deployment.componentId}/${deployment.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {deployment.componentName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {deployment.environment}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(deployment.status)}`}>
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
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">No deployments in the last 24 hours</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;