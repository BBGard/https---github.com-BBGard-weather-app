/**
 * Convert meters to kilometers, return a string
 */

export default function metersToKilometers(meters: number): string {
 const kilometers = meters / 1000;

  return kilometers.toFixed(0);
}
