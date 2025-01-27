import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { HealthStatus } from '../types';

interface StatusBadgeProps {
  status: HealthStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: HealthStatus) => {
    switch (status) {
      case 'healthy':
        return {
          icon: CheckCircle,
          color: 'text-green-500 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30',
          label: 'Healthy'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500 dark:text-yellow-400',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          label: 'Warning'
        };
      case 'critical':
        return {
          icon: XCircle,
          color: 'text-red-500 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30',
          label: 'Critical'
        };
      default:
        return {
          icon: HelpCircle,
          color: 'text-gray-500 dark:text-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-800',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${config.bg} ${className}`}>
      <Icon className={`w-4 h-4 ${config.color} mr-1`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
};

export default StatusBadge;