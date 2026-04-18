export default function MetricsCard({ icon: Icon, value, label, color = 'primary' }) {
  const colorClasses = {
    primary: 'from-primary-600 to-primary-400',
    secondary: 'from-secondary-600 to-secondary-400',
    success: 'from-green-600 to-green-400',
    warning: 'from-yellow-600 to-yellow-400',
    danger: 'from-red-600 to-red-400',
    info: 'from-blue-600 to-blue-400'
  };

  return (
    <div className="metric-card relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
            <Icon className="text-2xl text-white" />
          </div>
          <div className={`text-3xl font-bold bg-gradient-to-br ${colorClasses[color]} bg-clip-text text-transparent`}>
            {value}
          </div>
        </div>
        <div className="text-sm text-gray-400 font-medium">{label}</div>
      </div>
    </div>
  );
}
