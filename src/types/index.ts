export type HealthStatus = 'healthy' | 'warning' | 'critical' | 'unknown';

export interface Component {
  id: string;
  name: string;
  description: string;
  health: HealthStatus;
  repository: {
    type: 'ADO' | 'GHE';
    url: string;
  };
  buildPipelines: {
    id: string;
    name: string;
    status: 'succeeded' | 'failed' | 'in_progress';
    lastRun: string;
  }[];
  releasePipelines: {
    id: string;
    name: string;
    status: 'succeeded' | 'failed' | 'in_progress';
    lastDeployment: string;
  }[];
  deployments: {
    id: string;
    environment: string;
    status: 'succeeded' | 'failed' | 'in_progress';
    timestamp: string;
  }[];
}

export interface Application {
  id: string;
  name: string;
  description: string;
  health: HealthStatus;
  componentIds: string[];
}