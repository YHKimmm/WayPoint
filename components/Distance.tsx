const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

interface DistanceProps {
  leg: google.maps.DirectionsLeg;
}

const Distance = ({ leg }: DistanceProps) => {
  if (!leg.distance || !leg.duration) return null;
  console.log("leg", leg);

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  console.log("days", days);

  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  return (
    <div className="distance-container">
      <p>
        This home is <span className="highlight">{leg.distance.text} </span>
        from your office. That would take{" "}
        <span className="highlight">{leg.duration.text}</span> each direction.
      </p>

      <p>
        That&apos;s <span className="highlight">{days} days</span> in your car
        each year at a cost of{" "}
        <span className="highlight">
          ${new Intl.NumberFormat().format(cost)}
        </span>
        .
      </p>
    </div>
  );
};

export default Distance;
