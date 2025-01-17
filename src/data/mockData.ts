import { Application, Component } from '../types';

export const mockComponents: Component[] = [
  {
    id: 'comp-1',
    name: 'Authentication Service',
    description: 'Handles user authentication and authorization',
    health: 'healthy',
    repository: {
      type: 'ADO',
      url: 'https://dev.azure.com/org/auth-service'
    },
    buildPipelines: [
      {
        id: 'build-1',
        name: 'Main Build',
        status: 'succeeded',
        lastRun: '2024-03-10T15:30:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-1',
        name: 'Production Deploy',
        status: 'succeeded',
        lastDeployment: '2024-03-10T16:00:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-1',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2024-03-10T16:00:00Z'
      }
    ]
  },
  {
    id: 'comp-2',
    name: 'User API',
    description: 'Core user management API',
    health: 'warning',
    repository: {
      type: 'GHE',
      url: 'https://github.enterprise.com/org/user-api'
    },
    buildPipelines: [
      {
        id: 'build-2',
        name: 'CI Pipeline',
        status: 'succeeded',
        lastRun: '2024-03-10T14:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-2',
        name: 'Staging Deploy',
        status: 'failed',
        lastDeployment: '2024-03-10T14:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-2',
        environment: 'Staging',
        status: 'failed',
        timestamp: '2024-03-10T14:30:00Z'
      }
    ]
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    name: 'User Portal',
    description: 'Main user-facing application',
    health: 'warning',
    componentIds: ['comp-1', 'comp-2']
  },
  {
    id: 'app-2',
    name: 'Admin Dashboard',
    description: 'Internal administration tool',
    health: 'healthy',
    componentIds: ['comp-1']
  }
];