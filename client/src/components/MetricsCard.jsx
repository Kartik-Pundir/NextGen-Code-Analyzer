export default function MetricsCard({ icon: Icon, value, label, color = 'primary' }) {
  const colorClasses = {
    primary: 'text-primary bg-primary/20',
    secondary: 'text-secondary bg-secondary/20',
    success: 'text-green-500 bg-green-500/20',
    warning: 'text-yellow-500 bg-yellow-500/20',
    danger: 'text-red-500 bg-red-500/20',
    info: 'text-blue-500 bg-blue-500/20'
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="text-xl" />
        </div>
        <div className={`text-2xl font-bold ${colorClasses[color].split(' ')[0]}`}>
          {value}
        </div>
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
