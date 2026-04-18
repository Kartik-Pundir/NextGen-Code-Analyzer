import { FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

export default function IssueCard({ issue }) {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'error':
        return {
          icon: FiAlertCircle,
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30'
        };
      case 'warning':
        return {
          icon: FiAlertTriangle,
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30'
        };
      default:
        return {
          icon: FiInfo,
          color: 'text-blue-500',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30'
        };
    }
  };

  const config = getSeverityConfig(issue.severity);
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${config.bg} ${config.border}`}>
      <div className="flex items-start space-x-3">
        <Icon className={`${config.color} mt-1 flex-shrink-0`} />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <span className={`font-semibold capitalize ${config.color}`}>
              {issue.type}
            </span>
            <span className="text-xs text-gray-400">Line {issue.line}</span>
          </div>
          <p className="text-sm text-gray-300">{issue.message}</p>
        </div>
      </div>
    </div>
  );
}
