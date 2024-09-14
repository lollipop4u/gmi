export default function PlantInfo({ info }) {
  return (
    <div className="card">
      <div className="card-body">
        {Object.entries(info).map(([key, value]) => (
          <div key={key} className="mb-3">
            <h4 className="fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}