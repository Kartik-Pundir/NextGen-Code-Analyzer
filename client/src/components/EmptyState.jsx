export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card p-12 text-center">
      <Icon className="text-6xl text-gray-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      {action && action}
    </div>
  );
}
