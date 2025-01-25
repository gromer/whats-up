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
        lastRun: '2025-01-17T10:30:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-1',
        name: 'Production Deploy',
        status: 'succeeded',
        lastDeployment: '2025-01-17T11:00:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-1',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2025-01-17T11:00:00Z'
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
        lastRun: '2025-01-15T14:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-2',
        name: 'Staging Deploy',
        status: 'failed',
        lastDeployment: '2025-01-15T14:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-2',
        environment: 'Staging',
        status: 'failed',
        timestamp: '2025-01-15T14:30:00Z'
      }
    ]
  },
  {
    id: 'comp-3',
    name: 'Payment Gateway',
    description: 'Handles payment processing and transactions',
    health: 'healthy',
    repository: {
      type: 'GHE',
      url: 'https://github.enterprise.com/org/payment-gateway'
    },
    buildPipelines: [
      {
        id: 'build-3',
        name: 'Main Build',
        status: 'succeeded',
        lastRun: '2025-01-12T12:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-3',
        name: 'Production Deploy',
        status: 'succeeded',
        lastDeployment: '2025-01-12T13:00:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-3',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2025-01-12T13:00:00Z'
      }
    ]
  },
  {
    id: 'comp-4',
    name: 'Notification Service',
    description: 'Manages email and push notifications',
    health: 'critical',
    repository: {
      type: 'ADO',
      url: 'https://dev.azure.com/org/notification-service'
    },
    buildPipelines: [
      {
        id: 'build-4',
        name: 'CI/CD Pipeline',
        status: 'failed',
        lastRun: '2025-01-09T10:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-4',
        name: 'Production Deploy',
        status: 'failed',
        lastDeployment: '2025-01-09T10:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-4',
        environment: 'Production',
        status: 'failed',
        timestamp: '2025-01-09T10:30:00Z'
      }
    ]
  },
  {
    id: 'comp-5',
    name: 'Analytics Engine',
    description: 'Processes and analyzes user behavior data',
    health: 'healthy',
    repository: {
      type: 'GHE',
      url: 'https://github.enterprise.com/org/analytics-engine'
    },
    buildPipelines: [
      {
        id: 'build-5',
        name: 'Build and Test',
        status: 'succeeded',
        lastRun: '2025-01-05T09:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-5',
        name: 'Production Release',
        status: 'succeeded',
        lastDeployment: '2025-01-05T09:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-5',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2025-01-05T09:30:00Z'
      }
    ]
  },
  {
    id: 'comp-6',
    name: 'Search Service',
    description: 'Elasticsearch-based search functionality',
    health: 'warning',
    repository: {
      type: 'ADO',
      url: 'https://dev.azure.com/org/search-service'
    },
    buildPipelines: [
      {
        id: 'build-6',
        name: 'Main Pipeline',
        status: 'succeeded',
        lastRun: '2025-01-02T08:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-6',
        name: 'Production Deploy',
        status: 'in_progress',
        lastDeployment: '2025-01-02T08:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-6',
        environment: 'Production',
        status: 'in_progress',
        timestamp: '2025-01-02T08:30:00Z'
      }
    ]
  },
  {
    id: 'comp-7',
    name: 'Content Management System',
    description: 'Manages digital content and assets',
    health: 'healthy',
    repository: {
      type: 'GHE',
      url: 'https://github.enterprise.com/org/cms'
    },
    buildPipelines: [
      {
        id: 'build-7',
        name: 'Build Pipeline',
        status: 'succeeded',
        lastRun: '2024-12-30T07:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-7',
        name: 'Production Release',
        status: 'succeeded',
        lastDeployment: '2024-12-30T07:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-7',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2024-12-30T07:30:00Z'
      }
    ]
  },
  {
    id: 'comp-8',
    name: 'Recommendation Engine',
    description: 'AI-powered product recommendations',
    health: 'healthy',
    repository: {
      type: 'ADO',
      url: 'https://dev.azure.com/org/recommendation-engine'
    },
    buildPipelines: [
      {
        id: 'build-8',
        name: 'ML Pipeline',
        status: 'succeeded',
        lastRun: '2024-12-27T06:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-8',
        name: 'Model Deployment',
        status: 'succeeded',
        lastDeployment: '2024-12-27T06:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-8',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2024-12-27T06:30:00Z'
      }
    ]
  },
  {
    id: 'comp-9',
    name: 'Cart Service',
    description: 'Shopping cart management system',
    health: 'warning',
    repository: {
      type: 'GHE',
      url: 'https://github.enterprise.com/org/cart-service'
    },
    buildPipelines: [
      {
        id: 'build-9',
        name: 'Main Build',
        status: 'succeeded',
        lastRun: '2024-12-24T05:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-9',
        name: 'Production Deploy',
        status: 'warning',
        lastDeployment: '2024-12-24T05:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-9',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2024-12-24T05:30:00Z'
      }
    ]
  },
  {
    id: 'comp-10',
    name: 'Inventory Management',
    description: 'Real-time inventory tracking system',
    health: 'healthy',
    repository: {
      type: 'ADO',
      url: 'https://dev.azure.com/org/inventory-management'
    },
    buildPipelines: [
      {
        id: 'build-10',
        name: 'CI Pipeline',
        status: 'succeeded',
        lastRun: '2024-12-21T04:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-10',
        name: 'Production Release',
        status: 'succeeded',
        lastDeployment: '2024-12-21T04:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-10',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2024-12-21T04:30:00Z'
      }
    ]
  },
  {
    id: 'comp-11',
    name: 'Order Processing Service',
    description: 'Handles order fulfillment and tracking',
    health: 'healthy',
    repository: {
      type: 'GHE',
      url: 'https://github.enterprise.com/org/order-processing'
    },
    buildPipelines: [
      {
        id: 'build-11',
        name: 'Main Build',
        status: 'succeeded',
        lastRun: '2024-12-19T03:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-11',
        name: 'Production Deploy',
        status: 'succeeded',
        lastDeployment: '2024-12-19T03:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-11',
        environment: 'Production',
        status: 'succeeded',
        timestamp: '2024-12-19T03:30:00Z'
      }
    ]
  },
  {
    id: 'comp-12',
    name: 'Customer Support Portal',
    description: 'Support ticket management system',
    health: 'warning',
    repository: {
      type: 'ADO',
      url: 'https://dev.azure.com/org/support-portal'
    },
    buildPipelines: [
      {
        id: 'build-12',
        name: 'Build Pipeline',
        status: 'warning',
        lastRun: '2024-12-17T02:00:00Z'
      }
    ],
    releasePipelines: [
      {
        id: 'release-12',
        name: 'Production Release',
        status: 'warning',
        lastDeployment: '2024-12-17T02:30:00Z'
      }
    ],
    deployments: [
      {
        id: 'deploy-12',
        environment: 'Production',
        status: 'warning',
        timestamp: '2024-12-17T02:30:00Z'
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
  },
  {
    id: 'app-3',
    name: 'E-commerce Platform',
    description: 'Online shopping and marketplace',
    health: 'warning',
    componentIds: ['comp-3', 'comp-9', 'comp-10', 'comp-11']
  },
  {
    id: 'app-4',
    name: 'Customer Service Suite',
    description: 'Support and customer management platform',
    health: 'warning',
    componentIds: ['comp-4', 'comp-12']
  },
  {
    id: 'app-5',
    name: 'Analytics Dashboard',
    description: 'Business intelligence and reporting platform',
    health: 'healthy',
    componentIds: ['comp-5', 'comp-8']
  },
  {
    id: 'app-6',
    name: 'Content Hub',
    description: 'Digital asset and content management platform',
    health: 'healthy',
    componentIds: ['comp-6', 'comp-7']
  }
];