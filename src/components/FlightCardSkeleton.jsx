// components/FlightCardSkeleton.jsx
export default function FlightCardSkeleton() {
  return (
    <div className="card p-3 mb-3">
      <div className="placeholder-glow">
        <span className="placeholder col-4"></span>
        <span className="placeholder col-6"></span>
        <span className="placeholder col-3"></span>
      </div>
    </div>
  );
}