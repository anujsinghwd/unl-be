/**
 * Calculate the distance between multiple points using Haversine formula.
 * @param {number[]} latitudes - Array of latitudes in degrees.
 * @param {number[]} longitudes - Array of longitudes in degrees.
 * @param {string} unit - The unit for distance, either 'metric' or 'imperial'.
 * @returns {number[]} Array of distances between points.
 */
function calculateDistances(latitudes: number[], longitudes: number[], unit: string) {
  const earthRadiusMetric = 6371; // Earth's radius in kilometers
  const earthRadiusImperial = 3959; // Earth's radius in miles

  const earthRadius = unit === 'imperial' ? earthRadiusImperial : earthRadiusMetric;

  const distances = [];

  for (let i = 0; i < latitudes.length - 1; i++) {
      for (let j = i + 1; j < latitudes.length; j++) {
          const dLat = (latitudes[j] - latitudes[i]) * (Math.PI / 180);
          const dLon = (longitudes[j] - longitudes[i]) * (Math.PI / 180);

          const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(latitudes[i] * (Math.PI / 180)) * Math.cos(latitudes[j] * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          const distance = earthRadius * c;
          distances.push(distance);
      }
  }

  return distances;
}

export default calculateDistances;
