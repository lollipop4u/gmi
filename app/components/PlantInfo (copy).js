export default function PlantInfo({ info }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{info.name}</h2>
        <h3 className="card-subtitle mb-2 text-muted">
          {info.scientificName}
        </h3>
        <p className="card-text">{info.description}</p>
      </div>
    </div>
  );
}
