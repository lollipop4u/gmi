export default function PlantInfo({ info }) {
  return (
    <div className="card shadow-lg">
      <div className="card-body">
        {Object.entries(info).map(([key, value]) => (
          <div key={key} className="mb-4">
            <h4 className="text-success fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p className="lead">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
